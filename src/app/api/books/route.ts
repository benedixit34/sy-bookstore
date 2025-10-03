import { NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


const b2 = new S3Client({
  region: "us-west-002",
  endpoint: "https://s3.us-west-002.backblazeb2.com",
  credentials: {
    accessKeyId: process.env.B2_KEY_ID!,
    secretAccessKey: process.env.B2_APP_KEY!,
  },
});

const BUCKET = process.env.B2_BUCKET!;

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const price = formData.get("price") as string;

    const imageFile = formData.get("image") as File | null;
    const bookFile = formData.get("file") as File | null;

    let imageUrl: string | null = null;
    let fileUrl: string | null = null;


    if (imageFile) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const key = `images/${Date.now()}-${imageFile.name}`;

      await b2.send(
        new PutObjectCommand({
          Bucket: BUCKET,
          Key: key,
          Body: buffer,
          ContentType: imageFile.type,
        })
      );

      imageUrl = await getSignedUrl(
        b2,
        new PutObjectCommand({ Bucket: BUCKET, Key: key }),
        { expiresIn: 3600 } // 1 hour
      );
    }


    if (bookFile) {
      const buffer = Buffer.from(await bookFile.arrayBuffer());
      const key = `files/${Date.now()}-${bookFile.name}`;

      await b2.send(
        new PutObjectCommand({
          Bucket: BUCKET,
          Key: key,
          Body: buffer,
          ContentType: bookFile.type,
        })
      );

      fileUrl = await getSignedUrl(
        b2,
        new PutObjectCommand({ Bucket: BUCKET, Key: key }),
        { expiresIn: 3600 } // 1 hour
      );
    }


    const { data: newBook, error: insertError } = await supabase
      .from("book")
      .insert([
        {
          name,
          price: parseFloat(price),
          image: imageUrl,
          file: fileUrl,
        },
      ])
      .select()
      .single();

    if (insertError) throw insertError;

    return NextResponse.json({ book: newBook }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}