import CategoryForm from "@/components/forms/CategoryForm";
import Header from "@/components/shared/Header";

const Page = () => {
  return (
    <>
      <Header title="Create category" showBackArrow />
      <div className="my-12 max-w-md">
        <CategoryForm />
      </div>
    </>
  );
};

export default Page;
