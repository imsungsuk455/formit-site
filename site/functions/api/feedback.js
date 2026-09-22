const OK = () =>
  new Response('SUCCESS', { headers: { 'content-type': 'text/plain; charset=utf-8' } });
const NG = () =>
  new Response('FAIL', { status: 400, headers: { 'content-type': 'text/plain; charset=utf-8' } });

async function issueToken(env, orderId) {
  const token = [...crypto.getRandomValues(new Uint8Array(16))]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  const exp = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const ttl = 7 * 24 * 60 * 60;
  const payload = JSON.stringify({ token, exp, order: orderId });
  await env.TOKENS.put(`ord:${orderId}`, payload, { expirationTtl: ttl });
  await env.TOKENS.put(`tok:${token}`, payload, { expirationTtl: ttl });
  return token;
}

export async function onRequestPost({ request, env }) {
  const form = await request.formData();
  const get = (k) => String(form.get(k) || '');

  const order = get('var1');
  if (!order) return NG();

  if (env.DEV_FAKE_PAID === '1') {
    const existing = await env.TOKENS.get(`ord:${order}`);
    if (!existing) await issueToken(env, order);
    return OK();
  }

  const userid = get('userid');
  const linkkey = get('linkkey');
  const linkval = get('linkval');
  const price = parseInt(get('price') || '0', 10);
  const expected = parseInt(env.PRICE_WON || '1000', 10);

  const userOk = env.PAYAPP_USERID && userid === env.PAYAPP_USERID;
  const keyOk =
    (!env.PAYAPP_LINK_KEY || linkkey === env.PAYAPP_LINK_KEY) &&
    (!env.PAYAPP_LINK_VAL || linkval === env.PAYAPP_LINK_VAL);
  const priceOk = price >= expected;

  if (!userOk || !keyOk || !priceOk) {
    console.error('feedback reject', { userOk, keyOk, priceOk, price });
    return NG();
  }

  const existing = await env.TOKENS.get(`ord:${order}`);
  if (!existing) {
    await issueToken(env, order);
  }
  return OK();
}
