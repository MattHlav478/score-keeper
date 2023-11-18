import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import ToggleSwitch from "../components/subcomponents/ToggleSwitch";

export default function Setup({
  players,
  setPlayers,
  gameDetails,
  gameName,
  setGameName,
}) {
  const [playerName, setPlayerName] = useState("");

  // Errors
  const [alertPlayerNameError, setAlertPlayerNameError] = useState(false);
  const [alertGameNameError, setAlertGameNameError] = useState(false);
  const [alertRoundSetError, setAlertRoundSetError] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isToggled, setIsToggled] = useState(false);

  const [rounds, setRounds] = useState(0);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("modal-open");
    }
    if (!isModalOpen) {
      document.body.classList.remove("modal-open");
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

  function handleSetRounds(event) {
    if (rounds == 0) {
      return;
    } else {
      setRounds(rounds);
    }
  }

  function handleRoundNumberChange(event) {
    setRounds(event.target.value);
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
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <div className="self-center font-bold pb-4">SETTINGS</div>
        <div className="flex flex-row justify-between">
          <div>
            <div>Specify Number of Rounds</div>
            <div className="text-gray-400">
              Current: {rounds == 0 ? "Unlimited" : rounds}
            </div>
          </div>

          <ToggleSwitch
            isToggled={isToggled}
            onToggle={() => setIsToggled(!isToggled)}
          />
        </div>
        {isToggled && (
          <div className="flex flex-col mx-auto">
            <div className="flex mx-auto">
              <input
                type="number"
                id="number-rounds"
                name="number-rounds"
                // value={rounds}
                onChange={handleRoundNumberChange}
                className="self-center opacity-100 w-10 text-center bg-gray-200 border-2 border-solid rounded-lg border-violet-600 text-black"
                placeholder="#"
              />
              <div className="self-center pl-2">Rounds</div>
            </div>
            <button
              className=" my-2 bg-violet-600 text-white rounded-lg"
              onClick={() => handleSetRounds}
            >
              Set
            </button>
          </div>
        )}
      </Modal>
      <div className="h-full flex flex-col mx-auto">
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
