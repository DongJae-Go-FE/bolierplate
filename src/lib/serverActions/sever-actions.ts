"use server";
import { type z } from "zod";

import { LoginSchema, SignupSchema } from "@/lib/zod/schema";

//TODO. authV5 같은 거 쓰지 말 것 처음은 클라이언트 사이드로 구현 후 추후 서버 액션으로 전환할 것 이 - 서버 액션 디버깅 힘들어
// TODO: 현재는 MSW/목 데이터 기반. 실제 백엔드 API 연동 후 이 목 데이터를 제거하고 API 호출로 대체.
const MOCK_USER = {
  id: "masterforce999",
  password: "123123!",
  name: "관리자",
  email: "masterforce999@example.com",
  role: "admin",
};

type LoginInput = z.infer<typeof LoginSchema>;
type SignupInput = z.infer<typeof SignupSchema>;

export async function loginAction(payload: LoginInput) {
  const parsed = LoginSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      success: false,
      message: "유효하지 않은 입력입니다",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { id, pw } = parsed.data;

  if (id !== MOCK_USER.id || pw !== MOCK_USER.password) {
    return {
      success: false,
      message: "아이디 또는 비밀번호가 올바르지 않습니다",
    };
  }

  const token = `mock-jwt-token-${Date.now()}`;
  // 주의: 서버 액션에서는 타입상 cookies().set 지원이 제한되어 클라이언트에서 토큰을 쿠키/스토리지에 저장하도록 반환만 함.

  return {
    success: true,
    message: "로그인에 성공했습니다",
    data: {
      user: {
        userId: MOCK_USER.id,
        name: MOCK_USER.name,
        email: MOCK_USER.email,
        role: MOCK_USER.role,
      },
      token,
    },
  };
}

export async function signupAction(payload: SignupInput) {
  const parsed = SignupSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      success: false,
      message: "입력값을 확인해주세요",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  // TODO: 실제 회원가입 API로 교체. 현재는 목 응답만 반환.
  await new Promise((resolve) => setTimeout(resolve, 300));

  const { password, passwordConfirm, ...rest } = parsed.data;
  return {
    success: true,
    message: "회원가입이 완료되었습니다",
    data: rest,
  };
}

export async function logoutAction() {
  // TODO: 실제 백엔드 로그아웃 API로 교체. 현재는 목 응답만 반환.
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    success: true,
    message: "로그아웃에 성공했습니다",
  };
}
