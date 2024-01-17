"use client";

import Image from "next/image";
import { useTransition } from "react";

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

import { deleteEvent } from "@/lib/actions/event.actions";
import { usePathname } from "next/navigation";

type DeleteConfirmationProps = {
  eventId: string;
};

export function DeleteConfirmation({ eventId }: DeleteConfirmationProps) {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  const onDeleteEvent = () => {
    startTransition(() => {
        deleteEvent({
            eventId,
            path: pathname
        })
    })
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Image
          src={"/assets/icons/delete.svg"}
          alt="delete"
          width={20}
          height={20}
        />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            event from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
          onClick={onDeleteEvent}
          >{
            isPending ? "Deleting..." : "Delete Event"
          }</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
