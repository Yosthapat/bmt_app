import React from 'react';
import { LEVELS } from '../utils/constants';

const ScoreTab = ({ playerStats }) => {
  return (
    <div>
      {LEVELS.map(level => {
        const levelPlayers = playerStats.filter(p => p.level === level);
        if (levelPlayers.length === 0) return null;
        
        return (
          <div key={level} className="mb-6">
            <div className="bg-white rounded shadow overflow-hidden">
              <div className="bg-gray-700 text-white p-3">
                <h2 className="text-lg sm:text-xl font-bold text-center">Lv.{level}</h2>
              </div>
              <div className="bg-gray-600 text-white grid grid-cols-4 p-2 text-center text-xs sm:text-sm">
                <div>Player</div>
                <div>Games</div>
                <div>Set Won</div>
                <div>Score</div>
              </div>
              {levelPlayers.map((player, index) => {
                const isBurgundy = player.team === 'Burgundy';
                return (
                  <div
                    key={index}
                    className={`grid grid-cols-4 items-center p-2 sm:p-3 border-b ${
                      isBurgundy ? 'bg-red-800 text-white' : 'bg-blue-900 text-white'
                    }`}
                  >
                    <div className="flex items-center gap-1 sm:gap-2">
                      {player.photo ? (
                        <img 
                          src={player.photo} 
                          alt={player.name} 
                          loading="lazy"
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover" 
                        />
                      ) : (
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-400 flex items-center justify-center text-xs sm:text-sm">
                          {player.name.charAt(0)}
                        </div>
                      )}
                      <span className="font-semibold text-xs sm:text-sm truncate">{player.name}</span>
                    </div>
                    <div className="text-center text-lg sm:text-2xl font-bold">{player.totalGames}</div>
                    <div className="text-center text-lg sm:text-2xl font-bold text-yellow-400">{player.gamesWon}</div>
                    <div className="text-center text-lg sm:text-2xl font-bold">{player.totalScore}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ScoreTab;