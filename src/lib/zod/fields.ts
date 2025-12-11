import { z } from "zod";

export const IdField = z
  .string()
  .nonempty({ message: "아이디는 필수로 입력해야 합니다." })
  .trim();

export const PasswordField = z
  .string()
  .min(4, { message: "비밀번호는 최소 4자 이상 입력해야 합니다." })
  .trim();

export const PowerField = z
  .string()
  .nonempty({ message: "권한은 필수로 입력해야 합니다." })
  .trim();

export const PowerSelectField = z
  .string()
  .nonempty({ message: "권한을 선택해야 합니다." });

export const ContentsField = z
  .string()
  .nonempty({ message: "내용은 필수로 입력해야 합니다." })
  .trim();

export const FileField = z
  .array(z.instanceof(File))
  .optional()
  .refine((files) => !files || files.length <= 10, {
    message: "파일은 최대 5개까지 업로드할 수 있습니다.",
  })
  .refine(
    (files) => !files || files.every((file) => file.size <= 10 * 1024 * 1024),
    {
      message: "파일 크기는 최대 MB까지 가능합니다.",
    },
  );
