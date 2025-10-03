import { NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const supabase = await createClient();
    const { id } = await context.params;

    const { data: book, error } = await supabase
      .from("book")
      .select("*")
      .eq("id", id)
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


export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const supabase = await createClient();
    const { id } = await context.params;

    const { error } = await supabase.from("book").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Book deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
