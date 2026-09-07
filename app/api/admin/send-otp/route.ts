import { createHmac, randomBytes } from 'crypto';

// Authorized Master Administrator Email
export const AUTHORIZED_ADMIN_EMAIL = 'designer.sujanmondal@gmail.com';

const SECRET_KEY = process.env.ADMIN_SESSION_SECRET || 'aitoolshub-master-secret-key-2026-auth';

// Helper to sign payload
export function signPayload(data: string): string {
  return createHmac('sha256', SECRET_KEY).update(data).digest('hex');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = (body.email || '').trim().toLowerCase();

    // 1. Strict Authorization Verification
    if (email !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
      return Response.json(
        { error: 'Access Denied: Unauthorized Administrator' },
        { status: 403 }
      );
    }

    // 2. Generate 6-Digit Cryptographic Verification Code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes validity
    const salt = randomBytes(8).toString('hex');

    // Hash the code for stateless cookie verification
    const codeHash = createHmac('sha256', SECRET_KEY)
      .update(`${email}:${code}:${expiresAt}:${salt}`)
      .digest('hex');

    const challengePayload = JSON.stringify({
      email,
      expiresAt,
      salt,
      codeHash,
    });
    const challengeSignature = signPayload(challengePayload);
    const token = Buffer.from(challengePayload).toString('base64') + '.' + challengeSignature;

    // 3. Email Dispatch via Resend or SMTP
    const resendApiKey = process.env.RESEND_API_KEY;
    let emailDispatched = false;
    let dispatchErrorMessage = '';

    if (resendApiKey) {
      try {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.SMTP_FROM || 'aitoolshub Security <onboarding@resend.dev>',
            to: [AUTHORIZED_ADMIN_EMAIL],
            subject: `aitoolshub Admin Verification Code: ${code}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
                <div style="text-align: center; margin-bottom: 20px;">
                  <h2 style="color: #0f172a; margin: 0; font-size: 22px;">aitoolshub Security Verification</h2>
                  <p style="color: #64748b; font-size: 13px; margin-top: 4px;">Indian Financial Calculators & Wealth Tools Portal</p>
                </div>
                <p style="color: #334155; font-size: 15px; line-height: 1.6;">Hello Administrator,</p>
                <p style="color: #334155; font-size: 14px; line-height: 1.6;">Use the 6-digit One-Time Password (OTP) below to authenticate into the aitoolshub Admin Management Console:</p>
                <div style="text-align: center; margin: 28px 0;">
                  <span style="display: inline-block; font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #ff671f; background: #fff7ed; padding: 12px 28px; border-radius: 12px; border: 1px solid #ffedd5;">${code}</span>
                </div>
                <p style="color: #64748b; font-size: 12px; line-height: 1.5;">This verification code is strictly confidential and expires in <strong>5 minutes</strong>. If you did not request this OTP, please disregard this email.</p>
                <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 20px 0;" />
                <p style="color: #94a3b8; font-size: 11px; text-align: center;">aitoolshub.co.in &bull; Restricted Security Perimeter</p>
              </div>
            `,
          }),
        });

        if (emailResponse.ok) {
          emailDispatched = true;
        } else {
          const errData = await emailResponse.json().catch(() => ({}));
          dispatchErrorMessage = errData.message || 'Resend API rejected the email request.';
          console.error('[Resend Dispatch Error]', errData);
        }
      } catch (err: any) {
        dispatchErrorMessage = err.message || 'Network error communicating with Resend.';
        console.error('[Email Dispatch Network Error]', err);
      }
    } else {
      console.log('----------------------------------------------------');
      console.log(`[aitoolshub Production Alert: RESEND_API_KEY missing]`);
      console.log(`To deliver real emails to ${AUTHORIZED_ADMIN_EMAIL}, add RESEND_API_KEY to environment.`);
      console.log(`Current Code Generated: ${code}`);
      console.log('----------------------------------------------------');
    }

    // Set secure challenge cookie (valid for 5 minutes)
    const isDev = process.env.NODE_ENV !== 'production';
    const cookieHeader = `aitoolshub_otp_challenge=${token}; Path=/api/admin; Max-Age=300; HttpOnly; SameSite=Strict${isDev ? '' : '; Secure'}`;

    if (!resendApiKey) {
      return new Response(
        JSON.stringify({
          success: false,
          error:
            'Transactional email service is not configured. Please set your RESEND_API_KEY in Settings / environment variables to deliver One-Time Passwords directly to your inbox.',
          emailConfigMissing: true,
        }),
        {
          status: 503,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    if (!emailDispatched) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `Email delivery failed: ${dispatchErrorMessage || 'Unknown error'}. Please verify your RESEND_API_KEY configuration.`,
        }),
        {
          status: 502,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // STRICT PRODUCTION RESPONSE - NO TEST OTP EXPOSED
    return new Response(
      JSON.stringify({
        success: true,
        message: 'A 6-digit verification code has been dispatched directly to your email inbox.',
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': cookieHeader,
        },
      }
    );
  } catch (error: any) {
    console.error('Error in send-otp handler:', error);
    return Response.json(
      { error: 'An unexpected internal error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
