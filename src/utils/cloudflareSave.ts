import { r2 } from "@/lib/r2";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const CloudflareSave = async (
  BINARY_FILE: File | null,
  BINARY_FILE_BUCKET: string,
  isPublic: boolean
) => {
  if (BINARY_FILE && BINARY_FILE.size > 0) {
    const image_buffer = Buffer.from(await BINARY_FILE.arrayBuffer());
    const key = `store-images/${Date.now()}-${BINARY_FILE.name}`;

    await r2.send(
      new PutObjectCommand({
        Bucket: BINARY_FILE_BUCKET,
        Key: key,
        Body: image_buffer,
        ContentType: BINARY_FILE.type,
      })
    );
   
    
    if (isPublic) {
        const PUBLIC_ENDPOINT = process.env.CLOUDFLARE_PUBLIC_BUCKET_ENDPOINT
        return `${PUBLIC_ENDPOINT}/${key}`;
    }
    return await getSignedUrl(
      r2,
      new GetObjectCommand({ Bucket: BINARY_FILE_BUCKET, Key: key }),
      { expiresIn: 3600 }
    );
  }
  return null
};