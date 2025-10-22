import React from 'react';
import { Medal } from 'lucide-react';

const TeamSummary = ({ burgundyTeamSet, burgundyTeamScore, navyBlueTeamSet, navyBlueTeamScore }) => {
  return (
    <div className="bg-white p-4 shadow mb-4">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="font-bold text-red-700 text-xl">Burgundy</div>
          <div className="font-bold text-red-700 text-3xl mt-7">{burgundyTeamSet}</div>
          <div className="text-sm text-red-700 text-xl mt-2">{burgundyTeamScore}</div>
        </div>
        <div>
          <Medal size={48} className="mx-auto mb-3 opacity-30" />
          <div className="font-bold text-black-700 text-xl mt-3">Team Set</div>
          <div className="font-bold text-black-700 text-xl mt-3">Score</div>
        </div>
        <div>
          <div className="font-bold text-blue-700 text-xl">Navy Blue</div>
          <div className="font-bold text-blue-700 text-3xl mt-7">{navyBlueTeamSet}</div>
          <div className="text-sm text-blue-700 text-xl mt-2">{navyBlueTeamScore}</div>
        </div>
      </div>
    </div>
  );
};

export default TeamSummary;