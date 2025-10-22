import React, { useState } from 'react';
import { Plus, Trash2, Edit2, X } from 'lucide-react';
import { TEAMS, LEVELS } from '../utils/constants';
import { compressImage, isImageFile } from '../utils/imageCompressor';

const MemberTab = ({ members, onAddMember, onDeleteMember, onEditMember, requestPassword }) => {
  const [showAddMember, setShowAddMember] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [newMember, setNewMember] = useState({
    name: '',
    team: TEAMS.BURGUNDY, 
    level: 'Milk',
    photo: ''
  });
  const [uploading, setUploading] = useState(false);
  
  // NEW: State for image modal
  const [selectedImage, setSelectedImage] = useState(null);

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
      if (editingMember) {
        // Update existing member
        onEditMember({ ...newMember, id: editingMember.id });
      } else {
        // Add new member
        onAddMember({ ...newMember, id: Date.now() });
      }
      resetForm();
    } else {
      alert("Please enter the member's name.");
    }
  };

  const resetForm = () => {
    setNewMember({ name: '', team: TEAMS.BURGUNDY, level: 'Milk', photo: '' });
    setEditingMember(null);
    setShowAddMember(false);
  };

  const handleEditClick = (member) => {
    setEditingMember(member);
    setNewMember({
      name: member.name,
      team: member.team,
      level: member.level,
      photo: member.photo || ''
    });
    setShowAddMember(true);
  };

  // NEW: Function to open image modal
  const handleImageClick = (member) => {
    if (member.photo) {
      setSelectedImage({
        photo: member.photo,
        name: member.name,
        level: member.level,
        team: member.team
      });
    }
  };

  // NEW: Function to close image modal
  const closeImageModal = () => {
    setSelectedImage(null);
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
          <h3 className="font-bold mb-3">
            {editingMember ? 'Edit Member' : 'Add New Member'}
          </h3>
          
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
              onClick={resetForm}
              className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleAddMember}
              disabled={uploading}
              className="flex-1 bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
              {editingMember ? 'Update' : 'Save'}
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
                      onClick={() => handleImageClick(member)}
                      className="w-full aspect-square object-cover rounded-lg border-2 border-white cursor-pointer hover:opacity-90 transition-opacity"
                    />
                  ) : (
                    <div 
                      onClick={() => handleImageClick(member)}
                      className="w-full aspect-square bg-gray-400 rounded-lg border-2 border-white flex items-center justify-center text-xl sm:text-2xl font-bold text-white cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      {member.name.charAt(0)}
                    </div>
                  )}
                  {/* Edit and Delete buttons */}
                  <div className="absolute top-3 right-3 flex gap-2 z-10 opacity-0 group-hover:opacity-50 transition-opacity">
                    <button
                      onClick={() => requestPassword(`editMember-${member.id}`, () => handleEditClick(member))}
                      className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600"
                      title="Edit Member"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => requestPassword(`deleteMember-${member.id}`, () => onDeleteMember(member.id))}
                      className="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600"
                      title="Delete Member"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
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
                      onClick={() => handleImageClick(member)}
                      className="w-full aspect-square object-cover rounded-lg border-2 border-white cursor-pointer hover:opacity-90 transition-opacity"
                    />
                  ) : (
                    <div 
                      onClick={() => handleImageClick(member)}
                      className="w-full aspect-square bg-gray-600 rounded-lg border-2 border-white flex items-center justify-center text-xl sm:text-2xl font-bold text-white cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      {member.name.charAt(0)}
                    </div>
                  )}
                  {/* Edit and Delete buttons */}
                  <div className="absolute top-3 right-3 flex gap-2 z-10 opacity-0 group-hover:opacity-50 transition-opacity">
                    <button
                      onClick={() => requestPassword(`editMember-${member.id}`, () => handleEditClick(member))}
                      className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600"
                      title="Edit Member"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => requestPassword(`deleteMember-${member.id}`, () => onDeleteMember(member.id))}
                      className="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600"
                      title="Delete Member"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="text-white text-center text-xs sm:text-sm font-semibold mt-1">
                  {member.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NEW: Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={closeImageModal}
        >
          <div className="relative max-w-4xl w-full">
            {/* Close button */}
            <button
              onClick={closeImageModal}
              className="absolute -top-12 right-0 bg-white text-gray-800 rounded-full p-2 hover:bg-gray-200 transition-colors"
              title="Close"
            >
              <X size={24} />
            </button>
            
            {/* Image container */}
            <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
              {selectedImage.photo ? (
                <img 
                  src={selectedImage.photo} 
                  alt={selectedImage.name}
                  className="w-full h-auto max-h-[80vh] object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <div className="w-full aspect-square bg-gray-400 flex items-center justify-center text-9xl font-bold text-white">
                  {selectedImage.name.charAt(0)}
                </div>
              )}
              
              {/* Member info */}
              <div className={`p-4 ${selectedImage.team === TEAMS.BURGUNDY ? 'bg-red-800' : 'bg-blue-900'}`}>
                <h3 className="text-white text-2xl font-bold text-center">
                  {selectedImage.name}
                </h3>
                <p className="text-white text-center mt-1">
                  Lv.{selectedImage.level} • {selectedImage.team}
                </p>
              </div>
            </div>
            
            {/* Hint text */}
            <p className="text-white text-center mt-4 text-sm">
              Click anywhere to close
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberTab;