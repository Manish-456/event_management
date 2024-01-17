"use server";

import { Stripe } from "stripe";
import { redirect } from "next/navigation";

import { CheckoutOrderParams, CreateOrderParams } from "@/types";
import { handleError } from "../utils";
import Order from "@/lib/database/models/order.model";
import { connectToDatabase } from "../database";

export async function checkoutOrder(order : CheckoutOrderParams){
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const price = order.isFree ? 0 : Number(order.price) * 10;

    try {
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              price_data: {
                currency: 'usd',
                unit_amount: price,
                product_data: {
                    name: order.eventTitle,
                }
              },
              quantity: 1              
            },
          ],
          metadata: {
            eventId: order.eventId,
            buyerId: order.buyerId
          },
          mode: 'payment',
          success_url: `${process.env.NEXT_PUBLIC_APP_URL}/profile`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/`,
        });
  
        redirect(session.url!);
      } catch (err) {
      throw err;
      }
}

export async function createOrder(order: CreateOrderParams){
    try {
      await connectToDatabase();
        const newOrder = await Order.create({
            ...order,
            event: order.eventId,
            buyer: order.buyerId,
          });
      
          return JSON.parse(JSON.stringify(newOrder));
        } catch (error) {
          handleError(error);
        }
}