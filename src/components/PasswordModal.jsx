import React from 'react';
import { Lock } from 'lucide-react';

const PasswordModal = ({ 
  show, 
  onClose, 
  onVerify, 
  passwordInput, 
  setPasswordInput, 
  passwordError,
  isReset 
}) => {
  if (!show) return null;

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onVerify();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <div className="flex items-center justify-center mb-4">
          <Lock className="text-blue-500" size={48} />
        </div>
        <h3 className="text-xl font-bold text-center mb-4">
          {isReset ? 'ใส่รหัสรีเซ็ตระบบ' : 'ใส่รหัสผ่าน'}
        </h3>
        <input
          type="password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="กรอกรหัส 4 หลัก"
          className="w-full p-3 border-2 rounded-lg mb-2 text-center text-2xl tracking-widest"
          maxLength="4"
          autoFocus
        />
        {passwordError && (
          <div className="text-red-500 text-center text-sm mb-3">{passwordError}</div>
        )}
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold"
          >
            ยกเลิก
          </button>
          <button
            onClick={onVerify}
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold"
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;