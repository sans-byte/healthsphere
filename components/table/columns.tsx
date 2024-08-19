"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import StatusBadge from "../StatusBadge";
import { formatDateTime } from "@/lib/utils";
import { Doctors } from "@/constants";
import Image from "next/image";
import AppointmentModal from "../AppointmentModal";
import { Appointment } from "@/types/appwrite.types";

const getDoctorImage = (name: string) => {
  const doc = Doctors.find((doctor) => doctor.name === name);
  return doc?.image;
};

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: () => <div className="text-left">Patient</div>,
    cell: ({ row }) => (
      <p className="text-14-medium text-left">{row.original.patient.name}</p>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-left">Status</div>,
    cell: ({ row }) => (
      <div className="max-w-[115px] text-left">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "schedule",
    header: () => <div className="text-left">Appointment</div>,
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px]">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },
  {
    accessorKey: "primaryPhysician",
    header: () => <div className="text-left">Physician</div>,
    cell: ({ row }) => (
      <div className="flex justify-start items-center gap-4">
        <Image
          src={getDoctorImage(row.original.primaryPhysician)!}
          alt={row.original.primaryPhysician}
          width={32}
          height={32}
          className="rounded-full"
        ></Image>
        <p className="text-14-regular min-w-[100px]">
          Dr. {row.original.primaryPhysician}
        </p>
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <p className="text-left">Actions</p>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex gap-1">
          <AppointmentModal
            type="schedule"
            userId={data.userId}
            patientId={data.$id}
            appointment={data}
          />
          <AppointmentModal
            type="cancel"
            userId={data.userId}
            patientId={data.patient.$id}
            appointment={data}
          />
        </div>
      );
    },
  },
];
