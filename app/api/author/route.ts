import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import prisma from "@/lib/prisma";
import { AuthorSchema } from "@/lib/validator/author";

export async function GET(request: NextRequest) {
  try {
    const authors = await prisma.author.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(authors, { status: 200 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, image } = AuthorSchema.parse(body);

    const author = await prisma.author.create({
      data: {
        firstName,
        lastName,
        image,
      },
    });

    return NextResponse.json(author, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse("Invalid field values", { status: 409 });
    }
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const authorId = url.searchParams.get("authorId")?.toString() || "";
    const body = await request.json();
    const { firstName, lastName, image } = AuthorSchema.parse(body);

    const author = await prisma.author.findUnique({
      where: {
        id: authorId,
      },
    });

    if (!author) {
      return new NextResponse("Author not found", { status: 404 });
    }

    const updatedAuthor = await prisma.author.update({
      where: {
        id: authorId,
      },
      data: {
        firstName,
        lastName,
        image,
      },
    });

    return NextResponse.json(updatedAuthor, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse("Invalid field values", { status: 409 });
    }
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const authorId = url.searchParams.get("authorId")?.toString() || "";

    const author = await prisma.author.findUnique({
      where: {
        id: authorId,
      },
    });

    if (!author) {
      return new NextResponse("Author not found", { status: 404 });
    }

    await prisma.author.delete({
      where: {
        id: authorId,
      },
    });

    return new NextResponse("Author removed successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
