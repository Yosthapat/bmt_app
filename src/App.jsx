import React, { useState, useEffect } from 'react';
import { ref, onValue, set, remove } from 'firebase/database';
import { database } from './firebase';
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

const App = () => {
  const [activeTab, setActiveTab] = useState(TABS.SCORE);
  const [members, setMembers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordAction, setPasswordAction] = useState(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  // Load data from Firebase (Realtime!)
  useEffect(() => {
    // Listen to members
    const membersRef = ref(database, 'members');
    const unsubscribeMembers = onValue(membersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const membersArray = Object.values(data);
        setMembers(membersArray);
      } else {
        // ไม่มีข้อมูล - เริ่มต้นด้วยรายการว่าง
        setMembers([]);
      }
      setLoading(false);
    });

    // Listen to matches
    const matchesRef = ref(database, 'matches');
    const unsubscribeMatches = onValue(matchesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const matchesArray = Object.values(data);
        setMatches(matchesArray);
      } else {
        setMatches([]);
      }
    });

    // Cleanup listeners
    return () => {
      unsubscribeMembers();
      unsubscribeMatches();
    };
  }, []);

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
  const handleResetSystem = async () => {
    try {
      await set(ref(database, 'members'), null);
      await set(ref(database, 'matches'), null);
      setShowResetConfirm(false);
      alert('รีเซ็ตระบบเรียบร้อย!');
    } catch (error) {
      alert('เกิดข้อผิดพลาด: ' + error.message);
    }
  };

  // Member operations
  const handleAddMember = async (member) => {
    try {
      const memberRef = ref(database, `members/${member.id}`);
      await set(memberRef, member);
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการเพิ่มสมาชิก: ' + error.message);
    }
  };

  const handleDeleteMember = async (id) => {
    try {
      const memberRef = ref(database, `members/${id}`);
      await remove(memberRef);
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการลบสมาชิก: ' + error.message);
    }
  };

  // Match operations
  const handleAddMatch = async (match) => {
    try {
      const matchRef = ref(database, `matches/${match.id}`);
      await set(matchRef, match);
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการเพิ่มแมตช์: ' + error.message);
    }
  };

  const handleUpdateMatch = async (updatedMatch) => {
    try {
      const matchRef = ref(database, `matches/${updatedMatch.id}`);
      await set(matchRef, updatedMatch);
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการแก้ไขแมตช์: ' + error.message);
    }
  };

  const handleDeleteMatch = async (id) => {
    try {
      const matchRef = ref(database, `matches/${id}`);
      await remove(matchRef);
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการลบแมตช์: ' + error.message);
    }
  };

  // Calculate statistics
  const playerStats = calculatePlayerStats(members, matches);
  const burgundyStats = calculateTeamStats(playerStats, 'Burgundy');
  const navyBlueStats = calculateTeamStats(playerStats, 'Navy Blue');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading Data...</p>
        </div>
      </div>
    );
  }

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