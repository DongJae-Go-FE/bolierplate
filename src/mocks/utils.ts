import { HttpResponse, http, delay } from 'msw';

/**
 * 성공 응답을 생성하는 헬퍼 함수
 */
export const createSuccessResponse = <T>(data: T, message?: string) => {
  return HttpResponse.json({
    success: true,
    message: message || 'Success',
    data,
  });
};

/**
 * 에러 응답을 생성하는 헬퍼 함수
 */
export const createErrorResponse = (
  message: string,
  status = 400,
  errorCode?: string
) => {
  return HttpResponse.json(
    {
      success: false,
      message,
      errorCode,
    },
    { status }
  );
};

/**
 * 지연 시간을 추가하는 헬퍼 함수
 */
export const withDelay = async <T>(
  response: T,
  ms = 500
): Promise<T> => {
  await delay(ms);
  return response;
};

/**
 * 페이지네이션 응답을 생성하는 헬퍼 함수
 */
export const createPaginatedResponse = <T>(
  items: T[],
  page: number,
  pageSize: number,
  total?: number
) => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedItems = items.slice(start, end);
  const totalCount = total || items.length;

  return HttpResponse.json({
    success: true,
    data: paginatedItems,
    pagination: {
      page,
      pageSize,
      total: totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
    },
  });
};

/**
 * GET 요청 핸들러를 생성하는 헬퍼 함수
 */
export const createGetHandler = <T>(
  path: string,
  data: T,
  options?: {
    delay?: number;
    message?: string;
  }
) => {
  return http.get(path, async () => {
    if (options?.delay) {
      await delay(options.delay);
    }
    return createSuccessResponse(data, options?.message);
  });
};

/**
 * POST 요청 핸들러를 생성하는 헬퍼 함수
 */
export const createPostHandler = <T = any>(
  path: string,
  responseData: T | ((requestBody: any) => T),
  options?: {
    delay?: number;
    message?: string;
  }
) => {
  return http.post(path, async ({ request }) => {
    if (options?.delay) {
      await delay(options.delay);
    }
    const body = await request.json();
    const isFunction = typeof responseData === 'function' && !(responseData as any).constructor.name.match(/^(Object|Array|String|Number|Boolean)$/);
    const data = isFunction
      ? (responseData as (requestBody: any) => T)(body)
      : responseData;
    return createSuccessResponse(data, options?.message);
  });
};

/**
 * PUT 요청 핸들러를 생성하는 헬퍼 함수
 */
export const createPutHandler = <T = any>(
  path: string,
  responseData: T | ((requestBody: any) => T),
  options?: {
    delay?: number;
    message?: string;
  }
) => {
  return http.put(path, async ({ request }) => {
    if (options?.delay) {
      await delay(options.delay);
    }
    const body = await request.json();
    const isFunction = typeof responseData === 'function' && !(responseData as any).constructor.name.match(/^(Object|Array|String|Number|Boolean)$/);
    const data = isFunction
      ? (responseData as (requestBody: any) => T)(body)
      : responseData;
    return createSuccessResponse(data, options?.message);
  });
};

/**
 * DELETE 요청 핸들러를 생성하는 헬퍼 함수
 */
export const createDeleteHandler = (
  path: string,
  options?: {
    delay?: number;
    message?: string;
  }
) => {
  return http.delete(path, async () => {
    if (options?.delay) {
      await delay(options.delay);
    }
    return createSuccessResponse(null, options?.message || 'Successfully deleted');
  });
};

/**
 * 에러 핸들러를 생성하는 헬퍼 함수
 */
export const createErrorHandler = (
  path: string,
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  errorMessage: string,
  status = 400,
  options?: {
    delay?: number;
    errorCode?: string;
  }
) => {
  return http[method](path, async () => {
    if (options?.delay) {
      await delay(options.delay);
    }
    return createErrorResponse(errorMessage, status, options?.errorCode);
  });
};

/**
 * 랜덤 ID 생성
 */
export const generateMockId = () => {
  return Math.random().toString(36).substring(2, 11);
};

/**
 * 랜덤 날짜 생성
 */
export const generateMockDate = (daysAgo = 0) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

/**
 * 배열에서 랜덤 요소 선택
 */
export const randomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * 랜덤 숫자 생성
 */
export const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
