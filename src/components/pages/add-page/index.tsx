"use client";

import { useState, FormEvent } from "react";

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

import { AddPageSchema } from "../../../lib/zod/schema";
import { cn } from "@hdc-ui/utils";

export default function Add() {
  const [formDataObj, setFormDataObj] = useState({
    id: "",
    power: "",
    power2: "",
    contents: "",
    upload1: "",
    upload2: "",
  });

  const [errors, setErrors] = useState<{
    id?: string[];
    power?: string[];
    power2?: string[];
    contents?: string[];
    upload1?: string[];
    upload2?: string[];
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

    const validatedFields = AddPageSchema.safeParse({
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
    } else {
      setErrors({});

      //POST 요청시 body에 아래 변수 담아서 요청
      //const loginForm = Object.fromEntries(new FormData(e.currentTarget));
    }
  };

  return (
    <FormRoot onSubmit={handleSubmit}>
      <SectionContainer>
        <SectionTitle>등록 예시</SectionTitle>
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
                        onChange={(e) => handleInputChange("id", e.target.value)}
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
                        className={cn("w-full", errors.power && "border-red-500")}
                        id="power"
                        size="md"
                        value={formDataObj.power}
                        onChange={(e) => handleInputChange("power", e.target.value)}
                      />
                    </FormControl>
                    {errors?.power && <FormMessage>{errors.power[0]}</FormMessage>}
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
                        onValueChange={(value) => handleInputChange("power2", value)}
                      >
                        <SelectTrigger className={cn("w-full", errors.power2 && "border-red-500")}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="전체">전체</SelectItem>
                          <SelectItem value="제목">제목</SelectItem>
                          <SelectItem value="내용">내용</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    {errors?.power2 && <FormMessage>{errors.power2[0]}</FormMessage>}
                  </FormField>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="align-baseline">내용</TableHead>
                <TableCell colSpan={3}>
                  <FormField name="contents">
                    <FormControl asChild>
                      <Textarea
                        className={cn("w-full", errors.contents && "border-red-500")}
                        value={formDataObj.contents}
                        onChange={(e) => handleInputChange("contents", e.target.value)}
                      />
                    </FormControl>
                    {errors?.contents && <FormMessage>{errors.contents[0]}</FormMessage>}
                  </FormField>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead>파일 업로드</TableHead>
                <TableCell colSpan={3}>
                  <Upload id="upload1" className="flex-wrap gap-2" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead>파일 업로드2</TableHead>
                <TableCell colSpan={3}>
                  <DragUpload id="upload2" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </SectionContent>
        <BtnArea>
          <LinkButton color="outlined" href="/data-table">
            취소
          </LinkButton>
          <Button color="gray">등록</Button>
        </BtnArea>
      </SectionContainer>
    </FormRoot>
  );
}
