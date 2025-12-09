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
  data: T;
  success: string;
  msg: string;
};

export async function customFetch(
  input: string | URL | Request,
  init?: RequestInit,
) {
  return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${input}`, init);
}
