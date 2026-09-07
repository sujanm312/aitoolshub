import { createHmac } from 'crypto';
import { AUTHORIZED_ADMIN_EMAIL, signPayload } from '../send-otp/route';

const SECRET_KEY = process.env.ADMIN_SESSION_SECRET || 'aitoolshub-master-secret-key-2026-auth';

function parseCookies(cookieHeader: string | null): Record<string, string> {
  const list: Record<string, string> = {};
  if (!cookieHeader) return list;
  cookieHeader.split(';').forEach((cookie) => {
    const parts = cookie.split('=');
    list[parts.shift()?.trim() || ''] = decodeURI(parts.join('='));
  });
  return list;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = (body.email || '').trim().toLowerCase();
    const otp = (body.otp || '').trim();

    if (email !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
      return Response.json(
        { error: 'Access Denied: Unauthorized Administrator' },
        { status: 403 }
      );
    }

    if (!otp || otp.length !== 6) {
      return Response.json(
        { error: 'Please enter a valid 6-digit numeric verification code.' },
        { status: 400 }
      );
    }

    const cookies = parseCookies(request.headers.get('cookie'));
    const challengeToken = cookies['aitoolshub_otp_challenge'];

    if (!challengeToken || !challengeToken.includes('.')) {
      return Response.json(
        { error: 'Verification session expired. Please request a new OTP.' },
        { status: 400 }
      );
    }

    const [encodedPayload, signature] = challengeToken.split('.');
    const rawPayload = Buffer.from(encodedPayload, 'base64').toString('utf-8');

    // 1. Verify HMAC Signature
    const expectedSignature = signPayload(rawPayload);
    if (signature !== expectedSignature) {
      return Response.json(
        { error: 'Cryptographic challenge verification failed.' },
        { status: 400 }
      );
    }

    const challenge = JSON.parse(rawPayload);

    // 2. Check Expiration
    if (Date.now() > challenge.expiresAt) {
      return Response.json(
        { error: 'This verification code has expired (5-minute limit exceeded). Please request a new code.' },
        { status: 400 }
      );
    }

    // 3. Verify Code Hash
    const computedHash = createHmac('sha256', SECRET_KEY)
      .update(`${email}:${otp}:${challenge.expiresAt}:${challenge.salt}`)
      .digest('hex');

    if (computedHash !== challenge.codeHash) {
      return Response.json(
        { error: 'Invalid verification code. Please check your email and try again.' },
        { status: 400 }
      );
    }

    // 4. Issue Authenticated Admin Session JWT / Cookie
    const sessionExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    const sessionPayload = JSON.stringify({
      email: AUTHORIZED_ADMIN_EMAIL,
      role: 'superadmin',
      issuedAt: Date.now(),
      expiresAt: sessionExpiresAt,
    });
    const sessionSig = signPayload(sessionPayload);
    const sessionToken = Buffer.from(sessionPayload).toString('base64') + '.' + sessionSig;

    const isDev = process.env.NODE_ENV !== 'production';
    const authCookieHeader = `aitoolshub_admin_session=${sessionToken}; Path=/; Max-Age=86400; HttpOnly; SameSite=Strict${isDev ? '' : '; Secure'}`;
    const clearChallengeCookie = `aitoolshub_otp_challenge=; Path=/api/admin; Max-Age=0; HttpOnly; SameSite=Strict`;

    const headers = new Headers();
    headers.append('Set-Cookie', authCookieHeader);
    headers.append('Set-Cookie', clearChallengeCookie);
    headers.set('Content-Type', 'application/json');

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Administrator authentication successful.',
        user: {
          email: AUTHORIZED_ADMIN_EMAIL,
          role: 'superadmin',
        },
        redirectUrl: '/admin/dashboard',
      }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error('verify-otp error:', error);
    return Response.json({ error: 'Internal server error verifying OTP code' }, { status: 500 });
  }
}
