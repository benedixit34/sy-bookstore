import { NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const {data: { user }, error: userError,} = await supabase.auth.getUser();
  let inschool = false

  if (userError || !user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const { data: schoolData, error: schoolError } = await supabase
    .from("school")
    .select("id")
    .eq("user", user.id)

  if (schoolError) {
    inschool = false
  }
  const inSchool = Boolean(schoolData);
  return NextResponse.json({ inSchool });
}
