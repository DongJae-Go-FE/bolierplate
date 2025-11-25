import { z } from "zod";

import { IdField, PasswordField } from "./fields";

export const LoginSchema = z.object({
  id: IdField,
  pw: PasswordField,
});

export const PasswordChangeSchema = z.object({
  oldPassword: PasswordField,
  newPassword: PasswordField,
  newPasswordOneMore: PasswordField,
});
