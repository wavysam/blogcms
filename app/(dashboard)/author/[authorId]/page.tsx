import AuthorForm from "@/components/forms/AuthorForm";
import Header from "@/components/shared/Header";
import prisma from "@/lib/prisma";

type PageProps = {
  params: {
    authorId: string;
  };
};

const Page = async ({ params }: PageProps) => {
  const author = await prisma.author.findUnique({
    where: {
      id: params.authorId,
    },
  });

  const initialData = {
    id: author?.id!,
    firstName: author?.firstName!,
    lastName: author?.lastName!,
    image: author?.image!,
  };

  return (
    <>
      <Header title="Edit author" showBackArrow />
      <div className="my-12 max-w-md">
        <AuthorForm initialData={initialData} />
      </div>
    </>
  );
};

export default Page;
