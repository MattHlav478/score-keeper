import React, { useState } from "react";

export default function Scorekeeper({players}) {
  const [round, setRound] = useState(1);
  const [scores, setScores] = useState({});

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
            {players.map((player, i) => (
              <th key={i}>{player.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {players.map((player, i) => (
              <td key={i}>
                <input
                  type="number"
                  onChange={(e) =>
                    handleScoreInputChange(player, round, e.target.value)
                  }
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <button onClick={handleRoundSubmit}>Submit Round</button>
    </div>
  );
}
