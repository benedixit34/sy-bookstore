import { NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = await createClient();
    const bookId = params.id;

    const { data: book, error } = await supabase
      .from("book")
      .select("*")
      .eq("id", bookId)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json({ book });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
