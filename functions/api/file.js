const DOCX_TYPE =
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const t = url.searchParams.get('t') || '';
  const key = url.searchParams.get('k') || '';

  if (!t || !key) {
    return new Response('Bad request', { status: 400 });
  }
  if (!key.startsWith('paid/')) {
    return new Response('Forbidden', { status: 403 });
  }

  const entry = await env.TOKENS.get(`tok:${t}`, 'json');
  if (!entry) {
    return new Response('Token expired', { status: 401 });
  }

  const obj = await env.FILES.get(key);
  if (!obj) {
    return new Response('File not found', { status: 404 });
  }

  const filename = key.split('/').pop();
  const ascii = filename.replace(/[^\x20-\x7e]/g, '_');
  const headers = {
    'content-type': DOCX_TYPE,
    'content-length': String(obj.size),
    'content-disposition': `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
    'cache-control': 'private, max-age=0',
  };

  return new Response(obj.body, { headers });
}
