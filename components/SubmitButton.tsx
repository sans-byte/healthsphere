import { Button } from "./ui/button";
import Image from "next/image";

interface ButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
}

const SubmitButton = ({ isLoading, children, className }: ButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? "shad-primary-btn w-full h-8"}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src={"/assets/icons/tail-spin.svg"}
            alt="loader"
            width={24}
            height={24}
          />
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
