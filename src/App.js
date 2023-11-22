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
    }
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGameInProgress, setIsGameInProgress] = useState(false);

  useEffect(() => {
    let gameProgress = localStorage.getItem("isGameInProgress");
    if (gameProgress === "true") {
      setIsGameInProgress(true);
    }
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
        setGameDetails={setGameDetails}
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
