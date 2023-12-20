import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const { AWS_S3_ACCESS_KEY, AWS_S3_BUCKET_NAME, AWS_S3_SECRET_ACCESS_KEY, AWS_S3_REGION } =
  process.env;

const s3Client = new S3Client({
  region: AWS_S3_REGION!,
  credentials: {
    accessKeyId: AWS_S3_ACCESS_KEY!,
    secretAccessKey: AWS_S3_SECRET_ACCESS_KEY!,
  },
});

async function uploadFileToS3(file: Buffer, fileName: string) {
  const fileBuffer = file;

  const params = {
    Bucket: AWS_S3_BUCKET_NAME,
    Key: `${fileName}-${Date.now()}`,
    Body: fileBuffer,
    ContentType: "image/jpg/png",
  };

  const command = new PutObjectCommand(params);

  await s3Client.send(command);

  return fileName;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    const buffer = Buffer.from(await (file as Blob).arrayBuffer());

    const fileName = await uploadFileToS3(buffer, file.name);

    return NextResponse.json(fileName, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
