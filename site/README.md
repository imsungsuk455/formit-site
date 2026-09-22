# 폼잇 (FormIt) — 1,000원 전체 이용권 사이트

취업·생활 양식 파일 판매 사이트. Astro(정적) + Cloudflare Pages Functions + KV + R2. 도메인: formit.org

## 구조

```
site/
  src/                 Astro 페이지 (랜딩·카탈로그·성공·라이브러리)
  functions/api/       결제·토큰·다운로드 (Cloudflare Pages Functions)
  public/files/free/   무료 DOCX (즉시 다운로드)
  storage/paid/        유료 DOCX (R2로 업로드)
```

## 결제 흐름 (페이앱)

1. `/catalog` → 휴대폰 번호 입력 → `POST /api/checkout`
2. 페이앱 REST(`apiLoad.html`) → `payurl` 반환 → 결제창 이동
3. 승인 시 페이앱이 `POST /api/feedback` 호출 → 검증 → KV에 7일 토큰 발급 → `SUCCESS` 응답
4. 구매자는 `returnurl` → `/success?order=` → 토큰 확인 → `/library?t=`
5. `/api/file?t=&k=` → R2에서 DOCX 스트리밍

> ⚠️ **페이앱 최소 결제금액은 1,000원** — 990원은 불가. `PRICE_WON=1000`.

## 배포 순서

### 1. 로컬 빌드 확인

```powershell
cd site
npm install
$env:DEV_FAKE_PAID="1"; npm run dev
# http://localhost:4321/catalog → 결제 플로우 로컬 테스트
npm run build
```

### 2. GitHub

```powershell
git init
git add .
git commit -m "init: formit site"
# GitHub에 새 리포트 생성 후
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

### 3. Cloudflare Pages 연결

1. Cloudflare 대시보드 → Workers & Pages → Create → Pages → Git 연결
2. 빌드 명령어: `npm run build` / 출력 디렉터리: `dist`
3. 환경변수(Production) 추가:
   - `PAYAPP_USERID` = 페이앱 판매자 아이디
   - `PAYAPP_LINK_KEY` = 페이앱 개발자센터 연동 KEY
   - `PAYAPP_LINK_VAL` = 페이앱 개발자센터 연동 VALUE
   - `PRICE_WON` = `1000`
   - `DEV_FAKE_PAID` = 비워두기 (운영)

### 4. KV / R2 생성 (터미널 1회)

```powershell
npx wrangler kv namespace create TOKENS
npx wrangler r2 bucket create store-files
```

- KV `id`를 `wrangler.toml`에 채우고 대시보드에서 Pages 프로젝트 → Settings → Bindings에 추가:
  - KV Namespace: binding `TOKENS`
  - R2 Bucket: binding `FILES`, bucket `store-files`

### 5. 유료 파일 R2 업로드

```powershell
Get-ChildItem storage/paid/*.docx | ForEach-Object {
  npx wrangler r2 object put "store-files/paid/$($_.Name)" --file "$($_.FullName)"
}
```

### 6. 도메인

Cloudflare Pages → Custom domain 추가 (본인 도메인) 후 `astro.config.mjs`의 `site` URL 변경.

### 7. 페이앱 테스트 결제

1. 페이앱 관리자 → 설정 → 결제 설정에서 테스트모드 확인
2. `https://docs.payapp.kr/dev_center01.html` 참고해 연동 KEY/VALUE 확인
3. 실제 카드 소액 결제 1건 → `/library`에서 다운로드 확인 → 관리자에서 취소

## 파일 추가 방법

1. `scripts/`로 DOCX 생성 → `public/files/free/` 또는 `storage/paid/`에 복사
2. 유료는 R2 업로드 + `functions/api/files.js`의 `PAID_FILES`에 항목 추가
3. `src/data/site.js` 카탈로그에 `ready: true`로 변경
4. `git push` → Pages 자동 배포
