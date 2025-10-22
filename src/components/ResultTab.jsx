import React, { useState } from 'react';
import { Trophy, Edit2, Trash2 } from 'lucide-react';

const ResultTab = ({ members, matches, requestPassword, onEdit, onDelete }) => {
  const [editingMatch, setEditingMatch] = useState(null);
  const [editScoreData, setEditScoreData] = useState({
    scoreTeam1: '',
    scoreTeam2: ''
  });

  // กรองแมตช์ที่กรอกคะแนนแล้ว
  const completedMatches = matches.filter(m => 
    m.scoreTeam1 && m.scoreTeam2 && m.scoreTeam1 !== '0' && m.scoreTeam2 !== '0'
  );

  const handleEditClick = (match) => {
    setEditingMatch(match);
    setEditScoreData({
      scoreTeam1: match.scoreTeam1,
      scoreTeam2: match.scoreTeam2
    });
  };

  const handleSaveScore = () => {
    if (editScoreData.scoreTeam1 && editScoreData.scoreTeam2) {
      onEdit({
        ...editingMatch,
        scoreTeam1: editScoreData.scoreTeam1,
        scoreTeam2: editScoreData.scoreTeam2
      });
      closeEditModal();
    } else {
      alert('Please enter both scores.');
    }
  };

  const closeEditModal = () => {
    setEditingMatch(null);
    setEditScoreData({ scoreTeam1: '', scoreTeam2: '' });
  };

  return (
    <div>      
      {completedMatches.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <Trophy size={48} className="mx-auto mb-3 opacity-30" />
          <p>No Result</p>
        </div>
      ) : (
        <div className="space-y-4">
          {completedMatches.map((match) => {
            const matchIndex = matches.indexOf(match);
            const player1_1 = members.find(m => m.name === match.team1Player1);
            const player1_2 = members.find(m => m.name === match.team1Player2);
            const player2_1 = members.find(m => m.name === match.team2Player1);
            const player2_2 = members.find(m => m.name === match.team2Player2);
            const team1Won = parseInt(match.scoreTeam1) > parseInt(match.scoreTeam2);
            const team2Won = parseInt(match.scoreTeam2) > parseInt(match.scoreTeam1);
            
            return (
              <div key={match.id} className="bg-gray-200 rounded-2xl p-3 sm:p-5 relative">
                {/* Match Actions */}
                <div className="absolute top-3 right-3 flex gap-2 z-10 opacity-50 group-hover:opacity-50 transition-opacity">
                  <button
                    onClick={() => requestPassword(`editMatch-${match.id}`, () => handleEditClick(match))}
                    className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => requestPassword(`deleteMatch-${match.id}`, () => onDelete(match.id))}
                    className="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-4 items-center">
                  {/* Team Burgundy */}
                  <div className="flex gap-1 sm:gap-2">
                    <div className="flex-1">
                      <div className={`rounded-lg sm:rounded-xl border-2 sm:border-4 overflow-hidden ${team1Won ? 'border-red-500' : 'border-gray-400'}`}>
                        {player1_1?.photo ? (
                          <img src={player1_1.photo} alt={match.team1Player1} loading="lazy" className="w-full aspect-square object-cover" />
                        ) : (
                          <div className="w-full aspect-square bg-red-300 flex items-center justify-center text-lg sm:text-3xl font-bold text-white">
                            {match.team1Player1?.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="text-center font-semibold mt-1 text-xs sm:text-sm">{match.team1Player1}</div>
                    </div>
                    <div className="flex-1">
                      <div className={`rounded-lg sm:rounded-xl border-2 sm:border-4 overflow-hidden ${team1Won ? 'border-red-500' : 'border-gray-400'}`}>
                        {player1_2?.photo ? (
                          <img src={player1_2.photo} alt={match.team1Player2} loading="lazy" className="w-full aspect-square object-cover" />
                        ) : (
                          <div className="w-full aspect-square bg-red-300 flex items-center justify-center text-lg sm:text-3xl font-bold text-white">
                            {match.team1Player2?.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="text-center font-semibold mt-1 text-xs sm:text-sm">{match.team1Player2}</div>
                    </div>
                  </div>

                  {/* Score Center */}
                  <div className="text-center">
                    <div className="text-orange-500 text-xl sm:text-3xl font-bold mb-2 sm:mb-3">
                      {String(matchIndex + 1).padStart(3, '0')}
                    </div>
                    <div className="text-xl sm:text-5xl font-bold">
                      <span style={{color: '#a72a2aff'}}>
                        {match.scoreTeam1}
                      </span>
                      <span className="mx-2">-</span>
                      <span style={{color: '#204fb3ff'}}>
                        {match.scoreTeam2}
                      </span>
                    </div>
                    <div className="text-xl sm:text-3xl font-bold mt-5" style={{color: team1Won ? '#a72a2aff' : team2Won ? '#204fb3ff' : '#666'}}>
                      {team1Won ? 'Burgundy Won' : team2Won ? 'Navy Blue Won' : 'Draw'}
                    </div>
                  </div>

                  {/* Team Navy Blue */}
                  <div className="flex gap-1 sm:gap-2">
                    <div className="flex-1">
                      <div className={`rounded-lg sm:rounded-xl border-2 sm:border-4 overflow-hidden ${team2Won ? 'border-blue-600' : 'border-gray-500'}`}>
                        {player2_1?.photo ? (
                          <img src={player2_1.photo} alt={match.team2Player1} loading="lazy" className="w-full aspect-square object-cover" />
                        ) : (
                          <div className="w-full aspect-square bg-blue-400 flex items-center justify-center text-lg sm:text-3xl font-bold text-white">
                            {match.team2Player1?.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="text-center font-semibold mt-1 text-xs sm:text-sm">{match.team2Player1}</div>
                    </div>
                    <div className="flex-1">
                      <div className={`rounded-lg sm:rounded-xl border-2 sm:border-4 overflow-hidden ${team2Won ? 'border-blue-600' : 'border-gray-500'}`}>
                        {player2_2?.photo ? (
                          <img src={player2_2.photo} alt={match.team2Player2} loading="lazy" className="w-full aspect-square object-cover" />
                        ) : (
                          <div className="w-full aspect-square bg-blue-400 flex items-center justify-center text-lg sm:text-3xl font-bold text-white">
                            {match.team2Player2?.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="text-center font-semibold mt-1 text-xs sm:text-sm">{match.team2Player2}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Score Modal */}
      {editingMatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="font-bold text-xl mb-4 text-center">Edit Score</h3>
            
            <div className="mb-4">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-red-700">
                    {editingMatch.team1Player1} & {editingMatch.team1Player2}
                  </span>
                  <br />
                  <span className="font-bold text-lg">VS</span>
                  <br />
                  <span className="font-semibold text-blue-700">
                    {editingMatch.team2Player1} & {editingMatch.team2Player2}
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-red-700 mb-2 text-center">
                    Burgundy Score
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={editScoreData.scoreTeam1}
                    onChange={(e) => setEditScoreData({ ...editScoreData, scoreTeam1: e.target.value })}
                    className="w-full p-3 border-2 border-red-300 rounded text-center text-2xl font-bold focus:border-red-500 focus:outline-none"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-blue-700 mb-2 text-center">
                    Navy Blue Score
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={editScoreData.scoreTeam2}
                    onChange={(e) => setEditScoreData({ ...editScoreData, scoreTeam2: e.target.value })}
                    className="w-full p-3 border-2 border-blue-300 rounded text-center text-2xl font-bold focus:border-blue-500 focus:outline-none"
                    min="0"
                  />
                </div>
              </div>

              <div className="mt-4 text-center text-xs text-gray-500">
                Current: {editingMatch.scoreTeam1} - {editingMatch.scoreTeam2}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={closeEditModal}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded font-semibold hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveScore}
                className="flex-1 bg-green-500 text-white px-4 py-2 rounded font-semibold hover:bg-green-600"
              >
                Save Score
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultTab;