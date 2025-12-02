import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@hdc-ui/components/ui/checkbox";

import {
  TableStatusUpDownText,
  TableStatusText,
  TableLinkText,
  TableToggleButton,
} from "@/components/ui/common-table";

import { RES_TABLE_TYPE } from "@/lib/network/types";

const Columns: ColumnDef<RES_TABLE_TYPE["data"]>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <TableToggleButton
          state={column.getIsSorted() === "desc" ? "desc" : "asc"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
        </TableToggleButton>
      );
    },
  },
  {
    accessorKey: "header",
    header: "Header",
    cell: ({ row }) => {
      return (
        <TableLinkText href={`/data-table/${row.original.id}`}>
          {row.original.header}
        </TableLinkText>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;

      const renderColor = () => {
        switch (type) {
          case "Cover page": {
            return "green";
          }
          case "Research": {
            return "red";
          }
          case "Narrative": {
            return "orange";
          }
        }
      };

      return <TableStatusText color={renderColor()}>{type}</TableStatusText>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",

    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <TableStatusUpDownText status={status === "In Process" ? "up" : "down"}>
          {status}
        </TableStatusUpDownText>
      );
    },
  },
  {
    accessorKey: "target",
    header: "Target",
  },
  {
    accessorKey: "limit",
    header: "Limit",
  },
  {
    accessorKey: "reviewer",
    header: "Reviewer",
  },
];

export default Columns;
