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
