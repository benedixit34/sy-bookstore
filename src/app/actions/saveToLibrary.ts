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

  for (const item of library) {
   
    let { data: book, error: bookError } = await supabase
      .from("book")
      .select("id")
      .eq("name", item.bookName)
      .single();

    if (!book) {
      // Insert new book
      const { data: newBook, error: insertError } = await supabase
        .from("book")
        .insert({
          name: item.bookName,
          image_source: item.imgSrc,
          school: item.school,
        })
        .select("id")
        .single();

      if (insertError) throw new Error(insertError.message);
      book = newBook;
    }

    // 2. Insert relation into `user_library`
    const { error: libError } = await supabase.from("library").insert({
      user: user.id, 
      book: book.id,
    });

    if (libError) throw new Error(libError.message);
  }
}
