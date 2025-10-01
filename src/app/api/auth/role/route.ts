import { NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const {data: { user }, error: userError,} = await supabase.auth.getUser();
 

  if (userError || !user) {
    return NextResponse.json({ inSchool: false });
  }
  const { data: schoolData, error: schoolError } = await supabase
    .from("school")
    .select("id")
    .eq("user", user.id)

  if (schoolError) {
     return NextResponse.json({ inSchool: false });
  }
  return NextResponse.json({ inSchool: Boolean(schoolData) });
 
}
