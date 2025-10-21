import React from 'react';
import { Trophy, Edit2, Trash2 } from 'lucide-react';

const ResultTab = ({ members, matches, requestPassword, onEdit, onDelete }) => {
  // กรองแมตช์ที่กรอกคะแนนแล้ว
  const completedMatches = matches.filter(m => 
    m.scoreTeam1 && m.scoreTeam2 && m.scoreTeam1 !== '0' && m.scoreTeam2 !== '0'
  );

  return (
    <div>
      <h2 className="text-xl font-bold text-center mb-4">Result</h2>
      
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
                <div className="absolute top-3 right-3 flex gap-2 z-10">
                  <button
                    onClick={() => requestPassword(`editMatch-${match.id}`, () => onEdit(match))}
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
                  {/* Team 1 */}
                  <div className="flex gap-1 sm:gap-2">
                    <div className="flex-1">
                      <div className={`rounded-lg sm:rounded-xl border-2 sm:border-4 overflow-hidden ${team1Won ? 'border-red-500' : 'border-gray-400'}`}>
                        {player1_1?.photo ? (
                          <img src={player1_1.photo} alt={match.team1Player1} loading="lazy" className="w-full aspect-square object-cover" />
                        ) : (
                          <div className="w-full aspect-square bg-gray-400 flex items-center justify-center text-lg sm:text-3xl font-bold text-white">
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
                          <div className="w-full aspect-square bg-gray-400 flex items-center justify-center text-lg sm:text-3xl font-bold text-white">
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
                    <div className="text-xs sm:text-sm font-semibold" style={{color: team1Won ? '#ef4444' : team2Won ? '#2563eb' : '#666'}}>
                      {team1Won ? 'Burgundy Win' : team2Won ? 'Navy Blue Win' : 'Waiting'}
                    </div>
                  </div>

                  {/* Team 2 */}
                  <div className="flex gap-1 sm:gap-2">
                    <div className="flex-1">
                      <div className={`rounded-lg sm:rounded-xl border-2 sm:border-4 overflow-hidden ${team2Won ? 'border-blue-600' : 'border-gray-500'}`}>
                        {player2_1?.photo ? (
                          <img src={player2_1.photo} alt={match.team2Player1} loading="lazy" className="w-full aspect-square object-cover" />
                        ) : (
                          <div className="w-full aspect-square bg-gray-600 flex items-center justify-center text-lg sm:text-3xl font-bold text-white">
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
                          <div className="w-full aspect-square bg-gray-600 flex items-center justify-center text-lg sm:text-3xl font-bold text-white">
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
    </div>
  );
};

export default ResultTab;