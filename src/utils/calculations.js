/**
 * คำนวณสถิติผู้เล่นทั้งหมด
 */
export const calculatePlayerStats = (members, matches) => {
  const stats = {};
  
  // สร้าง object สำหรับเก็บสถิติแต่ละคน
  members.forEach(member => {
    stats[member.name] = {
      ...member,
      totalGames: 0,
      gamesWon: 0,
      totalScore: 0,
      matchesPlayed: 0
    };
  });
  
  // คำนวณจาก matches
  matches.forEach(match => {
    const team1Players = [match.team1Player1, match.team1Player2];
    const team2Players = [match.team2Player1, match.team2Player2];
    const team1Won = parseInt(match.scoreTeam1) > parseInt(match.scoreTeam2) ? 1 : 0;
    const team2Won = parseInt(match.scoreTeam2) > parseInt(match.scoreTeam1) ? 1 : 0;
    
    team1Players.forEach(playerName => {
      if (stats[playerName]) {
        stats[playerName].totalGames += 1;
        stats[playerName].gamesWon += team1Won;
        stats[playerName].totalScore += parseInt(match.scoreTeam1) || 0;
        stats[playerName].matchesPlayed++;
      }
    });
    
    team2Players.forEach(playerName => {
      if (stats[playerName]) {
        stats[playerName].totalGames += 1;
        stats[playerName].gamesWon += team2Won;
        stats[playerName].totalScore += parseInt(match.scoreTeam2) || 0;
        stats[playerName].matchesPlayed++;
      }
    });
  });
  
  // เรียงตามคะแนนรวม
  return Object.values(stats).sort((a, b) => b.totalScore - a.totalScore);
};

/**
 * คำนวณคะแนนรวมของแต่ละทีม
 */
export const calculateTeamStats = (playerStats, team) => {
  const teamPlayers = playerStats.filter(p => p.team === team);
  return {
    totalScore: teamPlayers.reduce((sum, p) => sum + p.totalScore, 0),
    totalSetsWon: teamPlayers.reduce((sum, p) => sum + p.gamesWon, 0),
    totalPlayers: teamPlayers.length,
    totalMatches: teamPlayers.reduce((sum, p) => sum + p.matchesPlayed, 0)
  };
};