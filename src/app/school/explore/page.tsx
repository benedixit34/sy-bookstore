import { createClient } from "@/app/utils/supabase/server";
import LibraryGrid from "@/app/components/LibraryGrid";

export default async function Page() {
  const supabase = await createClient();

  const { data: library, error } = await supabase.from("library").select("*");
  console.log(await supabase.from("library").select("*"))

  if (error) {
    console.error("Supabase fetch error:", error.message);
  }

  return (
    <>
      <LibraryGrid library={library ?? []} />
    </>
  );
}
