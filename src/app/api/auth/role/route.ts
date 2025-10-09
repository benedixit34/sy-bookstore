import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ isSchoolAdmin: false });
  }

  const role = user.user_metadata?.role;

  return NextResponse.json({ isSchoolAdmin: role === "school_admin" });
}
