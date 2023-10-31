import "./App.css";
import { Scorekeeper, Setup } from "./screens/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Setup />} />
          <Route path="/scoreboard" element={<Scorekeeper />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
