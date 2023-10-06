"use client";

import { ColumnDef } from "@tanstack/react-table";
import TableActions from "./TableActions";

export type Category = {
  id: string;
  name: string;
  date: string;
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "date",
    header: "Date added",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;
      return <TableActions data={category} />;
    },
  },
];
