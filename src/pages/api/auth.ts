import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const params = new URLSearchParams({
    client_id: import.meta.env.GITHUB_CLIENT_ID,
    scope: 'repo',
  });
  return Response.redirect(
    `https://github.com/login/oauth/authorize?${params}`, 302
  );
};