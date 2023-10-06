import dayjs from "dayjs";

import CreateNavigation from "@/components/shared/CreateNavigation";
import Header from "@/components/shared/Header";
import DataTable from "@/components/ui/DataTable";
import prisma from "@/lib/prisma";
import { columns } from "./_components/Columns";

const Page = async () => {
  const authors = await prisma.author.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedAuthor = authors.map((author) => ({
    id: author.id,
    firstName: author.firstName || "",
    lastName: author.lastName || "",
    date: dayjs(author.createdAt).format("MMMM DD, YYYY"),
  }));

  return (
    <>
      <div className="flex justify-between items-center">
        <Header title="Authors" />
        <CreateNavigation href="/author/create" />
      </div>

      <div className="my-12">
        <DataTable
          data={formattedAuthor}
          columns={columns}
          searchKey={"firstName"}
          placeholder="Search name..."
        />
      </div>
    </>
  );
};

export default Page;
