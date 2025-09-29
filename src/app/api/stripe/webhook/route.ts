import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/app/utils/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const buf = await req.arrayBuffer();
  const body = Buffer.from(buf);

  const sig = req.headers.get("stripe-signature") || "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed.", err.message);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;

      if (userId) {
        try {
          const supabase = await createClient();

          // 1️⃣ Get all cart items for the user
          const { data: cartItems, error: cartError } = await supabase
            .from("cart")
            .select("book_id")
            .eq("user_id", userId);

          if (!cartError && cartItems && cartItems.length > 0) {
            // 2️⃣ Add to library
            const libraryEntries = cartItems.map(item => ({
              user: userId,
              book: item.book_id,
            }));
            await supabase.from("library").insert(libraryEntries);

            // 3️⃣ Clear cart
            await supabase.from("cart").delete().eq("user_id", userId);

            console.log(`Cart cleared and books added to library for user ${userId}`);
          }
        } catch (err) {
          console.error("Error processing completed checkout:", err);
        }
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
