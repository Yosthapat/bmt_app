# 🍺 Beerminton Tournament 2025

ระบบจัดการคะแนนการแข่งขันแบดมินตัน สำหรับงาน Beerminton Sportsday 2025

## ✨ ฟีเจอร์

- ✅ จัดการสมาชิก 40 คน (2 ทีม)
- ✅ อัปโหลดรูปภาพ (บีบอัดอัตโนมัติ)
- ✅ บันทึกผลการแข่งขัน (doubles)
- ✅ แสดงผลการแข่งขัน
- ✅ ตารางคะแนนแยกตาม Level
- ✅ ระบบรหัสผ่าน
- ✅ รองรับมือถือ 100%
- ✅ บันทึกข้อมูลอัตโนมัติ (localStorage)

## 🚀 การติดตั้ง

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. รันโปรเจค
```bash
npm start
```

เปิดเบราว์เซอร์ไปที่ `http://localhost:3000`

### 3. Build สำหรับ Production
```bash
npm run build
```

## 🔐 รหัสผ่าน

- **Add/Edit/Delete**: `1990`
- **Reset System**: `6989`

## 📱 การใช้งาน

### สำหรับ Admin:
1. เข้าหน้า **MEMBER** → เพิ่มสมาชิก
2. เข้าหน้า **MATCH** → บันทึกคะแนน
3. ดูผลที่หน้า **RESULT** และ **SCORE**

### สำหรับผู้เล่น:
- เปิดดูคะแนนได้ทุกคน (ไม่ต้องรหัสผ่าน)
- ดูที่แท็บ **SCORE** เพื่อดูอันดับ

## 🖼️ การอัปโหลดรูป

- รองรับ: JPG, PNG, GIF, WebP
- ขนาดสูงสุด: 5MB
- ระบบจะบีบอัดอัตโนมัติเหลือ ~50-100KB
- ปรับขนาดเป็น 400x400px (รักษาสัดส่วน)

## 🌐 Deploy

### Vercel (แนะนำ)

1. Push โค้ดขึ้น GitHub
2. ไปที่ https://vercel.com/new
3. เลือก repository
4. คลิก Deploy

### Netlify

1. Build: `npm run build`
2. ไปที่ https://app.netlify.com/drop
3. ลากโฟลเดอร์ `build/` วาง

## 📁 โครงสร้างโปรเจค
```
src/
├── components/      # React Components
├── utils/          # Utilities (image, calculations)
├── data/           # Default data
├── App.jsx         # Main App
└── index.js        # Entry point
```

## 🎨 Customization

### เปลี่ยนรหัสผ่าน

แก้ไข `src/utils/constants.js`:
```javascript
export const PASSWORD = '1990';
export const RESET_PASSWORD = '6989';
```

### เปลี่ยนข้อความหัวเว็บ

แก้ไข `src/components/Header.jsx`

### เปลี่ยนสมาชิกเริ่มต้น

แก้ไข `src/data/defaultMembers.js`

## 🐛 แก้ปัญหา

**Q: รูปใหญ่เกินไป?**
A: ระบบบีบอัดอัตโนมัติ ถ้ายังใหญ่ให้ลองใช้รูปขนาดเล็กกว่า

**Q: ข้อมูลหาย?**
A: ข้อมูลเก็บใน localStorage ถ้าล้างเบราว์เซอร์จะหาย

**Q: มือถือแสดงผลไม่ดี?**
A: ลองรีเฟรชหน้าเว็บ หรือล้าง cache

## 📞 Support

เจอปัญหาหรือมีคำถาม? 
- ดูที่ Issues บน GitHub
- หรือติดต่อผู้พัฒนา

## 📄 License

MIT License - ใช้งานได้ฟรี!

---

**สนุกกับการแข่ง Beerminton! 🍺🏸**