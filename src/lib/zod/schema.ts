import { z } from "zod";

import {
  IdField,
  PasswordField,
  PowerField,
  PowerSelectField,
  ContentsField,
  FileField,
  EmailField,
  NameField,
  DepartmentField,
  EmployeeNumberField,
} from "./fields";

export const LoginSchema = z.object({
  id: IdField,
  pw: PasswordField,
});

export const PasswordChangeSchema = z.object({
  oldPassword: PasswordField,
  newPassword: PasswordField,
  newPasswordOneMore: PasswordField,
});

export const PageSchema = z.object({
  id: IdField,
  power: PowerField,
  power2: PowerSelectField,
  contents: ContentsField,
  upload1: FileField,
  upload2: FileField,
});

// Item CRUD Schema
export const ItemSchema = z.object({
  header: z.string().min(1, "제목을 입력해주세요"),
  type: z.enum(["Narrative", "Technical content", "Research"], {
    message: "타입을 선택해주세요",
  }),
  status: z.enum(["In Process", "Done"], {
    message: "상태를 선택해주세요",
  }),
  target: z.string().optional(),
  limit: z.string().optional(),
  reviewer: z.string().min(1, "검토자를 입력해주세요"),
  upload1: FileField.optional(),
  upload2: FileField.optional(),
});

export const SignupSchema = z
  .object({
    id: IdField,
    password: PasswordField,
    passwordConfirm: PasswordField,
    email: EmailField,
    name: NameField,
    department: DepartmentField,
    employeeNumber: EmployeeNumberField,
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });
