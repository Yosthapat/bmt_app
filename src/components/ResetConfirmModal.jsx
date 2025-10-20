import React from 'react';
import { Trash2 } from 'lucide-react';

const ResetConfirmModal = ({ show, onClose, onConfirm, membersCount, matchesCount }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-red-100 rounded-full p-3">
            <Trash2 className="text-red-600" size={48} />
          </div>
        </div>
        <h3 className="text-xl font-bold text-center mb-2 text-red-600">
          ⚠️ ยืนยันการรีเซ็ตระบบ
        </h3>
        <p className="text-center text-gray-700 mb-4">
          คุณแน่ใจหรือไม่ที่จะลบข้อมูลทั้งหมด?<br/>
          <span className="font-bold text-red-600">การกระทำนี้ไม่สามารถย้อนกลับได้!</span>
        </p>
        <div className="bg-yellow-50 border border-yellow-300 rounded p-3 mb-4">
          <p className="text-sm text-gray-700">ข้อมูลที่จะถูกลบ:</p>
          <ul className="text-sm text-gray-600 list-disc list-inside mt-1">
            <li>สมาชิกทั้งหมด ({membersCount} คน)</li>
            <li>แมตช์ทั้งหมด ({matchesCount} แมตช์)</li>
            <li>ผลการแข่งขันทั้งหมด</li>
            <li>คะแนนทั้งหมด</li>
          </ul>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold"
          >
            ยกเลิก
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            ยืนยัน รีเซ็ต
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetConfirmModal;