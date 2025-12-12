"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState, FormEvent } from "react";

import { useMutation } from "@tanstack/react-query";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@hdc-ui/components/ui/alert-dialog";
import { Button } from "@hdc-ui/components/ui/button";
import { CheckboxButton } from "@hdc-ui/components/ui/checkbox";
import { Input } from "@hdc-ui/components/ui/input";
import { Spinner } from "@hdc-ui/components/ui/spinner";

import { FormRoot, FormControl, FormField, FormMessage } from "../../ui/form";

import { cn } from "@hdc-ui/utils";

import { LoginSchema } from "../../../lib/zod/schema";
import { useAuth } from "@/components/common-provider";

export default function Login() {
  const { push } = useRouter();

  //TODO. MSW MOCK DATA라 교체해야함
  const { login, refreshUser } = useAuth();

  const [formDataObj, setFormDataObj] = useState({
    id: "",
    pw: "",
  });

  const [errors, setErrors] = useState<{
    id?: string[];
    pw?: string[];
  }>({});

  const [alertOpen, setAlertOpen] = useState(false);

  //TODO. MSW MOCK DATA라 교체해야함
  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (payload: { id: string; pw: string }) => {
      await login(payload.id, payload.pw);
    },
    onSuccess: async () => {
      await refreshUser();
      push("/main");
    },
    onError: () => {
      setAlertOpen(true);
    },
  });

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
    }

    setErrors({});
    await loginMutation.mutateAsync({
      id: formDataObj.id,
      pw: formDataObj.pw,
    });
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
                disabled={loginMutation.isPending}
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
                disabled={loginMutation.isPending}
              />
            </FormControl>
            {errors?.pw && <FormMessage>{errors.pw[0]}</FormMessage>}
          </FormField>
          <div className="mt-4 flex items-center justify-between">
            <CheckboxButton
              id="storeSession"
              htmlFor="storeSession"
              className="[&>button]:bg-white"
              disabled={loginMutation.isPending}
            >
              로그인 상태 유지
            </CheckboxButton>
            <Link
              href="/sign"
              className={cn(
                "body02M text-gray-900 underline underline-offset-4",
                loginMutation.isPending &&
                  "pointer-events-none cursor-auto opacity-80",
              )}
            >
              회원가입
            </Link>
          </div>
        </div>
        <Button
          className="mb-6 flex w-full items-center justify-center"
          color="gray"
          size="xl"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? <Spinner /> : "로그인"}
        </Button>
      </FormRoot>
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>솔루션 명</AlertDialogTitle>
          <AlertDialogDescription>
            {loginMutation.error?.message ||
              "로그인에 실패했습니다. 다시 시도해주세요."}
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogAction asChild>
              <Button
                className="w-30"
                color="outlined"
                autoFocus
                onClick={() => {
                  setAlertOpen(false);
                  loginMutation.reset();
                }}
              >
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
