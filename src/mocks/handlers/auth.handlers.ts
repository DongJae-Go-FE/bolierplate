import { http } from "msw";
import { createSuccessResponse, createErrorResponse } from "../utils";

const MOCK_USER = {
  id: "masterforce999",
  password: "123123!",
  name: "관리자",
  email: "masterforce999@example.com",
  role: "admin",
};

let currentSession: {
  userId: string;
  name: string;
  email: string;
  role: string;
} | null = null;

export const authHandlers = [
  http.post("/api/auth/login", async ({ request }) => {
    const body = (await request.json()) as {
      id: string;
      password: string;
    };

    if (body.id === MOCK_USER.id && body.password === MOCK_USER.password) {
      currentSession = {
        userId: MOCK_USER.id,
        name: MOCK_USER.name,
        email: MOCK_USER.email,
        role: MOCK_USER.role,
      };

      const token = "mock-jwt-token-" + Date.now();
      const response = createSuccessResponse(
        {
          user: currentSession,
          token,
        },
        "로그인에 성공했습니다",
      );

      response.headers.set(
        "Set-Cookie",
        `auth-token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`,
      );

      return response;
    }

    return createErrorResponse("아이디 또는 비밀번호가 올바르지 않습니다", 401);
  }),

  http.post("/api/auth/logout", async () => {
    currentSession = null;

    const response = createSuccessResponse(null, "로그아웃에 성공했습니다");

    response.headers.set(
      "Set-Cookie",
      "auth-token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0",
    );

    return response;
  }),

  http.get("/api/auth/me", async ({ request }) => {
    const cookieHeader = request.headers.get("cookie");
    const authHeader = request.headers.get("authorization");

    const bearerToken = authHeader?.toLowerCase().startsWith("bearer ")
      ? authHeader.slice(7)
      : null;
    const hasAuthToken = cookieHeader?.includes("auth-token=") || !!bearerToken;

    if (hasAuthToken) {
      if (!currentSession) {
        currentSession = {
          userId: MOCK_USER.id,
          name: MOCK_USER.name,
          email: MOCK_USER.email,
          role: MOCK_USER.role,
        };
      }

      return createSuccessResponse(
        currentSession,
        "사용자 정보를 조회했습니다",
      );
    }

    return createErrorResponse("인증되지 않은 사용자입니다", 401);
  }),
];
