import { NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

export async function GET() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const loggedIn = Boolean(user)

  return NextResponse.json({ loggedIn });
}
