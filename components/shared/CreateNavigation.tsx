import Link from "next/link";
import { buttonVariants } from "../ui/Button";
import { PlusCircle } from "lucide-react";

type CreateNavigationProps = {
  href: string;
};

const CreateNavigation = ({ href }: CreateNavigationProps) => {
  return (
    <>
      <Link href={href} className={buttonVariants()}>
        <PlusCircle className="h-5 w-5 mr-2" />
        Add new
      </Link>
    </>
  );
};

export default CreateNavigation;
