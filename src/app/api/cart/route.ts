// app/api/cart/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";


export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { bookId } = await req.json();

    if (!bookId) return NextResponse.json({ error: "Missing bookId" }, { status: 400 });

    const { data: existingItem } = await supabase
      .from("cart")
      .select("*")
      .eq("user_id", user.id)
      .eq("book_id", bookId)
      .limit(1)
      .single();

    if (existingItem) {
      return NextResponse.json({ message: "Book already in cart", cartItem: existingItem });
    }

    const { data, error } = await supabase.from("cart").insert([
      { user_id: user.id, book_id: bookId },
    ]);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ cartItem: data ? data[0] : null });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase.from("cart").select("*").eq("user_id", user.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ cart: data });
  
}



export async function DELETE(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { bookId } = await req.json();

    if (!bookId) {
      return NextResponse.json({ error: "Missing bookId" }, { status: 400 });
    }

    const { error } = await supabase
      .from("cart")
      .delete()
      .eq("user_id", user.id)
      .eq("book_id", bookId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Book removed from cart" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}