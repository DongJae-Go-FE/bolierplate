# MSW CRUD API 사용 가이드

이 프로젝트에는 완전한 CRUD 기능을 갖춘 MSW 핸들러가 설정되어 있습니다.

## 📋 목 데이터 구조

```typescript
interface Item {
  id: number;
  header: string;
  type: string; // "Narrative" | "Technical content" | "Research"
  status: string; // "Done" | "In Process"
  target: string;
  limit: string;
  reviewer: string;
  createdAt?: string;
  updatedAt?: string;
}
```

## 🚀 API 엔드포인트

### 1. 목록 조회 (페이지네이션 + 검색 + 필터)

```typescript
GET /api/items?page=1&pageSize=10&search=keyword&type=Narrative&status=Done
```

**쿼리 파라미터:**
- `page`: 페이지 번호 (기본값: 1)
- `pageSize`: 페이지당 항목 수 (기본값: 10)
- `search`: 검색 키워드 (header, type, reviewer 검색)
- `type`: 타입 필터 ("Narrative", "Technical content", "Research")
- `status`: 상태 필터 ("Done", "In Process")

**응답:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

**사용 예시:**
```typescript
// fetch API
const response = await fetch('/api/items?page=1&pageSize=10');
const data = await response.json();

// react-query
const { data } = useQuery({
  queryKey: ['items', page, pageSize, search],
  queryFn: () =>
    fetch(`/api/items?page=${page}&pageSize=${pageSize}&search=${search}`)
      .then(res => res.json())
});
```

---

### 2. 단일 항목 조회

```typescript
GET /api/items/:id
```

**응답:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "header": "Executive summary",
    "type": "Narrative",
    "status": "Done",
    "target": "10",
    "limit": "13",
    "reviewer": "Eddie Lake",
    "createdAt": "2024-12-10T10:00:00Z",
    "updatedAt": "2024-12-12T10:00:00Z"
  }
}
```

**사용 예시:**
```typescript
const response = await fetch('/api/items/1');
const { data } = await response.json();
```

---

### 3. 항목 생성

```typescript
POST /api/items
```

**요청 본문:**
```json
{
  "header": "새로운 항목",
  "type": "Narrative",
  "status": "In Process",
  "target": "15",
  "limit": "20",
  "reviewer": "Eddie Lake"
}
```

**응답:**
```json
{
  "success": true,
  "message": "항목이 생성되었습니다",
  "data": {
    "id": 51,
    "header": "새로운 항목",
    "type": "Narrative",
    "status": "In Process",
    "target": "15",
    "limit": "20",
    "reviewer": "Eddie Lake",
    "createdAt": "2024-12-12T10:00:00Z",
    "updatedAt": "2024-12-12T10:00:00Z"
  }
}
```

**사용 예시:**
```typescript
const newItem = {
  header: "새로운 항목",
  type: "Narrative",
  status: "In Process",
  target: "15",
  limit: "20",
  reviewer: "Eddie Lake"
};

const response = await fetch('/api/items', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newItem)
});
const { data } = await response.json();

// react-query
const mutation = useMutation({
  mutationFn: (newItem) =>
    fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    }).then(res => res.json())
});
```

---

### 4. 항목 수정 (전체)

```typescript
PUT /api/items/:id
```

**요청 본문:**
```json
{
  "header": "수정된 항목",
  "type": "Research",
  "status": "Done",
  "target": "20",
  "limit": "25",
  "reviewer": "Carlos Rodriguez"
}
```

**응답:**
```json
{
  "success": true,
  "message": "항목이 수정되었습니다",
  "data": {
    "id": 1,
    "header": "수정된 항목",
    "type": "Research",
    "status": "Done",
    "target": "20",
    "limit": "25",
    "reviewer": "Carlos Rodriguez",
    "createdAt": "2024-12-10T10:00:00Z",
    "updatedAt": "2024-12-12T10:30:00Z"
  }
}
```

**사용 예시:**
```typescript
const updatedItem = {
  header: "수정된 항목",
  type: "Research",
  status: "Done",
  target: "20",
  limit: "25",
  reviewer: "Carlos Rodriguez"
};

