import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";

export default function Setup({ players, setPlayers }) {
  const [playerName, setPlayerName] = useState("");
  const [alertPlayerNameError, setAlertPlayerNameError] = useState(false);

  const [gameName, setGameName] = useState("");
  const [alertGameNameError, setAlertGameNameError] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  let gameDetails = {
    gameName: gameName,
    totalRounds: 1,
    totalPlayers: players,
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-open')
    }
    if (!isModalOpen) {
      document.body.classList.remove('modal-open')
    }
  });

  function handleGameNameChange(event) {
    if (alertGameNameError) {
      setAlertGameNameError(false);
    }
    setGameName(event.target.value);
  }
  function handlePlayerNameChange(event) {
    if (alertPlayerNameError) {
      setAlertPlayerNameError(false);
    }
    setPlayerName(event.target.value);
  }

  function addPlayer(event) {
    if (playerName == "") {
      setAlertPlayerNameError(true);
    } else {
      let newPlayer = {
        name: playerName,
        scores: [],
      };
      setPlayers([...players, newPlayer]);
      console.log(players);
      setPlayerName("");
    }
  }

  function removePlayer(index) {
    setPlayers(players.filter((_, i) => i !== index));
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="flex flex-col m-2 h-screen text-lg">
      <div className="self-center p-4 text-2xl">Game Setup</div>
      <div className="flex flex-col h-28 p-4">
        <div className="py-2">Enter Game Name:</div>
        <input
          type="text"
          id="game-name"
          name="game-name"
          value={gameName}
          onChange={handleGameNameChange}
          className="bg-gray-200 border-2 border-solid rounded-lg border-violet-600 p-2 text-black"
          placeholder="Game Name"
        />
        {alertGameNameError && (
          <div className="text-red-500">Game name cannot be blank</div>
        )}
      </div>
      <button
        className="bg-violet-600 self-center font-bold rounded-lg w-36 p-2 mt-4"
        onClick={addPlayer}
      >
        Submit
      </button>
      <div className="flex flex-col h-28 p-4">
        <div className="py-2">Enter Player Name:</div>
        <input
          type="text"
          id="player-name"
          name="player-name"
          value={playerName}
          onChange={handlePlayerNameChange}
          className="bg-gray-200 border-2 border-solid rounded-lg border-violet-600 p-2 text-black"
          placeholder="Player Name"
        />
        {alertPlayerNameError && (
          <div className="text-red-500">Player name cannot be blank</div>
        )}
      </div>
      <button
        className="bg-violet-600 self-center font-bold rounded-lg w-36 p-2 mt-4"
        onClick={addPlayer}
      >
        Add Player
      </button>

      <div className="flex flex-col p-4">
        {players.length >= 1 && (
          <div className="text-xl font-bold border-b-2 border-violet-500">
            Players:
          </div>
        )}
        {players.map((player, i) => (
          <div
            key={i}
            className="flex flex-row w-full justify-between border-b-2 border-violet-500"
          >
            <div className="flex flex-row justify-between">
              <div className="self-center pr-4">{i + 1} )</div>
              <div className="self-center">{player.name}</div>
            </div>

            <button
              className="p-2 my-2 bg-violet-800 rounded-lg"
              onClick={() => removePlayer(i)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-col mx-auto">
        <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <div>Settings Content</div>
        </Modal>
        <button
          className="font-bold rounded-lg w-36 p-2 mt-4 bg-violet-600"
          onClick={() => setIsModalOpen(true)}
        >
          Settings
        </button>
        <Link to="/scoreboard">
          <button className="font-bold rounded-lg w-36 p-2 mt-4 bg-violet-600 border-2 border-white ">
            Start Game
          </button>
        </Link>
      </div>
    </div>
  );
}
