import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

import Modal from "./Modal";

// import Nav from "./subcomponents/Nav";

export default function Header({
  isGameInProgress,
  setIsGameInProgress,
  players,
  setPlayers,
  gameDetails,
  setGameDetails,
  setAlertGameNameError,
  setAlertPlayerNameError
}) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  function closeModal() {
    setIsNavOpen(false);
  }

  function handleStartGame() {
    if (gameDetails.gameName === "") {
      setAlertGameNameError(true);
    }
    if (players.length === 0) {
      setAlertPlayerNameError(true);
      alert("Must have at least one player");
      return;
    } else {
      // localStorage.setItem("gameDetails", JSON.stringify(gameDetails));
      // localStorage.setItem("players", JSON.stringify(players));
      setIsGameInProgress(true);
      localStorage.setItem(
        "isGameInProgress",
        JSON.stringify(isGameInProgress)
      );
    }
  }

  function handleNewGame() {
    return new Promise((resolve, reject) => {
      try {
        setIsGameInProgress(false);
        localStorage.setItem("isGameInProgress", JSON.stringify(false));
        localStorage.clear("gameDetails");
        localStorage.clear("players");
        setPlayers([]);
        setGameDetails({
          gameName: "",
          allPlayers: players,
          totalPlayers: players.length,
          totalRounds: 0,
          currentRound: 1,
        });

        closeModal();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  return (
    <div className="sticky top-0 w-full flex items-center justify-between h-16 px-4 bg-slate-800 border-b-2 border-violet-400">
      <p href="/" className="text-2xl font-bold text-violet-400">
        ScoreKeeper
      </p>
      {isGameInProgress ? (
        <div onClick={() => setIsNavOpen(true)}>
          <FontAwesomeIcon
            icon={faEllipsis}
            size="2xl"
            style={{ color: "#a78bfa" }}
          />
        </div>
      ) : (<div className="h-full flex flex-col justify-center">
          <button
            className="font-bold rounded-lg w-36 p-2 bg-violet-200 text-violet-600 border-2 border-solid border-violet-600"
            onClick={handleStartGame}
          >
            Start Game
          </button>
        </div>)}
      <Modal isOpen={isNavOpen} closeModal={closeModal}>
        <div className="flex flex-col mx-auto">
          <div>New Game?</div>
          <div>
            <div>
              <button
                className=" my-2 h-8 w-20 bg-violet-600 text-white rounded-lg"
                onClick={handleNewGame}
              >
                Yes
              </button>
            </div>
            <div>
              <button
                className=" my-2 h-8 w-20 bg-violet-600 text-white rounded-lg"
                onClick={closeModal}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
