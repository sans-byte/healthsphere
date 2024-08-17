import { PatientForm } from "@/components/forms/PatientForm";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="container my-auto remove-scrollbar h-full">
        <div className="sub-container max-w-[496px] flex justify-center items-center">
          <Image
            src={"/assets/logos/logofull.svg"}
            alt="Logo"
            height={1000}
            width={1000}
            className="mb-8 h-10 w-fit"
          ></Image>
          <PatientForm />
          <div className="text-12-regular flex justify-between w-full">
            <p className=" text-gray-600 xl:text-left">
              © 2024 HealthSphere. All rights reserved.
            </p>
            <Link href="/?admin=true" className="text-yellow-600">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/doc.jpeg"
        alt="doctor"
        height={1000}
        width={1000}
        className="side-img max-w-[50%]"
      ></Image>
    </div>
  );
}
