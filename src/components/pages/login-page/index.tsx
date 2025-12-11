"use client";

import Link from "next/link";

import { useState, FormEvent } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  //AlertDialogTrigger  필요시 사용
} from "@hdc-ui/components/ui/alert-dialog";
import { Button } from "@hdc-ui/components/ui/button";
import { CheckboxButton } from "@hdc-ui/components/ui/checkbox";
import { Input } from "@hdc-ui/components/ui/input";

//로그인 요청시 버튼에 추가
//import { Spinner } from "@hdc-ui/components/ui/spinner";

import { FormRoot, FormControl, FormField, FormMessage } from "../../ui/form";

import { cn } from "@hdc-ui/utils";

import { LoginSchema } from "../../../lib/zod/schema";

export default function Login() {
  const [formDataObj, setFormDataObj] = useState({
    id: "",
    pw: "",
  });

  const [errors, setErrors] = useState<{
    id?: string[];
    pw?: string[];
  }>({});

  const handleInputChange = (field: string, value: string | boolean) => {
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

    const validatedFields = LoginSchema.safeParse({
      id: formDataObj.id,
      pw: formDataObj.pw,
    });

    if (!validatedFields.success) {
      setErrors(validatedFields.error.flatten().fieldErrors);
      return;
    } else {
      setErrors({});

      //POST 요청시 body에 아래 변수 담아서 요청
      //const loginForm = Object.fromEntries(new FormData(e.currentTarget));
    }
  };

  return (
    <div className="flex w-full max-w-96 flex-col text-gray-900 max-[390px]:px-2">
      <h1 className="heading02B mb-10">솔루션 명</h1>
      <FormRoot onSubmit={handleSubmit} className="w-full">
        <div className="mb-14 w-full">
          <FormField name="id">
            <FormControl asChild>
              <Input
                type="text"
                className={cn(
                  "w-full bg-white",
                  !!errors.id && "border-red-500",
                )}
                placeholder="아이디"
                autoComplete="id"
                maxLength={20}
                size="xl"
                value={formDataObj.id}
                onChange={(e) => handleInputChange("id", e.target.value)}
              />
            </FormControl>
            {errors?.id && <FormMessage>{errors.id[0]}</FormMessage>}
          </FormField>
          <FormField name="pw">
            <FormControl asChild>
              <Input
                type="password"
                className={cn(
                  "w-full bg-white",
                  !!errors.pw && "border-red-500",
                )}
                placeholder="비밀번호"
                autoComplete="pw"
                maxLength={20}
                size="xl"
                value={formDataObj.pw}
                onChange={(e) => handleInputChange("pw", e.target.value)}
              />
            </FormControl>
            {errors?.pw && <FormMessage>{errors.pw[0]}</FormMessage>}
          </FormField>
          <div className="mt-4 flex items-center justify-between">
            <CheckboxButton
              id="storeSession"
              htmlFor="storeSession"
              className="[&>button]:bg-white"
            >
              로그인 상태 유지
            </CheckboxButton>
            <Link
              href="/sign"
              className="body02M text-gray-900 underline underline-offset-4"
            >
              회원가입
            </Link>
          </div>
        </div>
        <Button className="mb-6 w-full" color="gray" size="xl">
          로그인
        </Button>
      </FormRoot>
      <AlertDialog>
        {/** open 로직을 AlertDialogContent에서 설정을 하거나 AlertDialogTrigger를 사용 */}
        <AlertDialogContent>
          <AlertDialogTitle>솔루션 명</AlertDialogTitle>
          <AlertDialogDescription>메세지 작성</AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogAction asChild>
              <Button className="w-30" color="outlined" autoFocus>
                확인
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <p className="body03M text-center text-gray-500">
        Copyright © HDC Labs Corp. All rights reserved.
      </p>
    </div>
  );
}
