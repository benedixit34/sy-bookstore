import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { CloudflareSave } from "@/utils/cloudflareSave";

const IMAGE_BUCKET = "sy2025";
const FILE_BUCKET = "sy-file";

export async function GET() {
  const supabase = await createClient();
  const { data: books, error } = await supabase.from("book").
  select("id, name, image, description, price");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }


  return NextResponse.json({ books });
}

export async function POST(req: Request) {

    const supabase = await createClient();
    const formData = await req.formData();

    const id = formData.get("id") as string | null;
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;

    const imageFile = formData.get("image") as File | null;
    const bookFile = formData.get("file") as File | null;


    

    const imageUrl = CloudflareSave(imageFile, IMAGE_BUCKET, true);
    const fileUrl = CloudflareSave(bookFile, FILE_BUCKET, false);

    const { data, error } = await supabase
      .from("book")
      .insert([
        {
          name,
          description,
          price: parseFloat(price),
          image: imageUrl,
          file: fileUrl,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ book: data }, { status: id ? 200 : 201 });
  
}
