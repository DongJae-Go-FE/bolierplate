/**
 * MSW 모킹 응답 타입 정의
 */

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T;
  errorCode?: string;
}

export interface PaginatedResponse<T = any> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface ErrorResponse {
  success: false;
  message: string;
  errorCode?: string;
}
