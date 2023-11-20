import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

export default function Setup({
  players,
  setPlayers,
  gameDetails,
  setGameDetails,
  isModalOpen,
  setIsModalOpen,
}) {
  const navigate = useNavigate();

  const [gameName, setGameName] = useState("");
  const [playerName, setPlayerName] = useState("");

  // Errors
  const [alertPlayerNameError, setAlertPlayerNameError] = useState(false);
  const [alertGameNameError, setAlertGameNameError] = useState(false);
  const [alertRoundSetError, setAlertRoundSetError] = useState(false);

  const roundsInputRef = useRef();
  const gameNameInputRef = useRef();

  useEffect(() => {
    localStorage.clear();
    setGameDetails({
      gameName: "",
      allPlayers: players,
      totalPlayers: players.length,
      totalRounds: 0,
      currentRound: 1,
    });
  }, []);

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
    setGameDetails((prevDetails) => ({
      ...prevDetails,
      gameDetails: event.target.value,
    }));
  }

  function handleSubmitGameName() {
    let gameNameValue = gameNameInputRef.current.value;
    if (gameNameValue === "") {
      setAlertGameNameError(true);
    } else {
      setGameDetails((prevDetails) => ({
        ...prevDetails,
        gameName: gameNameValue,
      }));
      setGameName("");
    }
  }

  function handlePlayerNameChange(event) {
    if (alertPlayerNameError) {
      setAlertPlayerNameError(false);
    }
    setPlayerName(event.target.value);
    console.log(event.target.value);
  }

  function addPlayer(event) {
    if (playerName === "") {
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

  function handleSetRounds() {
    const roundsValue = Number(roundsInputRef.current.value);
    if (roundsValue === 0) {
      return;
    } else {
      setGameDetails((prevDetails) => ({
        ...prevDetails,
        totalRounds: roundsValue,
      }));
      closeModal();
    }
  }

  function handleStartGame() {
    if (gameDetails.gameName === "") {
      setAlertGameNameError(true);
    }
    if (players.length === 0) {
      setAlertPlayerNameError(true);
    }
    if (gameDetails.totalRounds === 0) {
      setAlertRoundSetError(true);
    } else {
      // localStorage.setItem("gameDetails", JSON.stringify(gameDetails));
      // localStorage.setItem("players", JSON.stringify(players));
      navigate("/scoreboard");
    }
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="flex flex-col m-2 h-screen text-lg">
      <div className="flex flex-col h-28 p-4">
        <div className="py-2">Enter Game Name:</div>
        <input
          type="text"
          id="game-name"
          name="game-name"
          ref={gameNameInputRef}
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
        onClick={handleSubmitGameName}
        className="bg-violet-600 self-center font-bold rounded-lg w-36 p-2 mt-4"
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
        <div className="self-center p-4 text-2xl font-bold">GAME DETAILS</div>
        <div className="text-xl pb-2">
          Game:{" "}
          <span className="font-bold">
            {gameDetails.gameName === "" ? "Untitled" : gameDetails.gameName}
          </span>
        </div>
        <div className="text-xl pb-2">
          # of Rounds:{" "}
          <span className="font-bold">
            {gameDetails.totalRounds === 0
              ? "Unlimited"
              : gameDetails.totalRounds}
          </span>
          <span className="pl-4">
            <button
              className="bg-violet-600 self-center font-bold w-20 rounded-lg"
              onClick={() => setIsModalOpen(true)}
            >
              Edit
            </button>
          </span>
        </div>
        {players.length >= 1 && (
          <div className="text-xl border-b-2 border-violet-500">Players:</div>
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
        <div className="flex flex-col mx-auto">
          <div>Specify Number of Rounds</div>

          <div className="flex mx-auto">
            <input
              type="number"
              inputMode="numeric"
              id="number-rounds"
              name="number-rounds"
              ref={roundsInputRef}
              className="self-center opacity-100 w-10 text-center bg-gray-200 border-2 border-solid rounded-lg border-violet-600 text-black"
              placeholder="#"
            />
            <div className="pl-4">
              <button
                className=" my-2 h-8 w-20 bg-violet-600 text-white rounded-lg"
                onClick={handleSetRounds}
              >
                Set
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <div className="h-full flex flex-col mx-auto pb-20">
        <Link to="/scoreboard">
          <button
            className="font-bold rounded-lg w-36 p-2 mt-4 bg-violet-200 text-violet-600 border-2 border-solid border-violet-600"
            onClick={handleStartGame}
          >
            Start Game
          </button>
        </Link>
      </div>
    </div>
  );
}
