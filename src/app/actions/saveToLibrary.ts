// app/actions/saveToLibrary.ts
"use server";

import { createClient } from "@/app/utils/supabase/server";

export async function saveToLibrary(library: any[]) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be logged in.");
  }

  const { error } = await supabase.from("user_libraries").insert(
    library.map((item) => ({
      user_id: user.id,
      book_name: item.bookName,
      img_src: item.imgSrc,
      school: item.school,
    }))
  );

  if (error) throw new Error(error.message);
}
