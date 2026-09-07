import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

const AUTHORIZED_ADMIN_EMAIL = 'designer.sujanmondal@gmail.com';
const activeChallenges = new Map<string, { code: string; expiresAt: number }>();

function adminApiPlugin(): Plugin {
  return {
    name: 'admin-api-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '';

        // POST /api/admin/send-otp
        if (url.startsWith('/api/admin/send-otp') && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const { email } = JSON.parse(body || '{}');
              const trimmed = (email || '').trim().toLowerCase();

              if (trimmed !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
                res.statusCode = 403;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Access Denied: Unauthorized Administrator' }));
                return;
              }

              const code = Math.floor(100000 + Math.random() * 900000).toString();
              const expiresAt = Date.now() + 5 * 60 * 1000;
              activeChallenges.set(trimmed, { code, expiresAt });

              const resendKey = process.env.RESEND_API_KEY;
              if (resendKey) {
                try {
                  const emailRes = await fetch('https://api.resend.com/emails', {
                    method: 'POST',
                    headers: {
                      Authorization: `Bearer ${resendKey}`,
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      from: process.env.SMTP_FROM || 'aitoolshub Security <onboarding@resend.dev>',
                      to: [AUTHORIZED_ADMIN_EMAIL],
                      subject: `aitoolshub Admin Verification Code: ${code}`,
                      html: `
                        <div style="font-family: Arial, sans-serif; max-width: 500px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
                          <h2 style="color: #0f172a; margin: 0 0 12px 0;">aitoolshub Security Verification</h2>
                          <p style="color: #334155; font-size: 14px;">Your 6-digit administrator verification code is:</p>
                          <div style="text-align: center; margin: 24px 0;">
                            <span style="font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #ff671f; background: #fff7ed; padding: 12px 28px; border-radius: 12px; border: 1px solid #ffedd5;">${code}</span>
                          </div>
                          <p style="color: #64748b; font-size: 12px;">This code expires in 5 minutes. If you did not request this, ignore this email.</p>
                        </div>
                      `,
                    }),
                  });

                  if (!emailRes.ok) {
                    const errData = await emailRes.json().catch(() => ({}));
                    res.statusCode = 502;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(
                      JSON.stringify({
                        success: false,
                        error: `Resend email dispatch error: ${errData.message || 'Service rejected request'}`,
                      })
                    );
                    return;
                  }
                } catch (e: any) {
                  res.statusCode = 502;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(
                    JSON.stringify({
                      success: false,
                      error: `Email service connection error: ${e.message}`,
                    })
                  );
                  return;
                }
              } else {
                // In production without RESEND_API_KEY configured
                res.statusCode = 503;
                res.setHeader('Content-Type', 'application/json');
                res.end(
                  JSON.stringify({
                    success: false,
                    error:
                      'Transactional email service is not configured. Please set RESEND_API_KEY in Settings / environment variables to deliver verification codes to designer.sujanmondal@gmail.com.',
                    emailConfigMissing: true,
                  })
                );
                return;
              }

              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  success: true,
                  message: 'A 6-digit verification code has been dispatched directly to your email inbox.',
                })
              );
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Internal server error while processing OTP' }));
            }
          });
          return;
        }

        // POST /api/admin/verify-otp
        if (url.startsWith('/api/admin/verify-otp') && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const { email, otp } = JSON.parse(body || '{}');
              const trimmed = (email || '').trim().toLowerCase();
              const cleanOtp = (otp || '').trim();

              if (trimmed !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
                res.statusCode = 403;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Access Denied: Unauthorized Administrator' }));
                return;
              }

              const challenge = activeChallenges.get(trimmed);
              if (!challenge) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Verification session expired. Please request a new code.' }));
                return;
              }

              if (Date.now() > challenge.expiresAt) {
                activeChallenges.delete(trimmed);
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'This verification code has expired. Please request a new code.' }));
                return;
              }

              if (challenge.code !== cleanOtp) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Invalid verification code. Please check your email and try again.' }));
                return;
              }

              // Success! Clear challenge
              activeChallenges.delete(trimmed);
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  success: true,
                  message: 'Authentication successful.',
                  redirectUrl: '/admin/dashboard',
                })
              );
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Internal server error while verifying OTP' }));
            }
          });
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), adminApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      strictPort: true,
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
