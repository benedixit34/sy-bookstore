import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { CloudflareSave } from "@/utils/cloudflareSave";
import { type SupabaseClient } from "@supabase/supabase-js";

const IMAGE_BUCKET = "sy2025";
const FILE_BUCKET = "sy-file";





async function requireAdmin(supabase: SupabaseClient) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.user_metadata.role !== "school_admin") {
    throw new Error("Unauthorized");
  }

  return user;
}




export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  
    const supabase = await createClient();
    const { id } = await context.params;

    const { data: book, error } = await supabase
      .from("book")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json({ book });
 
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  
    const supabase = await createClient();
    const { id } = await context.params;
    await requireAdmin(supabase);

    const formData = await req.formData();

    const updates: any = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: formData.get("price"),
    };

    const imageFile = formData.get("image") as File | null;
    const bookFile = formData.get("file") as File | null;

    if (imageFile && imageFile.size > 0) {
      const imageUrl = await CloudflareSave(imageFile, IMAGE_BUCKET, true);
      if (imageUrl) updates.image = imageUrl;
    }

    if (bookFile && bookFile.size > 0) {
      const fileUrl = await CloudflareSave(bookFile, FILE_BUCKET, false);
      if (fileUrl) updates.file = fileUrl;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("book")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ book: data });
  
}


export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {

    const supabase = await createClient();
    const { id } = await context.params;
    await requireAdmin(supabase);

    const { error } = await supabase.from("book").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Book deleted successfully" });

}
