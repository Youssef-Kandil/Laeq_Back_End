// src/utils/pdf-utils.ts
import { promises as fs } from 'fs';
import { PDFDocument } from 'pdf-lib';

import { writeFileSync } from 'fs';
import path from 'path';

export async function imagesToPDF(
  imagePaths: string[],
  outputPath: string
): Promise<void> {
  // أنشئ مستند PDF جديد
  const pdfDoc = await PDFDocument.create();

  for (const imgPath of imagePaths) {
    const ext = path.extname(imgPath).toLowerCase();
    const imgBytes = await fs.readFile(imgPath);

    let embeddedImage;
    if (ext === '.jpg' || ext === '.jpeg') {
      embeddedImage = await pdfDoc.embedJpg(imgBytes);
    } else if (ext === '.png') {
      embeddedImage = await pdfDoc.embedPng(imgBytes);
    } else {
      console.warn(`Unsupported format: ${imgPath}`);
      continue;
    }

    // أضف صفحة بأبعاد الصورة
    const page = pdfDoc.addPage([embeddedImage.width, embeddedImage.height]);
    page.drawImage(embeddedImage, {
      x: 0,
      y: 0,
      width: embeddedImage.width,
      height: embeddedImage.height,
    });
  }

  // احفظ الملف
  const pdfBytes = await pdfDoc.save();
  await fs.writeFile(outputPath, pdfBytes);
}

export async function extractImages(pdfPath:string) {
  try {
    const { extractImagesFromPdf } = await import('pdf-extract-image');
    const images = await extractImagesFromPdf(pdfPath);
    images.forEach((image, index) => {
      writeFileSync(`image${index}.png`, image);
    });
    console.log('تم استخراج الصور بنجاح');
  } catch (error) {
    console.error('حدث خطأ أثناء استخراج الصور:', error);
  }
}

