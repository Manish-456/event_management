"use client";

import Link from "next/link";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { IEvent } from "@/lib/database/models/event.model";
import { Button } from "@/components/ui/button";
import { Checkout } from "@/components/shared/checkout";

interface CheckoutButtonProps {
  event: IEvent;
}

export function CheckoutButton({ event }: CheckoutButtonProps) {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;

  const hasEventFinished = new Date(event.endDateTime) < new Date();

  return (
    <div className="flex items-center gap-3">
      {/* Cannot buy past event */}
      {hasEventFinished ? (
        <p className="p-2 text-red-400">
          Sorry, tickets are no longer available.
        </p>
      ) : (
        <>
          <SignedOut>
            <Button className="button rounded-full" size={"lg"} asChild>
              <Link href="/sign-in"></Link>
              Get Tickets
            </Button>
          </SignedOut>

          <SignedIn>
            <Checkout 
            event={event}
            userId={userId}
            />
          </SignedIn>
        </>
      )}
    </div>
  );
}
