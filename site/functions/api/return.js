export async function onRequestPost({ request }) {
  const form = await request.formData();
  const order = String(form.get('var1') || form.get('order') || '');
  const origin = new URL(request.url).origin;
  const target = `${origin}/success?order=${encodeURIComponent(order)}`;
  return Response.redirect(target, 302);
}

export async function onRequestGet({ request }) {
  const url = new URL(request.url);
  const order = url.searchParams.get('order') || '';
  const origin = url.origin;
  return Response.redirect(`${origin}/success?order=${encodeURIComponent(order)}`, 302);
}
