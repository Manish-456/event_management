import stripe from "stripe";
import { NextResponse } from "next/server";
import { createOrder } from "@/lib/actions/order.actions";


export async function POST(request: Request)  {
  const body =  await request.text();
  const sig = request.headers.get('stripe-signature') as string;

  let event;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
     return NextResponse.json({
        message: "Webhook error",
        error: err
     })
    return;
  }
  const eventType = event.type;

  if (eventType === "checkout.session.completed") {
      const checkoutSessionCompleted = event.data.object;
      const {
        id,
        amount_total,
        metadata
      } = checkoutSessionCompleted;

      const order = {
        stripeId: id,
        eventId: metadata?.eventId || '',
        buyerId: metadata?.buyerId || '',
        totalAmount: amount_total ? (amount_total / 100).toString() : '0',
        createdAt: new Date()
      }

      const newOrder = await createOrder(order);
      return NextResponse.json({
        message: 'OK',
        order: newOrder
      })
  
  }

  // Return a 200 response to acknowledge receipt of the event

};
