const PAID_FILES = [
  { key: 'paid/차용증_금전소비대차_서식.docx', name: '차용증 (금전소비대차)' },
  { key: 'paid/견적서_표준_양식.docx', name: '견적서 (표준)' },
  { key: 'paid/회의록_표준_양식.docx', name: '회의록 (표준)' },
];

export async function onRequestGet({ request, env }) {
  const t = new URL(request.url).searchParams.get('t') || '';
  if (!t) return Response.json({ ok: false }, { status: 401 });

  const entry = await env.TOKENS.get(`tok:${t}`, 'json');
  if (!entry) return Response.json({ ok: false }, { status: 401 });

  const daysLeft = Math.max(1, Math.ceil((entry.exp - Date.now()) / (24 * 60 * 60 * 1000)));
  return Response.json({ ok: true, daysLeft, files: PAID_FILES });
}
