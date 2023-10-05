"use client";

import { ColumnDef } from "@tanstack/react-table";

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
    header: "Date",
  },
];
