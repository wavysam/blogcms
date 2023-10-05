import * as z from "zod";

export const CategorySchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must contain at least 2 character(s)" }),
  description: z.string().optional(),
});

export type CategorySchemaType = z.infer<typeof CategorySchema>;
