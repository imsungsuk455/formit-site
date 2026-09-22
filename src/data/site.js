export const SITE = {
  // 사이트 이름
  name: '폼잇',
  brand: 'FormIt',
  domain: 'formit.org',
  tagline: '필요한 서식, 바로 만들어',
  description:
    '이력서·자소서·알바이력서 무료 다운로드와 40여 개 취업·생활 양식 전체 이용권. 결제 후 7일간 무제한 다운로드.',
  priceWon: 1000, // 페이앱 최소 결제금액 1,000원
  accessDays: 7,
  freeCount: 3,
  totalPlanned: 46,
  contactEmail: 'support@formit.org',
  operator: 'FormIt 운영팀',
};

export const FREE_FILES = [
  {
    id: 'resume-standard',
    name: '이력서 양식 (표준형)',
    desc: '인적사항·학력·경력·자격증·자기소개 한 장 완성. 월 검색 7만의 바로 그 양식.',
    file: '/files/free/이력서양식_표준형.docx',
    tag: '이력서 70,400',
  },
  {
    id: 'alba-resume',
    name: '알바 이력서 (단기알바)',
    desc: '근무 가능 시간표·시급·투입일까지 포함된 편의점·카페·식당 지원용.',
    file: '/files/free/알바이력서_단기알바_서식.docx',
    tag: '알바이력서 12,050',
  },
  {
    id: 'cover-letter',
    name: '자기소개서 작성 예시 (4항목)',
    desc: '성장과정·장단점·지원동기·포부 — 합격 구조 + STAR 예시 + 작성 팁.',
    file: '/files/free/자기소개서_작성예시_4항목.docx',
    tag: '자소서 14,270',
  },
];

export const CATEGORIES = [
  {
    id: 'resume',
    name: '취업 양식',
    blurb: '이력서·자소서·경력기술서·면접 준비',
    share: '40%',
    count: 18,
    items: [
      { name: '이력서 양식 (표준형)', ready: true, free: true },
      { name: '알바 이력서 (단기알바)', ready: true, free: true },
      { name: '자기소개서 작성 예시 4항목', ready: true, free: true },
      { name: '경력기술서 양식', ready: false },
      { name: '입사지원서 양식', ready: false },
      { name: '1분 자기소개 예시 모음', ready: false },
      { name: '면접 예상질문 50', ready: false },
      { name: '신입/경력 이력서 2종 세트', ready: false },
      { name: '지원동기 작문 가이드', ready: false },
      { name: '이력서 사진 규격 가이드', ready: false },
      { name: '자소서 항목별 예시 10선', ready: false },
      { name: '합격 자소서 클리닉 체크리스트', ready: false },
      { name: 'PT면접 스크립트 템플릿', ready: false },
      { name: 'AI면접 대비표', ready: false },
      { name: '어학성적 기재 가이드', ready: false },
      { name: '자격증 정리 양식', ready: false },
      { name: '포트폴리오 표지', ready: false },
      { name: '채용 공고 분석 워크시트', ready: false },
    ],
  },
  {
    id: 'life',
    name: '생활·사무 양식',
    blurb: '차용증·견적서·급여명세·회의록',
    share: '30%',
    count: 14,
    items: [
      { name: '차용증 (금전소비대차)', ready: true },
      { name: '견적서 (표준)', ready: true },
      { name: '회의록 (표준)', ready: true },
      { name: '위임장 양식', ready: false },
      { name: '내용증명 참고 양식', ready: false },
      { name: '급여명세서 양식', ready: false },
      { name: '근로계약서 샘플', ready: false },
      { name: '사직서 양식', ready: false },
      { name: '재직증명서 양식', ready: false },
      { name: '거래명세서', ready: false },
      { name: '제안서 양식', ready: false },
      { name: '회사소개서 골격', ready: false },
      { name: '연차관리 대장 (엑셀)', ready: false },
      { name: '지출결의서', ready: false },
    ],
  },
  {
    id: 'notion',
    name: '노션 템플릿',
    blurb: '가계부·할일·주간계획·회의록 (MD/CSV 임포트)',
    share: '20%',
    count: 8,
    items: [
      { name: '노션 가계부 (MD+가이드)', ready: false },
      { name: '노션 할일 관리', ready: false },
      { name: '노션 주간계획', ready: false },
      { name: '노션 회의록', ready: false },
      { name: '노션 습관 트래커', ready: false },
      { name: '노션 취업 준비 허브', ready: false },
      { name: '노션 캘린더', ready: false },
      { name: '노션 빠른 메모', ready: false },
    ],
  },
  {
    id: 'threads',
    name: '스레드·마케팅',
    blurb: '콘텐츠 캘린더·훅·제안서',
    share: '10%',
    count: 6,
    items: [
      { name: '스레드 30일 캘린더', ready: false },
      { name: '훅 문구 100', ready: false },
      { name: '계정 소개문 (바이오) 30', ready: false },
      { name: '스레드수익화 체크리스트', ready: false },
      { name: '소액 상품 제안서 템플릿', ready: false },
      { name: '콘텐츠 재활용 매트릭스', ready: false },
    ],
  },
];

export const FAQ = [
  {
    q: '결제 후 얼마나 쓸 수 있나요?',
    a: '결제 후 7일간 전체 이용권이 열립니다. 기간 내 원하는 파일을 횟수 제한 없이 다운로드할 수 있고, 만료되면 재결제 후 다시 7일이 시작됩니다.',
  },
  {
    q: '로그인이나 회원가입이 필요한가요?',
    a: '아니요. 결제창에서 휴대폰 번호만 입력하면 되고, 다운로드는 결제 직후 받는 전용 링크로 바로 열립니다.',
  },
  {
    q: '파일 형식은 뭔가요?',
    a: '모두 편집 가능한 DOCX(한글·워드 호환)입니다. 원하는 항목을 바꿔 바로 제출하거나 인쇄할 수 있습니다.',
  },
  {
    q: '무료 파일은 언제까지 무료인가요?',
    a: '이력서·알바이력서·자소서 예시 3종은 계속 무료입니다. 사이트 상단 "무료 다운로드"에서 회원가입 없이 받을 수 있습니다.',
  },
];
