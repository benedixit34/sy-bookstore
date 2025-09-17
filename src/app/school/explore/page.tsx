import { createClient } from "@/app/utils/supabase/server";
import LibraryGrid from "@/app/components/LibraryGrid";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient();
  const {data: { user }} = await supabase.auth.getUser()
    if (!user){
      redirect("/auth/login")
    }
  

  const { data: library, error } = await supabase.from("book").select("*");
  console.log(await supabase.from("book").select("*"))

  if (error) {
    console.error("Supabase fetch error:", error.message);
  }

  return (
    <>
      <LibraryGrid library={library ?? []} />
    </>
  );
}
