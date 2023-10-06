"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { Author } from "@prisma/client";
import Image from "next/image";
import { X } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/Form";
import { AuthorSchema, AuthorSchemaType } from "@/lib/validator/author";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import FileUpload from "@/components/shared/FileUpload";

type AuthorFormProps = {
  initialData?: Omit<Author, "createdAt" | "updatedAt">;
};

const AuthorForm = ({ initialData }: AuthorFormProps) => {
  const router = useRouter();

  const form = useForm<AuthorSchemaType>({
    resolver: zodResolver(AuthorSchema),
    defaultValues: {
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      image: initialData?.image || "",
    },
  });

  const { mutate: createUpdateAuthor, isLoading } = useMutation({
    mutationFn: async (payload: AuthorSchemaType) => {
      if (initialData) {
        const { data } = await axios.patch(
          `/api/author?authorId=${initialData.id}`,
          payload
        );
        return data;
      } else {
        const { data } = await axios.post("/api/author", payload);
        return data;
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          return toast.error(error.response.data);
        }
        if (error.response?.status === 409) {
          return toast.error(error.response.data);
        }
        if (error.response?.status === 500) {
          return toast.error(error.response.data);
        }
      }
      return toast.error("Something went wrong");
    },
    onSuccess: () => {
      initialData
        ? toast.success("Author updated")
        : toast.success("Author created");
      router.refresh();
      router.push("/author");
    },
  });

  const onSubmit = (values: AuthorSchemaType) => {
    createUpdateAuthor(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="firstName"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-5">
              <Label htmlFor="firstName">
                First name <span className="text-red-500">*</span>
              </Label>
              <FormControl>
                <Input {...field} id="firstName" disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="lastName"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-5">
              <Label htmlFor="lastName">
                Last name <span className="text-red-500">*</span>
              </Label>
              <FormControl>
                <Input {...field} id="lastName" disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="image"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-5">
              <Label htmlFor="image">Image</Label>
              {field.value && (
                <div className="relative h-80 w-80 border border-dashed rounded-sm">
                  <Image
                    src={field.value}
                    alt="Image"
                    fill
                    className="object-cover rounded-sm"
                  />

                  <div className="absolute -top-3 -right-3">
                    <div
                      className="p-1.5 rounded-full bg-neutral-500 hover:bg-opacity-75 transition cursor-pointer"
                      onClick={() => field.onChange((field.value = ""))}
                    >
                      <X className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>
              )}
              <FormControl>
                {!field.value && (
                  <FileUpload onChange={(url) => field.onChange(url)} />
                )}
              </FormControl>
            </FormItem>
          )}
        />

        <Button disabled={isLoading}>
          {initialData ? "Update" : "Create"}
        </Button>
      </form>
    </Form>
  );
};

export default AuthorForm;
