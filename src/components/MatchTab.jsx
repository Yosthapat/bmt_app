import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save } from 'lucide-react';

const MatchTab = ({ members, matches, onAddMatch, onUpdateMatch, onDeleteMatch, requestPassword }) => {
  const [showAddMatch, setShowAddMatch] = useState(false);
  const [editingMatch, setEditingMatch] = useState(null);
  const [newMatch, setNewMatch] = useState({
    team1Player1: '',
    team1Player2: '',
    team2Player1: '',
    team2Player2: '',
    scoreTeam1: 0,
    scoreTeam2: 0
  });

  // กรองสมาชิกตามทีม
  const burgundyMembers = members.filter(m => m.team === 'Burgundy');
  const navyBlueMembers = members.filter(m => m.team === 'Navy Blue');

  const handleSaveMatch = () => {
    if (newMatch.team1Player1 && newMatch.team1Player2 && newMatch.team2Player1 && newMatch.team2Player2) {
      if (editingMatch) {
        onUpdateMatch({ ...newMatch, id: editingMatch.id });
      } else {
        onAddMatch({ ...newMatch, id: Date.now() });
      }
      resetForm();
    } else {
      alert('Please select all 4 players.');
    }
  };

  const resetForm = () => {
    setNewMatch({
      team1Player1: '',
      team1Player2: '',
      team2Player1: '',
      team2Player2: '',
      scoreTeam1: 0,
      scoreTeam2: 0
    });
    setEditingMatch(null);
    setShowAddMatch(false);
  };

  const handleEdit = (match) => {
    setNewMatch(match);
    setEditingMatch(match);
    setShowAddMatch(true);
  };

  // กรองแมตช์ที่ยังไม่กรอกคะแนน
  const pendingMatches = matches.filter(m => 
    !m.scoreTeam1 || !m.scoreTeam2 || m.scoreTeam1 === '0' || m.scoreTeam2 === '0'
  );

  return (
    <div>
      <button
        onClick={() => requestPassword('addMatch', () => setShowAddMatch(true))}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 mx-auto"
      >
        <Plus size={20} /> Add Match
      </button>

      {showAddMatch && (
        <div className="bg-white p-4 rounded shadow mb-4">
          <h3 className="font-bold mb-3 text-center text-lg">
            {editingMatch ? 'Edit Match' : 'Add Match'}
          </h3>
          
          {/* Team Burgundy */}
          <div className="mb-4 p-3 bg-red-50 rounded border-2 border-red-300">
            <h4 className="font-semibold mb-2 text-red-700 text-center text-lg">
              Team Burgundy
            </h4>
            <select
              value={newMatch.team1Player1}
              onChange={(e) => setNewMatch({ ...newMatch, team1Player1: e.target.value })}
              className="w-full p-2 border-2 border-red-300 rounded mb-2 focus:border-red-500 focus:outline-none"
            >
              <option value="">Pick Player 1</option>
              {burgundyMembers.map(m => (
                <option key={m.id} value={m.name}>
                  {m.name} (Lv.{m.level})
                </option>
              ))}
            </select>
            <select
              value={newMatch.team1Player2}
              onChange={(e) => setNewMatch({ ...newMatch, team1Player2: e.target.value })}
              className="w-full p-2 border-2 border-red-300 rounded focus:border-red-500 focus:outline-none"
            >
              <option value="">Pick Player 2</option>
              {burgundyMembers.map(m => (
                <option key={m.id} value={m.name}>
                  {m.name} (Lv.{m.level})
                </option>
              ))}
            </select>
          </div>

          {/* VS Divider */}
          <div className="text-center my-3">
            <span className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-full font-bold text-xl">
              VS
            </span>
          </div>

          {/* Team Navy Blue */}
          <div className="mb-4 p-3 bg-blue-50 rounded border-2 border-blue-300">
            <h4 className="font-semibold mb-2 text-blue-700 text-center text-lg">
              Team Navy Blue
            </h4>
            <select
              value={newMatch.team2Player1}
              onChange={(e) => setNewMatch({ ...newMatch, team2Player1: e.target.value })}
              className="w-full p-2 border-2 border-blue-300 rounded mb-2 focus:border-blue-500 focus:outline-none"
            >
              <option value="">Pick Player 1</option>
              {navyBlueMembers.map(m => (
                <option key={m.id} value={m.name}>
                  {m.name} (Lv.{m.level})
                </option>
              ))}
            </select>
            <select
              value={newMatch.team2Player2}
              onChange={(e) => setNewMatch({ ...newMatch, team2Player2: e.target.value })}
              className="w-full p-2 border-2 border-blue-300 rounded focus:border-blue-500 focus:outline-none"
            >
              <option value="">Pick Player 2</option>
              {navyBlueMembers.map(m => (
                <option key={m.id} value={m.name}>
                  {m.name} (Lv.{m.level})
                </option>
              ))}
            </select>
          </div>

          {/* Scores */}
          <div className="mb-4 bg-gray-50 p-3 rounded">
            <h4 className="font-semibold mb-2 text-center">score</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-red-700 mb-1">
                  Team Burgundy
                </label>
                <input
                  type="number"
                  placeholder="score"
                  value={newMatch.scoreTeam1}
                  onChange={(e) => setNewMatch({ ...newMatch, scoreTeam1: e.target.value })}
                  className="w-full p-2 border-2 border-red-300 rounded text-center text-xl font-bold focus:border-red-500 focus:outline-none"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">
                  Team Navy Blue
                </label>
                <input
                  type="number"
                  placeholder="score"
                  value={newMatch.scoreTeam2}
                  onChange={(e) => setNewMatch({ ...newMatch, scoreTeam2: e.target.value })}
                  className="w-full p-2 border-2 border-blue-300 rounded text-center text-xl font-bold focus:border-blue-500 focus:outline-none"
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={resetForm}
              className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded font-semibold hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveMatch}
              className="flex-1 bg-green-500 text-white px-4 py-2 rounded font-semibold hover:bg-green-600"
            >
              <Save className="inline mr-2" size={16} />
              {editingMatch ? 'update' : 'save'}
            </button>
          </div>
        </div>
      )}

      {/* แมตช์ที่รอการแข่ง */}
      <div className="space-y-4">
        {pendingMatches.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            <p>No Match</p>
          </div>
        ) : (
          pendingMatches.map((match) => {
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
                <div className="absolute top-3 right-3 flex gap-2 z-10">
                  <button
                    onClick={() => requestPassword(`editMatch-${match.id}`, () => handleEdit(match))}
                    className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => requestPassword(`deleteMatch-${match.id}`, () => onDeleteMatch(match.id))}
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
                    <div className="text-xl sm:text-2xl font-bold mb-1">
                      {match.scoreTeam1} - {match.scoreTeam2}
                    </div>
                    <div className="text-xs sm:text-sm font-semibold" style={{color: team1Won ? '#ef4444' : team2Won ? '#2563eb' : '#00a45aff'}}>
                      {team1Won ? 'Burgundy Win' : team2Won ? 'Navy Blue Win' : 'Waiting'}
                    </div>
                  </div>

                  {/* Team Navy Blue */}
                  <div className="flex gap-1 sm:gap-2">
                    <div className="flex-1">
                      <div className={`rounded-lg sm:rounded-xl border-2 sm:border-4 overflow-hidden ${team2Won ? 'border-blue-600' : 'border-gray-500'}`}>
                        {player2_1?.photo ? (
                          <img src={player2_1.photo} alt={match.team2Player1} loading="lazy" className="w-full aspect-square object-cover" />
                        ) : (
                          <div className="w-full aspect-square bg-blue-300 flex items-center justify-center text-lg sm:text-3xl font-bold text-white">
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
                          <div className="w-full aspect-square bg-blue-300 flex items-center justify-center text-lg sm:text-3xl font-bold text-white">
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
          })
        )}
      </div>
    </div>
  );
};

export default MatchTab;