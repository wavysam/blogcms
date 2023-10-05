import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import prisma from "@/lib/prisma";
import { CategorySchema } from "@/lib/validator/category";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description } = CategorySchema.parse(body);

    const category = await prisma.category.create({
      data: {
        name,
        description,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse("Invalid field data", { status: 409 });
    }

    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
