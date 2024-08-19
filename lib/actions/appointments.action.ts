"use server";
import { ID, Query } from "node-appwrite";
import { databases, messaging } from "../appwrite.config";
import { APPOINTMENT_COLLECTION_ID, DATABASE_ID } from "../config";
import { parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

export const createAppointment = async (
  appointmentData: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointmentData
    );
    return parseStringify(newAppointment);
  } catch (error) {
    console.log(error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );
    return parseStringify(appointment);
  } catch (error) {
    console.log(error);
  }
};

export const getAppointmentsList = async () => {
  try {
    const appointmentsList = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );
    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const count = (appointmentsList.documents as Appointment[]).reduce(
      (acc, appointment) => {
        if (appointment.status === "scheduled") {
          acc.scheduledCount++;
        } else if (appointment.status === "pending") {
          acc.pendingCount++;
        } else if (appointment.status === "cancelled") {
          acc.cancelledCount++;
        }
        return acc;
      },
      initialCounts
    );

    const data = {
      ...count,
      documents: appointmentsList.documents,
      totalCount: appointmentsList.total,
    };

    return parseStringify(data);
  } catch (error) {
    console.log(error);
  }
};

export const updateAppointment = async ({
  userId,
  appointmentId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );
    revalidatePath("/admin");
    if (!updateAppointment) throw new Error("Failed to update appointment");

    const smsMessage = `Hi, it's HealthSphere.
    ${
      type === "schedule"
        ? `Your appointment with Dr. ${appointment.primaryPhysician} has been scheduled for ${appointment.schedule}.`
        : `We deeply regret that your appointment with Dr. ${appointment.primaryPhysician} has been cancelled due to ${appointment.cancellationReason}.`
    }`;

    await sendMessage(userId, smsMessage);

    return parseStringify(updatedAppointment);
  } catch (error) {
    console.log(error);
  }
};

const sendMessage = async (userId: string, content: string) => {
  try {
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]
    );
    return parseStringify(message);
  } catch (error) {
    console.log(error);
  }
};
