const PAYAPP_ENDPOINT = 'https://api.payapp.kr/oapi/apiLoad.html';

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: '잘못된 요청입니다.' }, { status: 400 });
  }

  const mul_no = String(body.mul_no || '');
  const cancelmemo = String(body.cancelmemo || '환불 요청');

  if (!mul_no) {
    return Response.json({ error: 'mul_no(결제요청번호)가 필요합니다.' }, { status: 400 });
  }

  const required = ['PAYAPP_USERID', 'PAYAPP_LINK_KEY'];
  for (const k of required) {
    if (!env[k]) {
      return Response.json({ error: `${k} 미설정` }, { status: 503 });
    }
  }

  const form = new URLSearchParams({
    cmd: 'paycancel',
    userid: env.PAYAPP_USERID,
    linkkey: env.PAYAPP_LINK_KEY,
    mul_no,
    cancelmemo,
  });

  try {
    const res = await fetch(PAYAPP_ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: form.toString(),
    });
    const text = await res.text();
    const parsed = new URLSearchParams(text);
    if (parsed.get('state') !== '1') {
      return Response.json(
        { error: parsed.get('errorMessage') || '결제 취소에 실패했습니다.' },
        { status: 502 },
      );
    }
    // 참고: 토큰은 최대 7일 뒤 자동 만료. 즉시 무효화가 필요하면
    // mul_no→orderId 매핑(env.TOKENS `mul:` 키)을 조회해 `ord:`·`tok:` 삭제.
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: '결제 서버에 연결할 수 없습니다.' }, { status: 502 });
  }
}