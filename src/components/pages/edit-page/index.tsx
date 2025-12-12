"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { customFetch } from "@/lib/network/custom-fetch";

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
import { Spinner } from "@hdc-ui/components/ui/spinner";

import Modal from "@/components/ui/modal";
import Alert from "@/components/ui/alert";

import { ItemSchema } from "@/lib/zod/schema";

import { cn } from "@hdc-ui/utils";

import { CONST_SOLUTION_NAME } from "@/lib/const";
import { z } from "zod";

type ItemFormData = z.infer<typeof ItemSchema>;

export default function Edit(props: { id: string }) {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  const [isModal, setIsModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formDataObj, setFormDataObj] = useState<ItemFormData>({
    header: "",
    type: "Narrative",
    status: "In Process",
    target: "",
    limit: "",
    reviewer: "",
    upload1: [],
    upload2: [],
  });

  const [errors, setErrors] = useState<z.ZodFormattedError<ItemFormData>>({
    _errors: [],
  });

  //TODO. MSW MOCK DATA라 교체해야함
  const { data: existingData, isLoading } = useQuery({
    queryKey: ["item", props.id],
    queryFn: async () => {
      const res = await customFetch(`/api/items/${props.id}`);
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "데이터를 불러오는데 실패했습니다");
      }

      return data.data;
    },
  });

  //TODO. MSW MOCK DATA라 교체해야함
  useEffect(() => {
    if (existingData) {
      setFormDataObj({
        header: existingData.header || "",
        type: existingData.type || "Narrative",
        status: existingData.status || "In Process",
        target: existingData.target || "",
        limit: existingData.limit || "",
        reviewer: existingData.reviewer || "",
        upload1: [],
        upload2: [],
      });
    }
  }, [existingData]);

  const handleInputChange = (field: keyof ItemFormData, value: string) => {
    setFormDataObj((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleFileUpload = async (field: "upload1" | "upload2", file: File) => {
    setFormDataObj((prev) => ({
      ...prev,
      [field]: [...(prev[field] || []), file],
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
      [field]: (prev[field] || []).filter(
        (file) =>
          !(file.name === fileToRemove.name && file.size === fileToRemove.size),
      ),
    }));
  };

  const handleValid = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validatedFields = ItemSchema.safeParse(formDataObj);

    if (!validatedFields.success) {
      setErrors(validatedFields.error.format());
      return;
    }

    setIsModal(true);
    setErrors({ _errors: [] });
  };

  //TODO. MSW MOCK DATA라 교체해야함
  const updateMutation = useMutation({
    mutationKey: ["updateItem", props.id],
    mutationFn: async (payload: ItemFormData) => {
      const submitData = {
        header: payload.header,
        type: payload.type,
        status: payload.status,
        target: payload.target || "",
        limit: payload.limit || "",
        reviewer: payload.reviewer,
      };

      const res = await customFetch(`/api/items/${props.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "수정에 실패했습니다");
      }

      return data;
    },

    onSuccess: () => {
      setIsSuccess(true);
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["item", props.id] });
      setTimeout(() => {
        push(`/data-table/${props.id}`);
      }, 1500);
    },
  });

  const handleSubmit = async () => {
    setIsModal(false);
    await updateMutation.mutateAsync(formDataObj);
  };

  if (isLoading) {
    return (
      <SectionContainer>
        <div className="flex h-64 w-full items-center justify-center">
          <Spinner />
        </div>
      </SectionContainer>
    );
  }

  return (
    <FormRoot onSubmit={handleValid}>
      <SectionContainer>
        <SectionTitle>항목 수정 (ID: {props.id})</SectionTitle>
        <SectionContent>
          <Table type="description" className="mb-4">
            <TableCaption>항목 수정</TableCaption>
            <TableBody>
              <TableRow>
                <TableHead>
                  <label htmlFor="header">제목 *</label>
                </TableHead>
                <TableCell colSpan={3}>
                  <FormField name="header">
                    <FormControl asChild>
                      <Input
                        className={cn(
                          "w-full",
                          errors.header && "border-red-500",
                        )}
                        id="header"
                        size="md"
                        value={formDataObj.header}
                        onChange={(e) =>
                          handleInputChange("header", e.target.value)
                        }
                        placeholder="제목을 입력하세요"
                      />
                    </FormControl>
                    {errors.header && (
                      <FormMessage>{errors.header._errors[0]}</FormMessage>
                    )}
                  </FormField>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead>
                  <label htmlFor="type">타입 *</label>
                </TableHead>
                <TableCell>
                  <FormField name="type">
                    <FormControl asChild>
                      <Select
                        value={formDataObj.type}
                        onValueChange={(value) =>
                          handleInputChange("type", value)
                        }
                      >
                        <SelectTrigger
                          className={cn(
                            "w-full",
                            errors.type && "border-red-500",
                          )}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Narrative">Narrative</SelectItem>
                          <SelectItem value="Technical content">
                            Technical content
                          </SelectItem>
                          <SelectItem value="Research">Research</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    {errors.type && (
                      <FormMessage>{errors.type._errors[0]}</FormMessage>
                    )}
                  </FormField>
                </TableCell>
                <TableHead>
                  <label htmlFor="status">상태 *</label>
                </TableHead>
                <TableCell>
                  <FormField name="status">
                    <FormControl asChild>
                      <Select
                        value={formDataObj.status}
                        onValueChange={(value) =>
                          handleInputChange("status", value)
                        }
                      >
                        <SelectTrigger
                          className={cn(
                            "w-full",
                            errors.status && "border-red-500",
                          )}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="In Process">In Process</SelectItem>
                          <SelectItem value="Done">Done</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    {errors.status && (
                      <FormMessage>{errors.status._errors[0]}</FormMessage>
                    )}
                  </FormField>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead>
                  <label htmlFor="target">Target</label>
                </TableHead>
                <TableCell>
                  <FormField name="target">
                    <FormControl asChild>
                      <Input
                        className="w-full"
                        id="target"
                        size="md"
                        value={formDataObj.target}
                        onChange={(e) =>
                          handleInputChange("target", e.target.value)
                        }
                        placeholder="숫자 입력"
                      />
                    </FormControl>
                  </FormField>
                </TableCell>
                <TableHead>
                  <label htmlFor="limit">Limit</label>
                </TableHead>
                <TableCell>
                  <FormField name="limit">
                    <FormControl asChild>
                      <Input
                        className="w-full"
                        id="limit"
                        size="md"
                        value={formDataObj.limit}
                        onChange={(e) =>
                          handleInputChange("limit", e.target.value)
                        }
                        placeholder="숫자 입력"
                      />
                    </FormControl>
                  </FormField>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead>
                  <label htmlFor="reviewer">검토자 *</label>
                </TableHead>
                <TableCell colSpan={3}>
                  <FormField name="reviewer">
                    <FormControl asChild>
                      <Input
                        className={cn(
                          "w-full",
                          errors.reviewer && "border-red-500",
                        )}
                        id="reviewer"
                        size="md"
                        value={formDataObj.reviewer}
                        onChange={(e) =>
                          handleInputChange("reviewer", e.target.value)
                        }
                        placeholder="검토자 이름을 입력하세요"
                      />
                    </FormControl>
                    {errors.reviewer && (
                      <FormMessage>{errors.reviewer._errors[0]}</FormMessage>
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
                    {errors.upload1 && (
                      <FormMessage>{errors.upload1._errors[0]}</FormMessage>
                    )}
                  </FormField>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead>파일 업로드2 (Drag & Drop)</TableHead>
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
                    {errors.upload2 && (
                      <FormMessage>{errors.upload2._errors[0]}</FormMessage>
                    )}
                  </FormField>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </SectionContent>
        <BtnArea>
          <LinkButton color="outlined" href={`/data-table/${props.id}`}>
            취소
          </LinkButton>
          <Button color="gray" disabled={updateMutation.isPending}>
            수정
          </Button>
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
            push(`/data-table/${props.id}`);
          }}
        />
        <Alert
          title={CONST_SOLUTION_NAME}
          description={
            updateMutation.error?.message || "알 수 없는 오류가 발생했습니다"
          }
          open={updateMutation.isError}
          onClick={() => {
            updateMutation.reset();
          }}
        />
      </SectionContainer>
    </FormRoot>
  );
}
