"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { decryptKey, encryptKey } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PasskeyModel = () => {
  const [open, setOpen] = useState(true);
  const path = usePathname();
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const encryptedKey =
    typeof window !== "undefined" ? localStorage.getItem("accessKey") : null;

  useEffect(() => {
    const accessKey = encryptedKey && decryptKey(encryptedKey);
    if (path) {
      if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        setOpen(false);
        router.push("/admin");
      } else {
        setOpen(true);
      }
    }
  }, [encryptedKey]);

  const closeModel = () => {
    setOpen(false);
    router.push("/");
  };

  const validateAdmin = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passkey);
      localStorage.setItem("accessKey", encryptedKey);
      router.push("/admin");
      setOpen(false);
    } else {
      setError("Invalid passkey please try again");
    }
  };
  console.log(passkey);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-between items-start w-full">
            Admin access verification
            <Image
              src={"/assets/icons/close.svg"}
              alt="close"
              height={20}
              width={20}
              className="cursor-pointer"
              onClick={() => closeModel()}
            ></Image>
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-center items-center w-full flex-col">
          <InputOTP
            maxLength={6}
            className="shad-otp"
            onChange={(value) => setPasskey(value)}
          >
            <InputOTPSlot className="shad-otp-slot" index={0} />
            <InputOTPSlot className="shad-otp-slot" index={1} />
            <InputOTPSlot className="shad-otp-slot" index={2} />
            <InputOTPSlot className="shad-otp-slot" index={3} />
            <InputOTPSlot className="shad-otp-slot" index={4} />
            <InputOTPSlot className="shad-otp-slot" index={5} />
          </InputOTP>
          {error && (
            <p className="shad-error text-14-regular mt-4 flex">{error}</p>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogAction
            className="shad-primary-btn w-full"
            onClick={(e) => validateAdmin(e)}
          >
            Enter admin panel
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PasskeyModel;
