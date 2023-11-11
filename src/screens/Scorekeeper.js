import React, { useState } from "react";

export default function Scorekeeper({ players }) {
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
    <div className="m-2 h-screen text-lg">
      <table className="width-full">
        <tr>
          <th>Player</th>
          <th>Round Score</th>
          <th>Total Score</th>
        </tr>
        {players.map((player, i) => (
          <tr>
            {" "}
            <td className="w-1/3">{player.name}</td>
            <td>
              <input className="w-16"></input>
            </td>
            <td>{player.score}</td>
          </tr>
        ))}
      </table>
      <button
        className="font-bold rounded-lg w-36 p-2 mt-4 bg-violet-600 border-2 border-white "
        onClick={handleRoundSubmit}
      >
        Submit Round
      </button>
    </div>
  );
}
