import dayjs from "dayjs";

import prisma from "@/lib/prisma";
import { columns } from "./columns";
import Header from "@/components/shared/Header";
import DataTable from "@/components/ui/DataTable";
import CreateNavigation from "@/components/shared/CreateNavigation";

const Page = async () => {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
  });

  const formattedCategory = categories.map((category) => ({
    id: category.id,
    name: category.name,
    date: dayjs(category.createdAt).format("MMMM DD, YYYY"),
  }));

  return (
    <>
      <div className="flex justify-between items-center">
        <Header title="Categories" />
        <CreateNavigation href="/category/create" />
      </div>
      <div className="my-12">
        <DataTable
          columns={columns}
          data={formattedCategory}
          placeholder="Search categories..."
          searchKey="name"
        />
      </div>
    </>
  );
};

export default Page;