const response = await fetch('/api/items/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(updatedItem)
});
```

---

### 5. 항목 부분 수정

```typescript
PATCH /api/items/:id
```

**요청 본문 (일부 필드만 전송):**
```json
{
  "status": "Done"
}
```

**사용 예시:**
```typescript
const response = await fetch('/api/items/1', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ status: "Done" })
});
```

---

### 6. 단일 항목 삭제

```typescript
DELETE /api/items/:id
```

**응답:**
```json
{
  "success": true,
  "message": "항목이 삭제되었습니다",
  "data": null
}
```

**사용 예시:**
```typescript
const response = await fetch('/api/items/1', {
  method: 'DELETE'
});

// react-query
const mutation = useMutation({
  mutationFn: (id) =>
    fetch(`/api/items/${id}`, { method: 'DELETE' })
      .then(res => res.json())
});
```

---

### 7. 다중 항목 삭제

```typescript
POST /api/items/delete-many
```

**요청 본문:**
```json
{
  "ids": [1, 2, 3, 4, 5]
}
```

**응답:**
```json
{
  "success": true,
  "message": "5개의 항목이 삭제되었습니다",
  "data": {
    "deletedCount": 5
  }
}
```

**사용 예시:**
```typescript
const response = await fetch('/api/items/delete-many', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ ids: [1, 2, 3] })
});
```

---

### 8. 통계 조회

```typescript
GET /api/items/stats
```

**응답:**
```json
{
  "success": true,
  "data": {
    "total": 50,
    "byType": {
      "Narrative": 25,
      "Technical content": 20,
      "Research": 5
    },
    "byStatus": {
      "Done": 35,
      "In Process": 15
    }
  }
}
```

---

## 📚 React Query 사용 예시

### 목록 조회
```typescript
import { useQuery } from '@tanstack/react-query';

function ItemList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['items', page, search],
    queryFn: async () => {
      const res = await fetch(
        `/api/items?page=${page}&pageSize=10&search=${search}`
      );
      return res.json();
    }
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {data.data.map(item => (
        <div key={item.id}>{item.header}</div>
      ))}
    </div>
  );
}
```

### 생성
```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';

function CreateItemForm() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newItem) => {
      const res = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });
      return res.json();
    },
    onSuccess: () => {
      // 목록 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ['items'] });
    }
  });

  const handleSubmit = (formData) => {
    mutation.mutate(formData);
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### 수정
```typescript
const mutation = useMutation({
  mutationFn: async ({ id, data }) => {
    const res = await fetch(`/api/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['items'] });
  }
});
```

### 삭제
```typescript
const mutation = useMutation({
  mutationFn: async (id) => {
    const res = await fetch(`/api/items/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['items'] });
  }
});
```

---

## 🎯 에러 처리

모든 API는 에러 발생 시 다음 형식으로 응답합니다:

```json
{
  "success": false,
  "message": "에러 메시지",
  "errorCode": "ERROR_CODE"
}
```

**에러 코드:**
- `NOT_FOUND` (404): 항목을 찾을 수 없음
- `VALIDATION_ERROR` (400): 유효성 검사 실패
- `BAD_REQUEST` (400): 잘못된 요청

---

## ⚙️ 목 데이터 커스터마이징

목 데이터를 수정하려면 [src/mocks/data/items.ts](src/mocks/data/items.ts) 파일을 편집하세요:

```typescript
// 초기 데이터 변경
export const initialItems: Item[] = [
  {
    id: 1,
    header: '커스텀 항목',
    type: 'Narrative',
    status: 'Done',
    target: '10',
    limit: '20',
    reviewer: 'John Doe',
  },
  // ...
];
```

---

## 🔧 핸들러 커스터마이징

핸들러를 수정하려면 [src/mocks/handlers/items.handlers.ts](src/mocks/handlers/items.handlers.ts) 파일을 편집하세요.

예: 네트워크 지연 시간 변경
```typescript
http.get('/api/items', async ({ request }) => {
  await delay(1000); // 1초로 변경
  // ...
});
```
