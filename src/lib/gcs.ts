import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  credentials: JSON.parse(process.env.GCLOUD_CREDENTIALS!),
});

export const bucket = storage.bucket(process.env.GCLOUD_BUCKET_NAME!);
