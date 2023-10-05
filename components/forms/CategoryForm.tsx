"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/Form";
import { CategorySchema, CategorySchemaType } from "@/lib/validator/category";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Button } from "../ui/Button";
import { Textarea } from "../ui/Textarea";

const CategoryForm = () => {
  const router = useRouter();

  const form = useForm<CategorySchemaType>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { mutate: createCategory, isLoading } = useMutation({
    mutationFn: async (payload: CategorySchemaType) => {
      const { data } = await axios.post("/api/category", payload);
      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          return toast.error(error.response.data);
        }
        if (error.response?.status === 500) {
          return toast.error(error.response.data);
        }
      }
      return toast.error("Failed to create category");
    },
    onSuccess: () => {
      toast.success("Category created");
      router.refresh();
      router.push("/category");
    },
  });

  const onSubmit = (values: CategorySchemaType) => {
    createCategory(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-5">
              <Label htmlFor="name">Name</Label>
              <FormControl>
                <Input {...field} id="name" disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-5">
              <Label htmlFor="description">Description</Label>
              <FormControl>
                <Textarea {...field} id="description" disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          Create
        </Button>
      </form>
    </Form>
  );
};

export default CategoryForm;
