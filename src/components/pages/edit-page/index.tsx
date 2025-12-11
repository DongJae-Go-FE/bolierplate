"use client";

import { useState, FormEvent, useEffect } from "react";

import z from "zod";

import { useMutation, useQuery } from "@tanstack/react-query";

import {
  SectionContainer,
  SectionTitle,
  SectionContent,
  BtnArea,
  LinkButton,
} from "@/components/ui/common-layout";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
} from "@hdc-ui/components/ui/table";

import { FormRoot, FormControl, FormField, FormMessage } from "../../ui/form";

import { Textarea } from "@/components/ui/textarea";

import { Input } from "@hdc-ui/components/ui/input";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@hdc-ui/components/ui/select";

import Upload from "@hdc-ui/components/upload/upload";
import DragUpload from "@hdc-ui/components/upload/drag-upload";

import { Button } from "@hdc-ui/components/ui/button";

import Modal from "@/components/ui/modal";
import Alert from "@/components/ui/alert";

import { PageSchema } from "../../../lib/zod/schema";

import { customFetch } from "@/lib/network/custom-fetch";

import { cn } from "@hdc-ui/utils";

import { CONST_SOLUTION_NAME } from "@/lib/const";

export default function Edit(props: { id: string }) {
  const [isModal, setIsModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formDataObj, setFormDataObj] = useState({
    id: "",
    power: "",
    power2: "",
    contents: "",
    upload1: [] as File[],
    upload2: [] as File[],
  });

  const [errors, setErrors] = useState<{
    id?: string[];
    power?: string[];
    power2?: string[];
    contents?: string[];
    upload1?: string[];
    upload2?: string[];
  }>({});

  const { data: existingData } = useQuery({
    queryKey: ["getExample", props.id],
    queryFn: async () => {
      const res = await customFetch(`/api/example/${props.id}`, {
        method: "GET",
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.msg);
      }
      return data.data;
    },
  });

  useEffect(() => {
    if (existingData) {
      setFormDataObj({
        id: existingData.id || "",
        power: existingData.power || "",
        power2: existingData.power2 || "",
        contents: existingData.contents || "",
        upload1: existingData.upload1 || [],
        upload2: existingData.upload2 || [],
      });
    }
  }, [existingData]);

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

  const handleFileUpload = async (field: "upload1" | "upload2", file: File) => {
    setFormDataObj((prev) => ({
      ...prev,
      [field]: [...prev[field], file],
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleFileRemove = (
    field: "upload1" | "upload2",
    fileToRemove: { name: string; size?: number },
  ) => {
    setFormDataObj((prev) => ({
      ...prev,
      [field]: prev[field].filter(
        (file) =>
          !(file.name === fileToRemove.name && file.size === fileToRemove.size),
      ),
    }));
  };

  const handleValid = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validatedFields = PageSchema.safeParse({
      id: formDataObj.id,
      power: formDataObj.power,
      power2: formDataObj.power2,
      contents: formDataObj.contents,
      upload1: formDataObj.upload1,
      upload2: formDataObj.upload2,
    });

    if (!validatedFields.success) {
      setErrors(validatedFields.error.flatten().fieldErrors);
      return;
    }

    setIsModal(true);
    setErrors({});
  };

  const updateMutation = useMutation({
    mutationKey: ["updateExample", props.id],
    mutationFn: async (payload: z.infer<typeof PageSchema>) => {
      const res = await customFetch(`/api/example/${props.id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.msg);
      }

      return res;
    },

    onSuccess: () => {
      setIsSuccess(true);
    },
  });

  const handleSubmit = async () => {
    await updateMutation.mutateAsync(formDataObj);
  };

  return (
    <FormRoot onSubmit={handleValid}>
      <SectionContainer>
        <SectionTitle>수정 예시</SectionTitle>
        <SectionContent>
          <Table type="description" className="mb-4">
            <TableCaption>프로젝트 문서 목록</TableCaption>
            <TableBody>
              <TableRow>
                <TableHead>
                  <label htmlFor="id">아이디</label>
                </TableHead>
                <TableCell>
                  <FormField name="id">
                    <FormControl asChild>
                      <Input
                        className={cn("w-full", errors.id && "border-red-500")}
                        id="id"
                        size="md"
                        value={formDataObj.id}
                        onChange={(e) =>
                          handleInputChange("id", e.target.value)
                        }
                      />
                    </FormControl>
                    {errors?.id && <FormMessage>{errors.id[0]}</FormMessage>}
                  </FormField>
                </TableCell>
                <TableHead>
                  <label htmlFor="power">권한</label>
                </TableHead>
                <TableCell>
                  <FormField name="power">
                    <FormControl asChild>
                      <Input
                        className={cn(
                          "w-full",
                          errors.power && "border-red-500",
                        )}
                        id="power"
                        size="md"
                        value={formDataObj.power}
                        onChange={(e) =>
                          handleInputChange("power", e.target.value)
                        }
                      />
                    </FormControl>
                    {errors?.power && (
                      <FormMessage>{errors.power[0]}</FormMessage>
                    )}
                  </FormField>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead>등록자</TableHead>
                <TableCell>등록자</TableCell>
                <TableHead>권한2</TableHead>
                <TableCell>
                  <FormField name="power2">
                    <FormControl asChild>
                      <Select
                        value={formDataObj.power2 || "전체"}
                        onValueChange={(value) =>
                          handleInputChange("power2", value)
                        }
                      >
                        <SelectTrigger
                          className={cn(
                            "w-full",
                            errors.power2 && "border-red-500",
                          )}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="전체">전체</SelectItem>
                          <SelectItem value="제목">제목</SelectItem>
                          <SelectItem value="내용">내용</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    {errors?.power2 && (
                      <FormMessage>{errors.power2[0]}</FormMessage>
                    )}
                  </FormField>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="align-baseline">내용</TableHead>
                <TableCell colSpan={3}>
                  <FormField name="contents">
                    <FormControl asChild>
                      <Textarea
                        className={cn(
                          "w-full",
                          errors.contents && "border-red-500",
                        )}
                        value={formDataObj.contents}
                        onChange={(e) =>
                          handleInputChange("contents", e.target.value)
                        }
                      />
                    </FormControl>
                    {errors?.contents && (
                      <FormMessage>{errors.contents[0]}</FormMessage>
                    )}
                  </FormField>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead>파일 업로드</TableHead>
                <TableCell colSpan={3}>
                  <FormField name="upload1">
                    <FormControl asChild>
                      <Upload
                        id="upload1"
                        className="flex-wrap gap-2"
                        onUpload={async (file) => {
                          await handleFileUpload("upload1", file);
                        }}
                        onRemove={(file) => {
                          handleFileRemove("upload1", file);
                        }}
                      />
                    </FormControl>
                    {errors?.upload1 && (
                      <FormMessage>{errors.upload1[0]}</FormMessage>
                    )}
                  </FormField>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead>파일 업로드2</TableHead>
                <TableCell colSpan={3}>
                  <FormField name="upload2">
                    <FormControl asChild>
                      <DragUpload
                        id="upload2"
                        autoUpload
                        onUpload={async (file) => {
                          await handleFileUpload("upload2", file);
                        }}
                        onRemove={(file) => {
                          handleFileRemove("upload2", file);
                        }}
                      />
                    </FormControl>
                    {errors?.upload2 && (
                      <FormMessage>{errors.upload2[0]}</FormMessage>
                    )}
                  </FormField>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </SectionContent>
        <BtnArea>
          <LinkButton color="outlined" href="/data-table">
            취소
          </LinkButton>
          <Button color="gray">수정</Button>
        </BtnArea>
        <Modal
          title={CONST_SOLUTION_NAME}
          description="수정하시겠습니까?"
          open={isModal}
          onOpenChange={setIsModal}
          actions={{
            primary: {
              title: "수정하기",
              onClick: handleSubmit,
            },
          }}
        />
        <Alert
          title={CONST_SOLUTION_NAME}
          description="수정에 성공했습니다."
          open={isSuccess}
          onOpenChange={setIsSuccess}
          onClick={() => {
            setIsSuccess(false);
          }}
        />
        <Alert
          title={CONST_SOLUTION_NAME}
          description={updateMutation.error?.message || ""}
          open={updateMutation.isError}
          onClick={() => {
            updateMutation.reset();
          }}
        />
      </SectionContainer>
    </FormRoot>
  );
}
