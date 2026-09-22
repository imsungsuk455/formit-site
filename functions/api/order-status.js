async function issueToken(env, orderId) {
  const token = [...crypto.getRandomValues(new Uint8Array(16))]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  const exp = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const ttl = 7 * 24 * 60 * 60;
  const payload = JSON.stringify({ token, exp, order: orderId });
  await env.TOKENS.put(`ord:${orderId}`, payload, { expirationTtl: ttl });
  await env.TOKENS.put(`tok:${token}`, payload, { expirationTtl: ttl });
  return payload;
}

export async function onRequestGet({ request, env }) {
  const order = new URL(request.url).searchParams.get('order') || '';
  if (!order) {
    return Response.json({ ready: false });
  }

  let entry = await env.TOKENS.get(`ord:${order}`, 'json');

  if (!entry && env.DEV_FAKE_PAID === '1') {
    entry = JSON.parse(await issueToken(env, order));
  }

  if (!entry) {
    return Response.json({ ready: false });
  }

  const daysLeft = Math.max(1, Math.ceil((entry.exp - Date.now()) / (24 * 60 * 60 * 1000)));
  return Response.json({ ready: true, token: entry.token, daysLeft });
}
