import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const supabase = await createClient();


    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const userId = user.id;

    const { data: cartItems, error: cartError } = await supabase
      .from("cart")
      .select("book_id")
      .eq("user_id", userId);
    if (cartError) return NextResponse.json({ error: "Error fetching cart items" }, { status: 500 });
    if (!cartItems || cartItems.length === 0)
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });

    const { data: schoolData, error: schoolError } = await supabase
      .from("school")
      .select("*")
      .eq("user", userId)
      .single();
    if (schoolError  && schoolError.code !== "PGRST116") return NextResponse.json({ error: "Error checking school" }, { status: 500 });


    if (schoolData) {
      const libraryEntries = cartItems.map(item => ({
        user: userId,
        book: item.book_id,
      }));

      const { data: inserted, error: insertError } = await supabase
        .from("library")
        .insert(libraryEntries);
      if (insertError) return NextResponse.json({ error: insertError.message }, { status: 500 });

      await supabase.from("cart").delete().eq("user_id", userId);

      return NextResponse.json({ message: "Cart saved to library successfully", inserted });
    } else {
        const { data: booksData, error: booksError } = await supabase
      .from("book")
      .select("id, name, price")
      .in("id", cartItems.map(item => item.book_id));
    if (booksError || !booksData)
      return NextResponse.json({ error: "Error fetching book details" }, { status: 500 });

    const line_items = booksData.map(book => ({
      price_data: {
        currency: "usd",
        product_data: { name: book.name },
        unit_amount: book.price * 100,
      },
      quantity: 1,
    }));

    const baseUrl = req.url.replace("/api/library", "");

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      customer_email: user.email,
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cart`,
      metadata: { userId },
    });

    return NextResponse.json({ sessionId: session.id });
    }

   
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
