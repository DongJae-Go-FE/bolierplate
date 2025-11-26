/**
 * API 요청 및 응답 타입 정의 파일
 *
 * 모든 HTTP 메소드(GET, POST, PUT, DELETE 등)에 대한 타입을 정의합니다.
 *
 * @naming-convention
 * - 요청 타입: REQ_{API명}_TYPE
 * - 응답 타입: RES_{API명}_TYPE
 * - API명은 전체 대문자로 작성 (예: USER_LOGIN, PRODUCT_LIST)
 *
 * @example
 * export type REQ_USER_LOGIN_TYPE = { email: string; password: string; };
 * export type RES_USER_LOGIN_TYPE = CommonResponse<{ token: string; }>;
 */

/**
 * 공통 API 응답 타입
 * 추후 변경
 * @template T - 응답 데이터의 타입 (기본값: unknown)
 *
 * @property {string} timestamp - 응답 생성 시간 (ISO 8601 형식)
 * @property {boolean} success - 요청 성공 여부
 * @property {string} msg - 응답 메시지
 * @property {number} code - 응답 코드 (HTTP 상태 코드 또는 커스텀 코드)
 * @property {unknown} error - 에러 정보 (에러 발생 시)
 * @property {T[]} data - 응답 데이터 배열
 */
export type CommonResponse<T = unknown> = {
  timestamp: string;
  success: boolean;
  msg: string;
  code: number;
  error: unknown;
  data: T[];
};

/**
 * 예제 API 요청 타입
 *
 * @property {string} example - 예제 필드
 */
export type REQ_EXAMPLE_TYPE = {
  example: string;
};

/**
 * 예제 API 응답 타입
 *
 * CommonResponse를 확장하여 example 필드를 포함한 데이터를 반환합니다.
 */
export type RES_EXAMPLE_TYPE = CommonResponse<{
  example: string;
}>;
