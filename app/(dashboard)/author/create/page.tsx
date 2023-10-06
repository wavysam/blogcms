import AuthorForm from "@/components/forms/AuthorForm";
import Header from "@/components/shared/Header";

const Page = () => {
  return (
    <>
      <Header title="Add author" showBackArrow />
      <div className="my-12 max-w-md">
        <AuthorForm />
      </div>
    </>
  );
};

export default Page;
