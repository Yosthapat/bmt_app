import React from 'react';

const TeamSummary = ({ burgundyTeamSet, burgundyTeamScore, navyBlueTeamSet, navyBlueTeamScore }) => {
  return (
    <div className="bg-white p-4 shadow mb-4">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="font-bold text-red-700">Burgundy</div>
          <div className="font-bold text-red-700 text-2xl">{burgundyTeamSet}</div>
          <div className="text-sm text-red-700">{burgundyTeamScore}</div>
        </div>
        <div>
          <div className="font-bold text-black-700 text-xs sm:text-base">Team Set / Score</div>
          <div className="font-bold text-black-700 text-2xl">VS</div>
        </div>
        <div>
          <div className="font-bold text-blue-700">Navy Blue</div>
          <div className="font-bold text-blue-700 text-2xl">{navyBlueTeamSet}</div>
          <div className="text-sm text-blue-700">{navyBlueTeamScore}</div>
        </div>
      </div>
    </div>
  );
};

export default TeamSummary;