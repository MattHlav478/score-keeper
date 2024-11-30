import React, { useState, useEffect } from "react";

import { Scorekeeper, Setup } from "./screens/index";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [players, setPlayers] = useState(
    JSON.parse(localStorage.getItem("players")) || []
  );

  const [gameDetails, setGameDetails] = useState(
    JSON.parse(localStorage.getItem("gameDetails")) || {
      gameName: "",
      allPlayers: players,
      totalPlayers: players.length,
      totalRounds: 0,
      currentRound: 1,
      finalScore: 0,
    }
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGameInProgress, setIsGameInProgress] = useState(false);

  // Errors
  const [alertPlayerNameError, setAlertPlayerNameError] = useState(false);
  const [alertGameNameError, setAlertGameNameError] = useState(false);
  const [alertRoundSetError, setAlertRoundSetError] = useState(false);

  useEffect(() => {
    let gameProgress = localStorage.getItem("isGameInProgress");
    if (gameProgress === "true") {
      setIsGameInProgress(true);
    } else if (gameProgress === "false") {
      setIsGameInProgress(false);
    }
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Optional if you want to skip the scrolling animation
    });
  }, []);

  return (
    <>
      <Header
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isGameInProgress={isGameInProgress}
        setIsGameInProgress={setIsGameInProgress}
        players={players}
        setPlayers={setPlayers}
        gameDetails={gameDetails}
        setGameDetails={setGameDetails}
        alertGameNameError={alertGameNameError}
        setAlertGameNameError={setAlertGameNameError}
        alertPlayerNameError={alertPlayerNameError}
        setAlertPlayerNameError={setAlertPlayerNameError}
      />
      {!isGameInProgress ? (
        <Setup
          players={players}
          setPlayers={setPlayers}
          gameDetails={gameDetails}
          setGameDetails={setGameDetails}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          isGameInProgress={isGameInProgress}
          setIsGameInProgress={setIsGameInProgress}
          alertGameNameError={alertGameNameError}
          setAlertGameNameError={setAlertGameNameError}
          alertPlayerNameError={alertPlayerNameError}
          setAlertPlayerNameError={setAlertPlayerNameError}
        />
      ) : (
        <Scorekeeper
          players={players}
          setPlayers={setPlayers}
          gameDetails={gameDetails}
          setGameDetails={setGameDetails}
          isGameInProgress={isGameInProgress}
          setIsGameInProgress={setIsGameInProgress}
        />
      )}
      <Footer />
    </>
  );
}

export default App;
