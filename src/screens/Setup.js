import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Setup() {
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState([]);

  let gameDetails = {
    gameName: "",
    totalRounds: 0,
    totalPlayers: players,
  };

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  function addPlayer(event) {
    setPlayers([...players, playerName]);
    console.log(players);
    setPlayerName("");
  }

  return (
    <div className="m-2">
      <div className="mx-auto w-100 bg-red-100">Game Setup</div>
      <div className="flex flex-col mb-6">
        <div className="p-2">Player 1</div>
        <input
          type="text"
          id="player-name"
          name="player-name"
          value={playerName}
          onChange={handleChange}
          className="bg-blue-100 border-2 border-solid border-blue-500 mb-4 p-2"
          placeholder="Player Name"
        />
        <button className="bg-blue-500 text-white p-2" onClick={addPlayer}>
          Add Player
        </button>
      </div>
      <div className="flex flex-col">
        {players.length >= 1 && <div>Players:</div>}
        {players.map((player, i) => (
          <div className="flex flex-row w-100 justify-between">
            <div>{player}</div>
            <button>Remove Player</button>
          </div>
        ))}
        {players.length >= 1 && (
          <Link to="/scoreboard">
            <button className="bg-blue-500 text-white p-2 mt-24">
              Start Game
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
