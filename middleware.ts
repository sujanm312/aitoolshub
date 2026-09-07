export function middleware(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Protect all /admin/* routes except /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login' && pathname !== '/admin/login/') {
    const cookieHeader = request.headers.get('cookie') || '';
    const match = cookieHeader.match(/aitoolshub_admin_session=([^;]+)/);
    const sessionCookie = match ? match[1] : null;

    if (!sessionCookie || !sessionCookie.includes('.')) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return Response.redirect(loginUrl.toString(), 302);
    }

    try {
      const [encodedPayload] = sessionCookie.split('.');
      const payloadJson = Buffer.from(encodedPayload, 'base64').toString('utf-8');
      const session = JSON.parse(payloadJson);

      if (!session.expiresAt || Date.now() > session.expiresAt) {
        const loginUrl = new URL('/admin/login', request.url);
        loginUrl.searchParams.set('error', 'session_expired');
        return Response.redirect(loginUrl.toString(), 302);
      }
    } catch {
      const loginUrl = new URL('/admin/login', request.url);
      return Response.redirect(loginUrl.toString(), 302);
    }
  }

  return undefined;
}

export const config = {
  matcher: ['/admin/:path*'],
};
