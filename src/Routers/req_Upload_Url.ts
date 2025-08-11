import { Router } from 'express';
import { bucket } from '../lib/gcs';

const router = Router();


// === Request To Get Upload URL To Upload Imges To Googlr Cloud Services ===
router.post('/upload-url', async (req, res, next) => {
  try {
    const { fileName, contentType } = req.body as {
      fileName: string;
      contentType: string; // image/webp
    };
    const file = bucket.file(fileName);
    const [url] = await file.getSignedUrl({
      version: 'v4',
      action: 'write',
      expires: Date.now() + 15 * 60 * 1000, // 15 دقائق
      contentType,
    });
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    // ======= SEND RESPONSE
    res.json({ uploadUrl: url, publicUrl });
  } catch (err) {
    next(err);
  }
});

export default router;
