import React, { useState } from "react";

import { Scorekeeper, Setup } from "./screens/index";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [players, setPlayers] = useState([
    {
      name: "Matt",
      scores: [],
    },
    {
      name: "Kailey",
      scores: [],
    },
  ]);

  // const [gameName, setGameName] = useState("");

  const [gameDetails, setGameDetails] = useState({
    gameName: "",
    allPlayers: players,
    totalPlayers: players.length,
    totalRounds: 2,
    currentRound: 1,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Router>
        <Header isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        <Routes>
          <Route
            path="/"
            element={
              <Setup
                players={players}
                setPlayers={setPlayers}
                gameDetails={gameDetails}
                setGameDetails={setGameDetails}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
              />
            }
          />
          <Route
            path="/scoreboard"
            element={
              <Scorekeeper
                players={players}
                setPlayers={setPlayers}
                gameDetails={gameDetails}
                setGameDetails={setGameDetails}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
