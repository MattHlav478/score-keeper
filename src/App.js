import React, { useState, useEffect } from "react";

import { Scorekeeper, Setup } from "./screens/index";
import Header from "./components/Header";

function App() {
  const [players, setPlayers] = useState([
    // {
    //   name: "Becky",
    //   scores: [],
    // },
    // {
    //   name: "John",
    //   scores: [],
    // },
  ]);

  const [gameDetails, setGameDetails] = useState({
    gameName: "",
    allPlayers: players,
    totalPlayers: players.length,
    totalRounds: 0,
    currentRound: 1,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGameInProgress, setIsGameInProgress] = useState(false);

  // useEffect(() => {
  //   console.log("game details:", gameDetails);
  // }, [gameDetails]);

  return (
    <>
      <Header
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isGameInProgress={isGameInProgress}
        setIsGameInProgress={setIsGameInProgress}
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
      )
      : (
      <Scorekeeper
        players={players}
        setPlayers={setPlayers}
        gameDetails={gameDetails}
        setGameDetails={setGameDetails}
        isGameInProgress={isGameInProgress}
        setIsGameInProgress={setIsGameInProgress}
      />
      )}
    </>
  );
}

export default App;
