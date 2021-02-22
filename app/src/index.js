import React from "react";
import ReactDOM from "react-dom";
import "./style.css";


import { Game } from "./components/Game.js";
import { Footer } from "./components/Footer.js";

function App() {
  return (
    <div className="app">
      <Game />
      <Footer />
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector(`#root`));
