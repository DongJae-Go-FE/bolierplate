# MSW (Mock Service Worker) 설정 가이드

이 프로젝트에는 MSW가 설정되어 있어 API 모킹을 쉽게 할 수 있습니다.

## 📁 파일 구조

```
src/mocks/
├── handlers.ts           # 실제 API 핸들러를 정의하는 파일
├── handlers.example.ts   # 핸들러 작성 예시 파일
├── browser.ts           # 브라우저용 MSW 설정
├── utils.ts             # 목킹 유틸리티 함수
└── README.md            # 이 파일
```

## 🚀 시작하기

### 1. MSW는 개발 환경에서 자동으로 실행됩니다

`layout.tsx`에 `MSWProvider`가 이미 설정되어 있어 개발 서버 실행 시 자동으로 MSW가 활성화됩니다.

```bash
pnpm dev
```

브라우저 콘솔에 `[MSW] Mock Service Worker started` 메시지가 표시되면 정상 작동 중입니다.

### 2. 핸들러 추가하기

`src/mocks/handlers.ts` 파일에 API 핸들러를 추가합니다:

```typescript
import { http, HttpResponse } from 'msw';

export const handlers = [
  // GET 요청 예시
  http.get('/api/users', () => {
    return HttpResponse.json({
      users: [
        { id: 1, name: '홍길동' },
        { id: 2, name: '김철수' },
      ],
    });
  }),

  // POST 요청 예시
  http.post('/api/users', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      message: '사용자가 생성되었습니다',
      user: body,
    });
  }),
];
```

## 🛠️ 유틸리티 함수 사용하기

`utils.ts`에는 핸들러 작성을 쉽게 해주는 유틸리티 함수들이 있습니다:

### 1. 간편한 핸들러 생성

```typescript
import { createGetHandler, createPostHandler } from './utils';

// GET 핸들러
const getUsersHandler = createGetHandler(
  '/api/users',
  [{ id: 1, name: '홍길동' }],
  { delay: 500 }
);

// POST 핸들러
const createUserHandler = createPostHandler(
  '/api/users',
  (requestBody) => ({ id: generateMockId(), ...requestBody }),
  { message: '사용자가 생성되었습니다' }
);
```

### 2. 응답 생성

```typescript
import { createSuccessResponse, createErrorResponse } from './utils';

// 성공 응답
createSuccessResponse({ data: '...' }, '성공 메시지');

// 에러 응답
createErrorResponse('에러 메시지', 400, 'ERROR_CODE');
```

### 3. 페이지네이션

```typescript
import { createPaginatedResponse } from './utils';

http.get('/api/posts', ({ request }) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get('page')) || 1;
  const pageSize = Number(url.searchParams.get('pageSize')) || 10;

  const items = [...]; // 전체 아이템 배열
  return createPaginatedResponse(items, page, pageSize);
});
```

### 4. 모킹 데이터 생성

```typescript
import { generateMockId, generateMockDate, randomItem, randomNumber } from './utils';

const mockUser = {
  id: generateMockId(), // 랜덤 ID 생성
  name: randomItem(['홍길동', '김철수', '이영희']), // 배열에서 랜덤 선택
  age: randomNumber(20, 60), // 20-60 사이 랜덤 숫자
  createdAt: generateMockDate(7), // 7일 전 날짜
};
```

## 📚 예시 보기

`handlers.example.ts` 파일에 다양한 사용 예시가 있습니다:

- 기본 CRUD 작업
- 인증 (로그인/회원가입)
- 페이지네이션
- 파일 업로드
- 에러 처리
- 조건부 응답
- 지연 시간 추가

## 🎯 실전 사용 예시

### 로그인 API 모킹

```typescript
// handlers.ts
import { http } from 'msw';
import { createSuccessResponse, createErrorResponse } from './utils';

export const handlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const { email, password } = await request.json();

    if (email === 'test@example.com' && password === 'password') {
      return createSuccessResponse({
        token: 'mock-jwt-token',
        user: { email, name: '테스트 사용자' },
      });
    }

    return createErrorResponse('로그인 실패', 401);
  }),
];
```

### 게시글 목록 API 모킹

```typescript
const mockPosts = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `게시글 ${i + 1}`,
  content: '내용...',
  createdAt: generateMockDate(i),
}));

export const handlers = [
  http.get('/api/posts', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const pageSize = Number(url.searchParams.get('pageSize')) || 10;

    return createPaginatedResponse(mockPosts, page, pageSize);
  }),
];
```

## ⚙️ 설정 옵션

### MSW 비활성화

개발 중 특정 API만 실제 서버로 보내고 싶을 때:

```typescript
// handlers.ts
export const handlers = [
  // 이 API만 모킹
  http.get('/api/users', () => { ... }),

  // 다른 API는 실제 서버로 전송됨
];
```

### 프로덕션에서 비활성화

MSW는 `NODE_ENV === 'development'`일 때만 작동하므로 프로덕션 빌드에서는 자동으로 비활성화됩니다.

## 🔧 문제 해결

### MSW가 시작되지 않을 때

1. 브라우저 콘솔 확인
2. `public/mockServiceWorker.js` 파일이 존재하는지 확인
3. 개발 서버 재시작

### 핸들러가 작동하지 않을 때

1. URL 패턴이 정확한지 확인
2. `handlers.ts`에 핸들러가 export되어 있는지 확인
3. 브라우저 Network 탭에서 요청 확인

## 📖 더 알아보기

- [MSW 공식 문서](https://mswjs.io/)
- [MSW GitHub](https://github.com/mswjs/msw)
