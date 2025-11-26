import HttpRequest from "./http-request";

import { REQ_EXAMPLE_TYPE, RES_EXAMPLE_TYPE } from "./types";

export enum QueryKey {
  EXAMPLE,
}

/**
 * API 요청 함수 정의 파일
 *
 * GET 요청에 대한 API 함수들을 정의합니다.
 * POST, PUT, DELETE, PATCH 등의 다른 HTTP 메소드는
 * 페이지 컴포넌트에서 mutation으로 직접 처리합니다.
 *
 * @requires HttpRequest - HTTP 요청을 처리하는 유틸리티
 * @requires types - API 요청/응답 타입 정의
 *
 */

/**
 * React Query 쿼리 키 목록
 *
 * 각 GET API 요청에 대응하는 고유한 쿼리 키를 정의합니다.
 * React Query의 캐싱 및 무효화에 사용됩니다.
 *
 * @example
 * useQuery({ queryKey: [QueryKey.EXAMPLE], queryFn: () => GET_EXAMPLE_REQUEST(params) })
 */

/**
 * 예제 GET 요청 API
 *
 * @param queryString - 쿼리 파라미터 객체
 * @returns 예제 응답 데이터
 *
 * @example
 * // 직접 호출
 * const response = await GET_EXAMPLE_REQUEST({ example: "test" });
 *
 * @example
 * // React Query 사용
 * const { data, isLoading, error } = useQuery({
 *   queryKey: [QueryKey.EXAMPLE, { example: "test" }],
 *   queryFn: () => GET_EXAMPLE_REQUEST({ example: "test" })
 * });
 */

export async function GET_EXAMPLE_REQUEST(queryString: REQ_EXAMPLE_TYPE) {
  return await HttpRequest.get<RES_EXAMPLE_TYPE, REQ_EXAMPLE_TYPE>(
    "/example/url",
    queryString,
  );
}
