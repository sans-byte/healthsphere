import { RegisterForm } from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patients.actions";
import Image from "next/image";

const page = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="container remove-scrollbar">
        <div className="sub-container max-w-[600px] flex-1 flex-col py-10 max-md:items-center">
          <Image
            src={"/assets/logos/logofull.svg"}
            alt="Logo"
            height={1000}
            width={1000}
            className="mb-8 h-10 w-fit"
          ></Image>
          <RegisterForm user={user} />

          <p className="copyright py-12">
            © 2024 HealthSphere. All rights reserved.
          </p>
        </div>
      </section>
      <Image
        src="/assets/images/register.jpg"
        alt="register"
        height={1000}
        width={1000}
        className="side-img w-fit"
      ></Image>
    </div>
  );
};

export default page;
