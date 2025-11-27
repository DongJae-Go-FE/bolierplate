"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@hdc-ui/components/ui/table";

import data from "./data.json";

export default function TablePage() {
  return (
    <>
      <div className="w-ful mb-4 h-50">
        <Table type="description">
          <TableCaption>프로젝트 문서 목록</TableCaption>
          <TableBody>
            <TableRow>
              <TableHead>id</TableHead>
              <TableCell>{data[0].id}</TableCell>
              <TableHead>limit</TableHead>
              <TableCell>{data[0].limit}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>reviewer</TableHead>
              <TableCell>{data[0].reviewer}</TableCell>
              <TableHead>type</TableHead>
              <TableCell>{data[0].type}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>type</TableHead>
              <TableCell>{data[0].type}</TableCell>
              <TableHead>header</TableHead>
              <TableCell>{data[0].header}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>target</TableHead>
              <TableCell>{data[0].target}</TableCell>
              <TableHead>status</TableHead>
              <TableCell>{data[0].status}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="h-[calc(100%-268px)] w-full overflow-auto bg-gray-200">
        <Table>
          <TableCaption>프로젝트 문서 목록</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Header</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Limit</TableHead>
              <TableHead>Reviewer</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.header}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.target}</TableCell>
                <TableCell>{item.limit}</TableCell>
                <TableCell>{item.reviewer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
