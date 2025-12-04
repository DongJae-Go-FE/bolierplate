"use client";

import {
  SectionContainer,
  SectionTitle,
  SectionContent,
  BtnArea,
} from "@/components/ui/common-layout";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
} from "@hdc-ui/components/ui/table";

import { Textarea } from "@/components/ui/textarea";

import { Input } from "@hdc-ui/components/ui/input";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@hdc-ui/components/ui/select";

import { Button } from "@hdc-ui/components/ui/button";

export default function Add() {
  return (
    <form action="post">
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
                  <Input className="w-full" id="id" size="md" />
                </TableCell>
                <TableHead>
                  <label htmlFor="power">권한</label>
                </TableHead>
                <TableCell>
                  <Input className="w-full" id="power" size="md" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead>등록자</TableHead>
                <TableCell>등록자</TableCell>
                <TableHead>권한2</TableHead>
                <TableCell>
                  <Select value="전체">
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="전체">전체</SelectItem>
                      <SelectItem value="제목">제목</SelectItem>
                      <SelectItem value="내용">내용</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="align-baseline">내용</TableHead>
                <TableCell colSpan={3}>
                  <Textarea className="w-full" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead>파일 업로드</TableHead>
                <TableCell colSpan={3}></TableCell>
              </TableRow>
              <TableRow>
                <TableHead>파일 업로드2</TableHead>
                <TableCell colSpan={3}></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </SectionContent>
        <BtnArea>
          <Button type="button" color="outlined">
            취소
          </Button>
          <Button type="button" color="gray">
            등록
          </Button>
        </BtnArea>
      </SectionContainer>
    </form>
  );
}
