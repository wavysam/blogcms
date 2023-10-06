"use client";

import { ColumnDef } from "@tanstack/react-table";
import TableActions from "./TableActions";

export type Author = {
  id: string;
  firstName: string;
  lastName?: string;
  date: string;
};

export const columns: ColumnDef<Author>[] = [
  {
    accessorKey: "firstName",
    header: "First name",
  },
  {
    accessorKey: "lastName",
    header: "Last name",
  },
  {
    accessorKey: "date",
    header: "Date added",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const author = row.original;
      return <TableActions data={author} />;
    },
  },
];
