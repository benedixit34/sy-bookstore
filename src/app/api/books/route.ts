import { NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

export async function GET() {
    const supabase = await createClient()
    const { data: books, error } = await supabase.from("book").select("*");

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ books });
}
