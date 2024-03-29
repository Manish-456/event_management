import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DeleteConfirmation } from "./delete-confirmation";

type CardProps = {
  event: IEvent;
  hidePrice: boolean;
  hasOrderLink: boolean;
};

export function Card({ hasOrderLink, event, hidePrice }: CardProps) {
  const {sessionClaims} =  auth();
  const userId = sessionClaims?.userId as string;

  const isEventCreator = event.organizer._id.toString() === userId;
  
  
  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link
        href={`/events/${event._id}`}
        style={{
          backgroundImage: `url(${event.imageUrl})`,
        }}
        className="bg-cover bg-center flex flex-center flex-grow bg-gray-50 text-grey-500"
      />
      {/* Is Event Creator... */}
      {
        isEventCreator && !hidePrice && (
            <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
                <Link href={`/events/${event._id}/update`}>
                    <Image
                    src={"/assets/icons/edit.svg"}
                    alt="edit"
                    width={20}
                    height={20}
                    />
                </Link>
                <DeleteConfirmation eventId={event._id} />
            </div>
        )
      }
      <div
        
        className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"
      >
        {!hidePrice && (
          <div className="flex gap-2">
            <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
              {event.isFree ? "FREE" : `$${event.price}`}
            </span>
            <Link href={`/events/${event._id}`}>
            <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
              {event.category.name}
            </p>
            </Link>
          </div>
        )}
        <p className="p-medium-16 md:p-medium-18 text-grey-500">
          {formatDateTime(event.startDateTime).dateTime}
        </p>
        <p className="p-medium-16 md:p-medium-18 line-clamp-2 text-black flex-1">
          {event.title}
        </p>
        <div className="flex-between w-full">
            <p className="p-medium-14 md:p-medium-16 text-grey-600">
                {event.organizer.firstName} {event.organizer.lastName}
            </p>

            {
                hasOrderLink && (
                    <Link href={`/orders?eventId=${event._id}`} className="flex gap-2">
                        <p className="text-primary-500">Order Details</p>
                        <Image 
                        src="/assets/icons/arrow.svg" 
                        alt="search"
                        width={10}
                        height={10}
                        />
                    </Link>
                )
            }
        </div>
      </div>
    </div>
  );
}
