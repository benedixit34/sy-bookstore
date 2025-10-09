import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";


export const GET = async (req: Request, context: { params: Promise<{ book_id: string }> }) => {
    const supabase = await createClient()
    const { book_id } = await context.params;
    const {data: { user },} = await supabase.auth.getUser();

    const { data: library, error } = await supabase
      .from("library")
      .select("*")
      .eq("book_id", book_id)
      .eq("user_id", user?.id)
      .single();
    if (error){
        return NextResponse.json({ isPresent: false })
    }
    const isPresent = Boolean(library)
    return NextResponse.json({ isPresent })

}