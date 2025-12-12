import { http, HttpResponse, delay } from 'msw';
import { db, Item } from '../data/items';
import {
  createSuccessResponse,
  createErrorResponse,
  createPaginatedResponse,
} from '../utils';

export const itemsHandlers = [
  // 목록 조회 (페이지네이션 + 검색 + 필터)
  http.get('/api/items', async ({ request }) => {
    await delay(300); // 네트워크 지연 시뮬레이션

    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const pageSize = Number(url.searchParams.get('pageSize')) || 10;
    const search = url.searchParams.get('search') || '';
    const type = url.searchParams.get('type') || '';
    const status = url.searchParams.get('status') || '';

    let items = db.getAll();

    // 검색 필터 적용
    if (search) {
      items = items.filter(
        (item) =>
          item.header.toLowerCase().includes(search.toLowerCase()) ||
          item.type.toLowerCase().includes(search.toLowerCase()) ||
          item.reviewer.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 타입 필터 적용
    if (type) {
      items = items.filter((item) => item.type === type);
    }

    // 상태 필터 적용
    if (status) {
      items = items.filter((item) => item.status === status);
    }

    // 페이지네이션
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedItems = items.slice(start, end);

    return HttpResponse.json({
      success: true,
      data: paginatedItems,
      pagination: {
        page,
        pageSize,
        total: items.length,
        totalPages: Math.ceil(items.length / pageSize),
      },
    });
  }),

  // 단일 항목 조회
  http.get('/api/items/:id', async ({ params }) => {
    await delay(200);

    const id = Number(params.id);
    const item = db.getById(id);

    if (!item) {
      return createErrorResponse('항목을 찾을 수 없습니다', 404, 'NOT_FOUND');
    }

    return createSuccessResponse(item);
  }),

  // 항목 생성
  http.post('/api/items', async ({ request }) => {
    await delay(500);

    try {
      const body = await request.json() as Omit<Item, 'id' | 'createdAt' | 'updatedAt'>;

      // 유효성 검사
      if (!body.header || !body.type || !body.status) {
        return createErrorResponse(
          '필수 필드가 누락되었습니다',
          400,
          'VALIDATION_ERROR'
        );
      }

      const newItem = db.create(body);
      return createSuccessResponse(newItem, '항목이 생성되었습니다');
    } catch (error) {
      return createErrorResponse('잘못된 요청입니다', 400, 'BAD_REQUEST');
    }
  }),

  // 항목 수정
  http.put('/api/items/:id', async ({ params, request }) => {
    await delay(500);

    try {
      const id = Number(params.id);
      const body = await request.json() as Partial<Item>;

      const updatedItem = db.update(id, body);

      if (!updatedItem) {
        return createErrorResponse('항목을 찾을 수 없습니다', 404, 'NOT_FOUND');
      }

      return createSuccessResponse(updatedItem, '항목이 수정되었습니다');
    } catch (error) {
      return createErrorResponse('잘못된 요청입니다', 400, 'BAD_REQUEST');
    }
  }),

  // 항목 부분 수정 (PATCH)
  http.patch('/api/items/:id', async ({ params, request }) => {
    await delay(500);

    try {
      const id = Number(params.id);
      const body = await request.json() as Partial<Item>;

      const updatedItem = db.update(id, body);

      if (!updatedItem) {
        return createErrorResponse('항목을 찾을 수 없습니다', 404, 'NOT_FOUND');
      }

      return createSuccessResponse(updatedItem, '항목이 수정되었습니다');
    } catch (error) {
      return createErrorResponse('잘못된 요청입니다', 400, 'BAD_REQUEST');
    }
  }),

  // 단일 항목 삭제
  http.delete('/api/items/:id', async ({ params }) => {
    await delay(300);

    const id = Number(params.id);
    const success = db.delete(id);

    if (!success) {
      return createErrorResponse('항목을 찾을 수 없습니다', 404, 'NOT_FOUND');
    }

    return createSuccessResponse(null, '항목이 삭제되었습니다');
  }),

  // 다중 항목 삭제
  http.post('/api/items/delete-many', async ({ request }) => {
    await delay(500);

    try {
      const body = await request.json() as { ids: number[] };

      if (!body.ids || !Array.isArray(body.ids)) {
        return createErrorResponse(
          '삭제할 항목 ID가 필요합니다',
          400,
          'VALIDATION_ERROR'
        );
      }

      const deletedCount = db.deleteMany(body.ids);

      return createSuccessResponse(
        { deletedCount },
        `${deletedCount}개의 항목이 삭제되었습니다`
      );
    } catch (error) {
      return createErrorResponse('잘못된 요청입니다', 400, 'BAD_REQUEST');
    }
  }),

  // 통계 조회 (추가 기능)
  http.get('/api/items/stats', async () => {
    await delay(200);

    const items = db.getAll();

    const stats = {
      total: items.length,
      byType: items.reduce(
        (acc, item) => {
          acc[item.type] = (acc[item.type] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      ),
      byStatus: items.reduce(
        (acc, item) => {
          acc[item.status] = (acc[item.status] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      ),
    };

    return createSuccessResponse(stats);
  }),
];
