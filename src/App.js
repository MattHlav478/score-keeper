import "./App.css";
import React, { useState } from "react";

import { Scorekeeper, Setup } from "./screens/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [players, setPlayers] = useState([{
    name: "Matt",
    scores: [],
  },{
    name: "Kailey",
    scores: [],
  }]);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Setup players={players} setPlayers={setPlayers} />}
          />
          <Route
            path="/scoreboard"
            element={<Scorekeeper players={players} setPlayers={setPlayers} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
