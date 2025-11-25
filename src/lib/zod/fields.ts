import { z } from "zod";

export const IdField = z
  .string()
  .nonempty({ message: "아이디는 필수로 입력해야 합니다." })
  .trim();

export const PasswordField = z
  .string()
  .min(4, { message: "비밀번호는 최소 4자 이상 입력해야 합니다." })
  .trim();
