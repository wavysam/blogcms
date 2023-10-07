"use client";

import { toast } from "sonner";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Copy, MoreHorizontal, PenSquare, Trash2 } from "lucide-react";
import { Category } from "./Columns";
import AlertModal from "@/components/shared/AlertModal";

type TableActionsProps = {
  data: Category;
};

const TableActions = ({ data }: TableActionsProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const onCopyToClipboard = () => {
    navigator.clipboard.writeText(data.id);
    toast.success("Copied to clipboard");
  };

  const { mutate: deleteCategory, isLoading } = useMutation({
    mutationFn: async () => {
      const { data: responseData } = await axios.delete(
        `/api/category?categoryId=${data.id}`
      );
      return responseData;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          return toast.error(error.response.data);
        }
        if (error.response?.status === 500) {
          return toast.error(error.response.data);
        }
      }

      return toast.error("Failed to delete category");
    },
    onSuccess: () => {
      toast.success("Category removed");
      router.refresh();
      setIsOpen(false);
    },
  });

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onConfirm={deleteCategory}
        onClose={() => setIsOpen(false)}
        disabled={isLoading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={onCopyToClipboard}
            className="cursor-pointer"
          >
            <Copy className="h-4 w-4 mr-2" />
            <span>Copy ID</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push(`/category/${data.id}`)}
            className="cursor-pointer"
          >
            <PenSquare className="h-4 w-4 mr-2" />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsOpen(true)}
            className="cursor-pointer"
          >
            <Trash2 className="h-4 w-4 mr-2 text-red-500" />
            <span className="text-red-500">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default TableActions;
