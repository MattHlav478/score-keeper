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
  setGameDetails,
}) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  function closeModal() {
    setIsNavOpen(false);
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
    <div className="sticky top-0 w-full flex items-center justify-between h-16 py-2 px-6 bg-slate-800 border-b-2 border-violet-400">
      <p href="/" className="text-2xl font-bold text-violet-400">
        ScoreKeeper
      </p>
      {isGameInProgress && (
        <div onClick={() => setIsNavOpen(true)}>
          <FontAwesomeIcon
            icon={faEllipsis}
            size="2xl"
            style={{ color: "#a78bfa" }}
          />
        </div>
      )}
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
