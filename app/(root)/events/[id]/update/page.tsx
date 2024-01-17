import { auth } from "@clerk/nextjs";
import { EventForm } from "@/components/shared/event-form";
import { getEventById } from "@/lib/actions/event.actions";

interface EventUpdatePageProps {
  params: {
    id: string;
  };
}

export default async function EventUpdatePage({
  params,
}: EventUpdatePageProps) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const event = await getEventById(params.id);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="h3-bold wrapper text-center sm:text-left">
          Update Event
        </h3>
      </section>
      <div className="wrapper my-8">
        <EventForm
          userId={userId}
          type="Update"
          eventId={params.id}
          event={event}
        />
      </div>
    </>
  );
}
