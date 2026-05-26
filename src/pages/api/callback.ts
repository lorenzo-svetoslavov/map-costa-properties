import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response('Missing code', { status: 400 });
  }

  const res = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      client_id: import.meta.env.GITHUB_CLIENT_ID,
      client_secret: import.meta.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const data = await res.json();

  if (!data.access_token) {
    return new Response(`GitHub error: ${JSON.stringify(data)}`, { status: 500 });
  }

  const content = JSON.stringify({
    token: data.access_token,
    provider: 'github',
  });

  const html = `<!doctype html>
<html>
<body>
<script>
  (function() {
    const content = ${JSON.stringify(content)};
    function receiveMessage(e) {
      window.opener.postMessage(
        'authorization:github:success:' + content,
        e.origin
      );
      window.removeEventListener("message", receiveMessage, false);
      setTimeout(function() { window.close(); }, 500);
    }
    window.addEventListener("message", receiveMessage, false);
    window.opener.postMessage("authorizing:github", "*");
  })();
<\/script>
</body>
</html>`;

  return new Response(html, { headers: { 'Content-Type': 'text/html' } });
};