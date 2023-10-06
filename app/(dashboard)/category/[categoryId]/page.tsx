import CategoryForm from "@/components/forms/CategoryForm";
import Header from "@/components/shared/Header";
import prisma from "@/lib/prisma";

type PageProps = {
  params: {
    categoryId: string;
  };
};

const Page = async ({ params }: PageProps) => {
  const category = await prisma.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const initialData = {
    id: category?.id!,
    name: category?.name!,
    description: category?.description!,
  };

  return (
    <>
      <Header title="Edit category" subtitle="" showBackArrow />
      <div className="my-12 max-w-md">
        <CategoryForm initialData={initialData} />
      </div>
    </>
  );
};

export default Page;
