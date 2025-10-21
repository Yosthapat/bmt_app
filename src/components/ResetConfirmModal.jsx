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
          ⚠️ Are you sure you want to reset the system?
        </h3>
        <p className="text-center text-gray-700 mb-4">
          Are you sure you want to delete all data?<br/>
          <span className="font-bold text-red-600">This action cannot be undone!</span>
        </p>
        <div className="bg-yellow-50 border border-yellow-300 rounded p-3 mb-4">
          <p className="text-sm text-gray-700">Data to be deleted:</p>
          <ul className="text-sm text-gray-600 list-disc list-inside mt-1">
            <li>All members ({membersCount})</li>
            <li>All matches ({matchesCount} matches)</li>
            <li>All results</li>
            <li>Total scores</li>
          </ul>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Reset Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetConfirmModal;