import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patients.actions";
import Image from "next/image";

const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="container remove-scrollbar">
        <div className="sub-container max-w-[600px] flex-1 flex-col max-md:items-center">
          <Image
            src={"/assets/logos/logofull.svg"}
            alt="Logo"
            height={1000}
            width={1000}
            className="mb-8 h-10 w-fit"
          ></Image>
          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient?.$id}
          />

          <p className="copyright py-12">
            © 2024 HealthSphere. All rights reserved.
          </p>
        </div>
      </section>
      <Image
        src="/assets/images/appointment.jpg"
        alt="register"
        height={1000}
        width={1000}
        className="side-img max-w-[400px]"
      ></Image>
    </div>
  );
};

export default NewAppointment;
