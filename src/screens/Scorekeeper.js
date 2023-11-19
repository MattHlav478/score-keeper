import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Scorekeeper({
  players,
  setPlayers,
  gameDetails,
  setGameDetails,
}) {
  const navigate = useNavigate();

  const [currentRoundScores, setCurrentRoundScores] = useState(
    Array(players.length).fill(0)
  );

  useEffect(() => {
    console.log(gameDetails);
  }, [gameDetails]);

  // useEffect(() => {
  //   console.log(players);
  // }, [players]);

  function handleScoreInputChange(playerIndex, event) {
    const updatedScores = [...currentRoundScores];
    updatedScores[playerIndex] = Number(event.target.value);
    setCurrentRoundScores(updatedScores);
  }

  const handleRoundSubmit = () => {
    const updatedPlayers = players.map((player, playerIndex) => {
      return {
        ...player,
        scores: [...player.scores, currentRoundScores[playerIndex]],
      };
    });

    setPlayers(updatedPlayers);
    setCurrentRoundScores(Array(players.length).fill(0));

    if (gameDetails.currentRound === gameDetails.totalRounds) {
      return;
    } else {
      setGameDetails((prevDetails) => ({
        ...prevDetails,
        currentRound: prevDetails.currentRound + 1,
      }));
    }
  };

  const handleRestart = () => {
    setPlayers(
      players.map((player) => {
        return {
          ...player,
          scores: [],
        };
      })
    );
    setGameDetails((prevDetails) => ({
      ...prevDetails,
      currentRound: 1,
    }));
  };

  const handleNewGame = () => {
    navigate("/");
    setPlayers([]);
    setGameDetails({
      gameName: "",
      allPlayers: players,
      totalPlayers: players.length,
      totalRounds: 2,
      currentRound: 1,
    });
  };

  return (
    <div className="flex flex-col h-screen m-2 text-lg">
      <header>
        Round {gameDetails.currentRound}{" "}
        {gameDetails.totalRounds === 0 ? null : `of ${gameDetails.totalRounds}`}
      </header>
      <table className="table-auto self-center">
        <thead>
          <tr className="border p-2">
            <th className="border p-2 w-1/3">Player</th>
            <th className="border p-2 w-1/3">Round Score</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, i) => (
            <tr key={i} className="border p-2">
              <td className="border p-2">{player.name}</td>
              <td className="border p-2">
                <input
                  type="number"
                  className="w-full bg-violet-300 text-black"
                  onChange={(event) => handleScoreInputChange(i, event)}
                ></input>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {gameDetails.currentRound === gameDetails.totalRounds ? (
        <div>
          <button
            className="w-36 p-2 mt-4 font-bold rounded-lg bg-violet-600 border-2 border-white "
            onClick={handleRestart}
          >
            Quick Restart
          </button>
          <button
            className="w-36 p-2 mt-4 font-bold rounded-lg bg-violet-600 border-2 border-white "
            onClick={handleNewGame}
          >
            New Game
          </button>
        </div>
      ) : (
        <button
          className="w-36 p-2 mt-4 font-bold rounded-lg bg-violet-600 border-2 border-white "
          onClick={handleRoundSubmit}
        >
          Submit Round
        </button>
      )}

      <div className="flex flex-col mx-auto">
        <header>Summary</header>
        <table className="table-auto self-center">
          <thead>
            <tr className="border p-2">
              <th className="border p-2 w-1/3">Player</th>
              <th className="border p-2 w-1/3">Total Score</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, i) => (
              <tr key={i} className="border p-2">
                <td className="border p-2">{player.name}</td>
                <td className="border p-2">
                  {player.scores.reduce((total, score) => total + score, 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
