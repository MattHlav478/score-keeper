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
  const [finalRoundSubmitted, setFinalRoundSubmitted] = useState(false);

  // useEffect(() => {
  //   console.log(gameDetails);
  // }, [gameDetails]);

  // useEffect(() => {
  //   localStorage.setItem("players", JSON.stringify(players));
  //   localStorage.setItem("gameDetails", JSON.stringify(gameDetails));
  // }, [players, gameDetails]);

  // useEffect(() => {
  //   const savedGameDetails = localStorage.getItem("gameDetails");
  //   const savedPlayers = localStorage.getItem("players");

  //   if (savedGameDetails) {
  //     setGameDetails(JSON.parse(savedGameDetails));
  //   }
  //   if (savedPlayers) {
  //     setPlayers(JSON.parse(savedPlayers));
  //   }
  // }, []);

  function handleScoreInputChange(playerIndex, event) {
    const updatedScores = [...currentRoundScores];
    updatedScores[playerIndex] = Number(event.target.value);
    setCurrentRoundScores(updatedScores);
  }

  function incrementScore(playerIndex) {
    const updatedScores = [...currentRoundScores];
    updatedScores[playerIndex] += 1;
    setCurrentRoundScores(updatedScores);
  }

  function decrementScore(playerIndex) {
    const updatedScores = [...currentRoundScores];
    updatedScores[playerIndex] -= 1;
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
    // localStorage.setItem("players", JSON.stringify(updatedPlayers));

    if (gameDetails.currentRound === gameDetails.totalRounds) {
      setFinalRoundSubmitted(true);
      console.log("final round submitted");
      return;
    } else {
      setGameDetails((prevDetails) => ({
        ...prevDetails,
        allPlayers: updatedPlayers,
        currentRound: prevDetails.currentRound + 1,
      }));
    }

    // Reset currentRoundScores to initial state
    setCurrentRoundScores(Array(players.length).fill(0));
  };

  const handleRestart = () => {
    setFinalRoundSubmitted(false);
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
    setPlayers([]);
    setGameDetails({
      gameName: "",
      allPlayers: players,
      totalPlayers: players.length,
      totalRounds: 0,
      currentRound: 1,
    });
    navigate("/");
  };

  return (
    <div className="flex flex-col h-screen m-2 text-lg">
      <header className="self-center">
        <div className="text-2xl font-bold">{gameDetails.gameName}</div>
        <div className="pb-2">
          Round {gameDetails.currentRound}
          {gameDetails.totalRounds === 0
            ? null
            : ` of ${gameDetails.totalRounds}`}
        </div>
      </header>
      <table className="self-center w-1/2">
        <thead>
          <tr className="border p-2">
            <th className="border p-2 w-1/3">Player</th>
            <th className="border p-2 w-1/3">Round Score</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, i) => (
            <tr key={i} className="border p-2">
              <td className="border p-2 text-center">{player.name}</td>
              <td className="border p-2">
                <input
                  type="number"
                  inputMode="numeric"
                  value={currentRoundScores[i]}
                  className="w-full bg-violet-300 text-black text-center"
                  onChange={(event) => handleScoreInputChange(i, event)}
                ></input>
                <div className="flex flex-row w-full pt-1">
                  <button
                    className="w-1/2 bg-violet-600 m-1 rounded-lg"
                    onClick={() => incrementScore(i)}
                  >
                    +
                  </button>
                  <button
                    className="w-1/2 bg-violet-600 m-1 rounded-lg"
                    onClick={() => decrementScore(i)}
                  >
                    -
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center">
        {gameDetails.currentRound <= gameDetails.totalRounds ||
        !finalRoundSubmitted ? (
          <button
            className="w-36 p-2 mt-4 font-bold rounded-lg bg-violet-600 border-2 border-white "
            onClick={handleRoundSubmit}
          >
            Submit Round
          </button>
        ) : (
          <div className="w-36 p-2 mt-4"></div>
        )}
      </div>

      <div className="flex flex-col pt-20">
        <header className="self-center pb-2">Game Summary</header>
        <table className="self-center w-1/2">
          <thead>
            <tr className="border p-2">
              <th className="border p-2">Player</th>
              <th className="border p-2">Total Score</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, i) => (
              <tr key={i} className="border p-2">
                <td className="border p-2 text-center">{player.name}</td>
                <td className="border p-2 text-center">
                  {player.scores.reduce((total, score) => total + score, 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center">
        {gameDetails.currentRound === gameDetails.totalRounds &&
        finalRoundSubmitted ? (
          <div className="w-full flex justify-around">
            <div>
              <button
                className="w-36 p-2 mt-4 font-bold rounded-lg bg-violet-600 border-2 border-white "
                onClick={handleRestart}
              >
                Quick Restart
              </button>
            </div>
            <div>
              <button
                className="w-36 p-2 mt-4 font-bold rounded-lg bg-violet-600 border-2 border-white "
                onClick={handleNewGame}
              >
                New Game
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
