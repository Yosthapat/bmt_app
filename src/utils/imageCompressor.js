/**
 * บีบอัดและปรับขนาดรูปภาพอัตโนมัติ
 * @param {File} file - ไฟล์รูปภาพ
 * @param {number} maxSize - ขนาดสูงสุด (px) default: 400
 * @param {number} quality - คุณภาพ (0-1) default: 0.7
 * @returns {Promise<string>} - Base64 string
 */
export const compressImage = (file, maxSize = 400, quality = 0.7) => {
  return new Promise((resolve, reject) => {
    // ตรวจสอบขนาดไฟล์ (ถ้าเกิน 5MB ให้เตือน)
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxFileSize) {
      reject(new Error('Oops! Your file is too big. Please select a file smaller than 5MB.'));
      return;
    }

    const reader = new FileReader();
    
    reader.onerror = () => {
      reject(new Error('Oops! We can’t read this file.'));
    };
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onerror = () => {
        reject(new Error('The file is not a valid image.'));
      };
      
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // คำนวณขนาดใหม่ (รักษาสัดส่วน)
          if (width > height) {
            if (width > maxSize) {
              height = Math.round((height * maxSize) / width);
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width = Math.round((width * maxSize) / height);
              height = maxSize;
            }
          }
          
          // ตั้งค่า canvas
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          
          // เพิ่มคุณภาพการ render
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          
          // วาดรูปลง canvas
          ctx.drawImage(img, 0, 0, width, height);
          
          // แปลงเป็น base64 (JPEG สำหรับขนาดเล็กกว่า)
          const compressedImage = canvas.toDataURL('image/jpeg', quality);
          
          // ตรวจสอบขนาดผลลัพธ์
          const sizeInBytes = Math.round((compressedImage.length * 3) / 4);
          const sizeInKB = Math.round(sizeInBytes / 1024);
          
          console.log(`Image compressed: ${sizeInKB}KB (${width}x${height})`);
          
          resolve(compressedImage);
        } catch (error) {
          reject(new Error('Oops! Something went wrong while compressing the image.'));
        }
      };
      
      img.src = e.target.result;
    };
    
    reader.readAsDataURL(file);
  });
};

/**
 * ตรวจสอบว่าเป็นไฟล์รูปภาพหรือไม่
 */
export const isImageFile = (file) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  return validTypes.includes(file.type);
};

/**
 * แปลงขนาดไฟล์เป็น string ที่อ่านง่าย
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};