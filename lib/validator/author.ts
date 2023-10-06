import * as z from "zod";

export const AuthorSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must contain at least 2 character(s)" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must contain at least 2 character(s)" }),
  image: z.string().optional(),
});

export type AuthorSchemaType = z.infer<typeof AuthorSchema>;
