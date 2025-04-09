import * as crypto from 'crypto';

class encryption_RSA {
    // توليد المفاتيح
   generateKeys() {
        const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,  // طول المفتاح: 2048 بت
            publicKeyEncoding: {
                type: 'spki', // نوع المفتاح العام
                format: 'pem', // تنسيق المفتاح
            },
            privateKeyEncoding: {
                type: 'pkcs8', // نوع المفتاح الخاص
                format: 'pem', // تنسيق المفتاح
            },
        });

        return { publicKey, privateKey };
    }

    // التشفير باستخدام المفتاح العام
     encryptData(publicKey : string, data : string | number) {
        const bufferData = Buffer.from(""+data, 'utf-8');
        
        const encryptedData = crypto.publicEncrypt(
            {
                key: publicKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, // تحديد نوع التشفير
                oaepHash: 'sha256', // استخدام SHA-256
            },
            bufferData // البيانات المحوّلة إلى Buffer
        );
        
        return encryptedData.toString('base64'); // إرجاع النتيجة في صيغة Base64
    }

    // فك التشفير باستخدام المفتاح الخاص
     decryptData(privateKey: string , encryptedData: string | number) {
        try {
            // تأكد من أن البيانات المشفرة تأتي في تنسيق Base64
            console.log('Encrypted Data:', encryptedData);

            const bufferEncryptedData = Buffer.from(String(encryptedData), 'base64');
            
            // طباعة البيانات المشفرة للتأكد
            console.log('Buffer Encrypted Data:', bufferEncryptedData);

            const decryptedData = crypto.privateDecrypt(
                {
                    key: privateKey,
                    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                    oaepHash: 'sha256', // تأكد من أنك تستخدم نفس الـ Hash في التشفير
                },
                bufferEncryptedData // البيانات المشفرة
            );
    
            console.log('Decrypted Data:', decryptedData.toString('utf-8'));
            return decryptedData.toString('utf-8'); // إرجاع النص المفكوك
        } catch (err) {
            console.error('Decryption Error:', (err as Error)?.message );
            throw new Error('Decryption failed!');
        }
    }
}

export default new encryption_RSA();
