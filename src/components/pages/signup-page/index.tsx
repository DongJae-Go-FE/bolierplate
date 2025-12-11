"use client";

import { useRouter } from "next/navigation";

import { useState, FormEvent } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@hdc-ui/components/ui/alert-dialog";
import { Button } from "@hdc-ui/components/ui/button";
import { Input } from "@hdc-ui/components/ui/input";

import { FormRoot, FormControl, FormField, FormMessage } from "../../ui/form";

import { cn } from "@hdc-ui/utils";

import { SignupSchema } from "../../../lib/zod/schema";

export default function SignUp() {
  const { push } = useRouter();

  const [formDataObj, setFormDataObj] = useState({
    id: "",
    password: "",
    passwordConfirm: "",
    email: "",
    name: "",
    department: "",
    employeeNumber: "",
  });

  const [errors, setErrors] = useState<{
    id?: string[];
    password?: string[];
    passwordConfirm?: string[];
    email?: string[];
    name?: string[];
    department?: string[];
    employeeNumber?: string[];
  }>({});

  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormDataObj((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validatedFields = SignupSchema.safeParse({
      id: formDataObj.id,
      password: formDataObj.password,
      passwordConfirm: formDataObj.passwordConfirm,
      email: formDataObj.email,
      name: formDataObj.name,
      department: formDataObj.department,
      employeeNumber: formDataObj.employeeNumber,
    });

    if (!validatedFields.success) {
      setErrors(validatedFields.error.flatten().fieldErrors);
      return;
    } else {
      setErrors({});

      // TODO: POST 요청 로직 추가
      // API 호출 예시:
      // const response = await fetch('/api/signup', {
      //   method: 'POST',
      //   body: JSON.stringify(validatedFields.data),
      // });

      // 임시로 성공 메시지 표시
      setIsSuccess(true);
    }
  };

  return (
    <div className="flex w-full max-w-xl flex-col text-gray-900 max-[390px]:px-2">
      <h1 className="heading02B mb-10">회원가입</h1>
      <FormRoot onSubmit={handleSubmit} className="w-full">
        <div className="mb-8 w-full space-y-4">
          <FormField name="id">
            <label htmlFor="id" className="body02M mb-1 block text-gray-700">
              아이디
            </label>
            <FormControl asChild>
              <Input
                type="text"
                id="id"
                className={cn(
                  "w-full bg-white",
                  !!errors.id && "border-red-500",
                )}
                placeholder="아이디를 입력하세요"
                autoComplete="username"
                maxLength={20}
                size="lg"
                value={formDataObj.id}
                onChange={(e) => handleInputChange("id", e.target.value)}
              />
            </FormControl>
            {errors?.id && <FormMessage>{errors.id[0]}</FormMessage>}
          </FormField>

          <FormField name="password">
            <label
              htmlFor="password"
              className="body02M mb-1 block text-gray-700"
            >
              비밀번호
            </label>
            <FormControl asChild>
              <Input
                type="password"
                id="password"
                className={cn(
                  "w-full bg-white",
                  !!errors.password && "border-red-500",
                )}
                placeholder="비밀번호를 입력하세요"
                autoComplete="new-password"
                maxLength={20}
                size="lg"
                value={formDataObj.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
              />
            </FormControl>
            {errors?.password && (
              <FormMessage>{errors.password[0]}</FormMessage>
            )}
          </FormField>

          <FormField name="passwordConfirm">
            <label
              htmlFor="passwordConfirm"
              className="body02M mb-1 block text-gray-700"
            >
              비밀번호 확인
            </label>
            <FormControl asChild>
              <Input
                type="password"
                id="passwordConfirm"
                className={cn(
                  "w-full bg-white",
                  !!errors.passwordConfirm && "border-red-500",
                )}
                placeholder="비밀번호를 다시 입력하세요"
                autoComplete="new-password"
                maxLength={20}
                size="lg"
                value={formDataObj.passwordConfirm}
                onChange={(e) =>
                  handleInputChange("passwordConfirm", e.target.value)
                }
              />
            </FormControl>
            {errors?.passwordConfirm && (
              <FormMessage>{errors.passwordConfirm[0]}</FormMessage>
            )}
          </FormField>

          <FormField name="email">
            <label htmlFor="email" className="body02M mb-1 block text-gray-700">
              이메일
            </label>
            <FormControl asChild>
              <Input
                type="email"
                id="email"
                className={cn(
                  "w-full bg-white",
                  !!errors.email && "border-red-500",
                )}
                placeholder="example@email.com"
                autoComplete="email"
                size="lg"
                value={formDataObj.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </FormControl>
            {errors?.email && <FormMessage>{errors.email[0]}</FormMessage>}
          </FormField>

          <FormField name="name">
            <label htmlFor="name" className="body02M mb-1 block text-gray-700">
              이름
            </label>
            <FormControl asChild>
              <Input
                type="text"
                id="name"
                className={cn(
                  "w-full bg-white",
                  !!errors.name && "border-red-500",
                )}
                placeholder="이름을 입력하세요"
                autoComplete="name"
                maxLength={20}
                size="lg"
                value={formDataObj.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </FormControl>
            {errors?.name && <FormMessage>{errors.name[0]}</FormMessage>}
          </FormField>

          <FormField name="department">
            <label
              htmlFor="department"
              className="body02M mb-1 block text-gray-700"
            >
              소속
            </label>
            <FormControl asChild>
              <Input
                type="text"
                id="department"
                className={cn(
                  "w-full bg-white",
                  !!errors.department && "border-red-500",
                )}
                placeholder="소속을 입력하세요"
                maxLength={50}
                size="lg"
                value={formDataObj.department}
                onChange={(e) =>
                  handleInputChange("department", e.target.value)
                }
              />
            </FormControl>
            {errors?.department && (
              <FormMessage>{errors.department[0]}</FormMessage>
            )}
          </FormField>

          <FormField name="employeeNumber">
            <label
              htmlFor="employeeNumber"
              className="body02M mb-1 block text-gray-700"
            >
              사번
            </label>
            <FormControl asChild>
              <Input
                type="text"
                id="employeeNumber"
                className={cn(
                  "w-full bg-white",
                  !!errors.employeeNumber && "border-red-500",
                )}
                placeholder="사번을 입력하세요"
                maxLength={20}
                size="lg"
                value={formDataObj.employeeNumber}
                onChange={(e) =>
                  handleInputChange("employeeNumber", e.target.value)
                }
              />
            </FormControl>
            {errors?.employeeNumber && (
              <FormMessage>{errors.employeeNumber[0]}</FormMessage>
            )}
          </FormField>
        </div>

        <Button className="mb-2 w-full" color="gray" size="xl">
          회원가입
        </Button>
        <Button
          type="button"
          className="w-full"
          color="outlined"
          size="xl"
          onClick={() => {
            push("/login");
          }}
        >
          취소
        </Button>
      </FormRoot>

      <AlertDialog open={isSuccess} onOpenChange={setIsSuccess}>
        <AlertDialogContent>
          <AlertDialogTitle>회원가입 완료</AlertDialogTitle>
          <AlertDialogDescription>
            회원가입이 성공적으로 완료되었습니다.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogAction asChild>
              <Button
                className="w-30"
                color="outlined"
                autoFocus
                onClick={() => setIsSuccess(false)}
              >
                확인
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
