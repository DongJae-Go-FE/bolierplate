/**
 *
 * !!!! MOCK 데이터용 
 * 나중에 custom-fetch-common.ts를 custom-fetch.ts로 바꿔서 로직으로 직접 설계해서 사용할 것 
 * 
 * 
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
  // MSW를 사용하는 /api 경로는 base URL을 추가하지 않음
  const url =
    typeof input === "string" && input.startsWith("/api")
      ? input
      : `${process.env.NEXT_PUBLIC_API_BASE_URL}${input}`;

  // 쿠키의 auth-token을 Authorization 헤더로도 전달 (쿠키 삭제 시 함께 사라짐)
  let headers: HeadersInit | undefined = init?.headers;
  if (typeof document !== "undefined") {
    const token =
      document.cookie
        ?.split(";")
        .map((c) => c.trim())
        .find((c) => c.startsWith("auth-token="))
        ?.split("=")[1] || "";

    if (token) {
      headers = {
        ...(init?.headers || {}),
        Authorization: `Bearer ${token}`,
      };
    }
  }

  return fetch(url, {
    credentials: "include",
    ...init,
    headers,
  });
}
