import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { TEAMS, LEVELS } from '../utils/constants';
import { compressImage, isImageFile } from '../utils/imageCompressor';

const MemberTab = ({ members, onAddMember, onDeleteMember, requestPassword }) => {
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    team: TEAMS.BURGUNDY,
    level: 'Milk',
    photo: ''
  });
  const [uploading, setUploading] = useState(false);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ตรวจสอบว่าเป็นไฟล์รูปภาพ
    if (!isImageFile(file)) {
      alert('Please select an image file (JPG, PNG, GIF, WebP).');
      return;
    }

    setUploading(true);
    try {
      const compressedImage = await compressImage(file, 400, 0.7);
      setNewMember({ ...newMember, photo: compressedImage });
      alert('Image uploaded successfully!');
    } catch (error) {
      alert(error.message || 'Image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleAddMember = () => {
    if (newMember.name.trim()) {
      onAddMember({ ...newMember, id: Date.now() });
      setNewMember({ name: '', team: TEAMS.BURGUNDY, level: 'Milk', photo: '' });
      setShowAddMember(false);
    } else {
      alert("Please enter the member's name.");
    }
  };

  // ฟังก์ชันเรียงลำดับสมาชิกตาม level และชื่อ
  const sortMembers = (membersList) => {
    const levelOrder = { 'Milk': 1, 'Soju': 2, 'Beer': 3, 'Highball': 4, 'Vodka': 5 };
    return [...membersList].sort((a, b) => {
      const levelDiff = (levelOrder[a.level] || 999) - (levelOrder[b.level] || 999);
      if (levelDiff !== 0) return levelDiff;
      return a.name.localeCompare(b.name);
    });
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => requestPassword('addMember', () => setShowAddMember(true))}
          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center gap-2"
        >
          <Plus size={20} /> Add Member
        </button>
        <button
          onClick={() => requestPassword('reset')}
          className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Trash2 size={20} /> Reset
        </button>
      </div>

      {showAddMember && (
        <div className="bg-white p-4 rounded shadow mb-4">
          <h3 className="font-bold mb-3">Add New Member</h3>
          
          <input
            type="text"
            placeholder="Name"
            value={newMember.name}
            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          
          <select
            value={newMember.team}
            onChange={(e) => setNewMember({ ...newMember, team: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          >
            <option value={TEAMS.BURGUNDY}>Burgundy Team</option>
            <option value={TEAMS.NAVY_BLUE}>Navy Blue Team</option>
          </select>
          
          <select
            value={newMember.level}
            onChange={(e) => setNewMember({ ...newMember, level: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          >
            {LEVELS.map(level => (
              <option key={level} value={level}>Lv.{level}</option>
            ))}
          </select>
          
          <div className="mb-2">
            <label className="block text-sm font-semibold mb-1">
              Photo {uploading && <span className="text-blue-500">(Processing...)</span>}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              disabled={uploading}
              className="w-full p-2 border rounded"
            />
            <p className="text-xs text-gray-500 mt-1">
              * Supports JPG, PNG, GIF, and WebP files (automatically compressed by the system).
            </p>
            {newMember.photo && (
              <div className="mt-2 flex justify-center">
                <img 
                  src={newMember.photo} 
                  alt="Preview" 
                  className="w-20 h-20 rounded-full object-cover border-2"
                />
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => {
                setShowAddMember(false);
                setNewMember({ name: '', team: TEAMS.BURGUNDY, level: 'Milk', photo: '' });
              }}
              className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleAddMember}
              disabled={uploading}
              className="flex-1 bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
              Save
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {/* Burgundy Team */}
        <div className="bg-red-800 rounded-lg p-3 sm:p-4">
          <h2 className="text-white text-xl sm:text-2xl font-bold text-center mb-3 sm:mb-4">
            BURGUNDY
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-1 sm:gap-2">
            {sortMembers(members.filter(m => m.team === TEAMS.BURGUNDY)).map(member => (
              <div key={member.id} className="relative group">
                <div className="relative">
                  {member.photo ? (
                    <img 
                      src={member.photo} 
                      alt={member.name} 
                      loading="lazy"
                      className="w-full aspect-square object-cover rounded-lg border-2 border-white"
                    />
                  ) : (
                    <div className="w-full aspect-square bg-gray-400 rounded-lg border-2 border-white flex items-center justify-center text-xl sm:text-2xl font-bold text-white">
                      {member.name.charAt(0)}
                    </div>
                  )}
                  <button
                    onClick={() => requestPassword(`deleteMember-${member.id}`, () => onDeleteMember(member.id))}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
                <div className="text-white text-center text-xs sm:text-sm font-semibold mt-1">
                  {member.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navy Blue Team */}
        <div className="bg-blue-900 rounded-lg p-3 sm:p-4">
          <h2 className="text-white text-xl sm:text-2xl font-bold text-center mb-3 sm:mb-4">
            NAVY BLUE
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-1 sm:gap-2">
            {sortMembers(members.filter(m => m.team === TEAMS.NAVY_BLUE)).map(member => (
              <div key={member.id} className="relative group">
                <div className="relative">
                  {member.photo ? (
                    <img 
                      src={member.photo} 
                      alt={member.name}
                      loading="lazy"
                      className="w-full aspect-square object-cover rounded-lg border-2 border-white"
                    />
                  ) : (
                    <div className="w-full aspect-square bg-gray-600 rounded-lg border-2 border-white flex items-center justify-center text-xl sm:text-2xl font-bold text-white">
                      {member.name.charAt(0)}
                    </div>
                  )}
                  <button
                    onClick={() => requestPassword(`deleteMember-${member.id}`, () => onDeleteMember(member.id))}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
                <div className="text-white text-center text-xs sm:text-sm font-semibold mt-1">
                  {member.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberTab;