import React, { useState } from "react";

import { Scorekeeper, Setup } from "./screens/index";
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

  const [gameName, setGameName] = useState("");

  let gameDetails = {
    gameName: gameName,
    totalRounds: 0,
    totalPlayers: players,
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Setup
                players={players}
                setPlayers={setPlayers}
                gameDetails={gameDetails}
                gameName={gameName}
                setGameName={setGameName}
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
                gameName={gameName}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
