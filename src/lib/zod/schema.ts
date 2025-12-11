import { z } from "zod";

import {
  IdField,
  PasswordField,
  PowerField,
  PowerSelectField,
  ContentsField,
  FileField,
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
