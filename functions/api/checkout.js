const PAYAPP_ENDPOINT = 'https://api.payapp.kr/oapi/apiLoad.html';

export async function onRequestPost({ request, env }) {
  let phone = '';
  try {
    const body = await request.json();
    phone = String(body.phone || '').replace(/[^0-9]/g, '');
  } catch {
    return Response.json({ error: '잘못된 요청입니다.' }, { status: 400 });
  }

  if (phone.length < 10) {
    return Response.json({ error: '휴대폰 번호를 확인해주세요.' }, { status: 400 });
  }

  const price = parseInt(env.PRICE_WON || '1000', 10);
  const orderId = crypto.randomUUID();
  const origin = new URL(request.url).origin;

  if (env.DEV_FAKE_PAID === '1') {
    return Response.json({ payurl: `${origin}/success?order=${orderId}` });
  }

  if (!env.PAYAPP_USERID) {
    return Response.json(
      { error: '결제 시스템 준비 중입니다. (PAYAPP_USERID 미설정)' },
      { status: 503 },
    );
  }

  const form = new URLSearchParams({
    cmd: 'payrequest',
    userid: env.PAYAPP_USERID,
    goodname: '전체 이용권 (7일)',
    price: String(price),
    recvphone: phone,
    feedbackurl: `${origin}/api/feedback`,
    returnurl: `${origin}/api/return`,
    var1: orderId,
    smsuse: 'n',
    checkretry: 'y',
    skip_cstpage: 'y',
    charset: 'utf-8',
  });

  try {
    const res = await fetch(PAYAPP_ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: form.toString(),
    });
    const text = await res.text();
    const parsed = new URLSearchParams(text);
    const state = parsed.get('state');
    const payurl = parsed.get('payurl');

    if (state !== '1' || !payurl) {
      const msg = parsed.get('errorMessage') || '결제 요청에 실패했습니다.';
      return Response.json({ error: msg }, { status: 502 });
    }

    await env.TOKENS.put(`mul:${orderId}`, parsed.get('mul_no') || '', {
      expirationTtl: 3600,
    });

    return Response.json({ payurl });
  } catch {
    return Response.json({ error: '결제 서버에 연결할 수 없습니다.' }, { status: 502 });
  }
}
