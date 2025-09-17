// src/utils/gcsUploader.ts
import { Storage, GetSignedUrlConfig } from "@google-cloud/storage";
import path from "path";

const storage = new Storage({
  keyFilename: path.join(__dirname, "../Config/gcp-key.json"), 
});

// ✨ uploadFileToGCS
export async function uploadFileToGCS(
  fileBuffer: Buffer,
  fileName: string,
  mimetype: string,
  bucketName: string // 👈 ديناميك
): Promise<string> {
  return new Promise((resolve, reject) => {
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);
    const stream = file.createWriteStream({
      resumable: false,
      contentType: mimetype,
    });

    stream.on("error", (err) => reject(err));
    stream.on("finish", () => {
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
      resolve(publicUrl);
    });

    stream.end(fileBuffer);
  });
}

// ✨ getSignedUrl
export async function getSignedUrl(
  fileName: string,
  bucketName: string // 👈 ديناميك
) {
  const options: GetSignedUrlConfig = {
    version: "v4",
    action: "read",
    expires: Date.now() + 24 * 60 * 60 * 1000, // صلاحية يوم
  };

  const [url] = await storage
    .bucket(bucketName)
    .file(fileName)
    .getSignedUrl(options);

  return url;
}

// ✨ deleteFileFromGCS
export async function deleteFileFromGCS(
  fileName: string,
  bucketName: string // 👈 ديناميك
): Promise<void> {
  try {
    await storage.bucket(bucketName).file(fileName).delete({ ignoreNotFound: true });
  } catch (err) {
    console.warn("Failed to delete file from GCS:", fileName, err);
  }
}
