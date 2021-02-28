import React from "react";
import ReactDOM from "react-dom";
import "./style.css";


import { Game } from "./Components/Game/Game.js";
import { Footer } from "./Components/Footer.js";

function App() {
  return (
    <div className="app">
      <Game />
      <Footer />
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector(`#root`));
