import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import TeamSummary from './components/TeamSummary';
import PasswordModal from './components/PasswordModal';
import ResetConfirmModal from './components/ResetConfirmModal';
import MemberTab from './components/MemberTab';
import MatchTab from './components/MatchTab';
import ResultTab from './components/ResultTab';
import ScoreTab from './components/ScoreTab';
import { PASSWORD, RESET_PASSWORD, TABS } from './utils/constants';
import { calculatePlayerStats, calculateTeamStats } from './utils/calculations';
import { defaultMembers } from './data/defaultMembers';

const App = () => {
  const [activeTab, setActiveTab] = useState(TABS.SCORE);
  const [members, setMembers] = useState([]);
  const [matches, setMatches] = useState([]);
  
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordAction, setPasswordAction] = useState(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  // Load data from localStorage
  useEffect(() => {
    const savedMembers = localStorage.getItem('members');
    const savedMatches = localStorage.getItem('matches');
    
    if (savedMembers) {
      setMembers(JSON.parse(savedMembers));
    } else {
      setMembers(defaultMembers);
    }
    
    if (savedMatches) {
      setMatches(JSON.parse(savedMatches));
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('matches', JSON.stringify(matches));
  }, [matches]);

  // Password verification
  const requestPassword = (action, callback) => {
    setPasswordAction(action);
    setPendingAction(() => callback);
    setPasswordInput('');
    setPasswordError('');
    setShowPasswordModal(true);
  };

  const verifyPassword = () => {
    const isReset = passwordAction === 'reset';
    const correctPassword = isReset ? RESET_PASSWORD : PASSWORD;
    
    if (passwordInput === correctPassword) {
      setShowPasswordModal(false);
      setPasswordError('');
      setPasswordInput('');
      
      if (passwordAction === 'reset') {
        setShowResetConfirm(true);
      } else if (pendingAction) {
        pendingAction();
        setPendingAction(null);
      }
    } else {
      setPasswordError('รหัสผ่านไม่ถูกต้อง');
    }
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordInput('');
    setPasswordError('');
    setPendingAction(null);
  };

  // Reset system
  const handleResetSystem = () => {
    localStorage.clear();
    setMembers([]);
    setMatches([]);
    setShowResetConfirm(false);
    alert('รีเซ็ตระบบเรียบร้อย! กรุณารีเฟรชหน้าเว็บ');
    window.location.reload();
  };

  // Member operations
  const handleAddMember = (member) => {
    setMembers([...members, member]);
  };

  const handleDeleteMember = (id) => {
    setMembers(members.filter(m => m.id !== id));
  };

  // Match operations
  const handleAddMatch = (match) => {
    setMatches([...matches, match]);
  };

  const handleUpdateMatch = (updatedMatch) => {
    setMatches(matches.map(m => m.id === updatedMatch.id ? updatedMatch : m));
  };

  const handleDeleteMatch = (id) => {
    setMatches(matches.filter(m => m.id !== id));
  };

  // Calculate statistics
  const playerStats = calculatePlayerStats(members, matches);
  const burgundyStats = calculateTeamStats(playerStats, 'Burgundy');
  const navyBlueStats = calculateTeamStats(playerStats, 'Navy Blue');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Modals */}
      <ResetConfirmModal
        show={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={handleResetSystem}
        membersCount={members.length}
        matchesCount={matches.length}
      />

      <PasswordModal
        show={showPasswordModal}
        onClose={closePasswordModal}
        onVerify={verifyPassword}
        passwordInput={passwordInput}
        setPasswordInput={setPasswordInput}
        passwordError={passwordError}
        isReset={passwordAction === 'reset'}
      />

      {/* Header */}
      <Header />

      {/* Tabs */}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Team Summary */}
      <TeamSummary
        burgundyTeamSet={burgundyStats.totalSetsWon}
        burgundyTeamScore={burgundyStats.totalScore}
        navyBlueTeamSet={navyBlueStats.totalSetsWon}
        navyBlueTeamScore={navyBlueStats.totalScore}
      />

      {/* Content */}
      <div className="p-2 sm:p-4">
        {activeTab === TABS.MEMBER && (
          <MemberTab
            members={members}
            onAddMember={handleAddMember}
            onDeleteMember={handleDeleteMember}
            requestPassword={requestPassword}
          />
        )}

        {activeTab === TABS.MATCH && (
          <MatchTab
            members={members}
            matches={matches}
            onAddMatch={handleAddMatch}
            onUpdateMatch={handleUpdateMatch}
            onDeleteMatch={handleDeleteMatch}
            requestPassword={requestPassword}
          />
        )}

        {activeTab === TABS.RESULT && (
          <ResultTab
            members={members}
            matches={matches}
            requestPassword={requestPassword}
            onEdit={handleUpdateMatch}
            onDelete={handleDeleteMatch}
          />
        )}

        {activeTab === TABS.SCORE && (
          <ScoreTab playerStats={playerStats} />
        )}
      </div>
    </div>
  );
};

export default App;