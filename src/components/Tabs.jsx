import React from 'react';
import { Users, Swords, Beer, Trophy } from 'lucide-react';
import { TABS } from '../utils/constants';

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: TABS.MEMBER, label: 'MEMBER', shortLabel: 'MEMBER', icon: Users },
    { id: TABS.MATCH, label: 'MATCH', shortLabel: 'MATCH', icon: Swords },
    { id: TABS.RESULT, label: 'RESULT', shortLabel: 'RESULT', icon: Beer },
    { id: TABS.SCORE, label: 'SCORE', shortLabel: 'SCORE', icon: Trophy }
  ];

  const getTabColor = (tabId) => {
    const colors = {
      [TABS.MEMBER]: 'bg-puple-300',
      [TABS.MATCH]: 'bg-green-300',
      [TABS.RESULT]: 'bg-orange-300',
      [TABS.SCORE]: 'bg-pink-300'
    };
    return colors[tabId] || 'bg-gray-200';
  };

  return (
    <div className="grid grid-cols-4 bg-white shadow text-xs sm:text-base">
      {tabs.map(tab => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-1 sm:py-3 sm:px-4 font-semibold ${
              activeTab === tab.id ? getTabColor(tab.id) : 'bg-gray-200'
            }`}
          >
            <Icon className="inline mr-1 sm:mr-2" size={16} />
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.shortLabel}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;