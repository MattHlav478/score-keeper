import React, { useState } from "react";

export default function Scorekeeper() {
  const [players, setPlayers] = useState([]);
  const [round, setRound] = useState(1);
  const [scores, setScores] = useState({});

  const handleAddPlayer = () => {
    const playerName = prompt("Enter player name:");
    if (playerName) {
      setPlayers([...players, playerName]);
      setScores((prevScores) => ({
        ...prevScores,
        [playerName]: [],
      }));
    }
  };

  const handleScoreInputChange = (player, round, score) => {
    const updatedScores = { ...scores };
    updatedScores[player][round - 1] = parseInt(score);
    setScores(updatedScores);
  };

  const handleRoundSubmit = () => {
    const roundScores = Object.values(scores).map(
      (playerScores) => playerScores[round - 1] || 0
    );
    const roundTotal = roundScores.reduce((total, score) => total + score, 0);

    setRound(round + 1);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
                      <th className="">Round {round}</th>
            {players.map((player) => (
              <th key={player}>{player}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {players.map((player) => (
              <td key={player}>
                <input
                  type="number"
                  value={scores[player][round - 1] || ""}
                  onChange={(e) =>
                    handleScoreInputChange(player, round, e.target.value)
                  }
                />
              </td>
            ))}
          </tr>
        </tbody>
          </table>
      <button onClick={handleAddPlayer}>Add Player</button>
      <button onClick={handleRoundSubmit}>Submit Round</button>
    </div>
  );
}
