import React from "react";

import { GameField } from "./GameField/GameField.js";
import { LifesIndicator } from "./LifesIndicator.js";
import { ScoreIndicator } from "./ScoreIndicator.js";

export class Game extends React.Component {
  constructor() {
    super();

    this.timerId = null;
    this.state = {
      distancePassedValueInM: 0,
    };

    this.handleClickStart = this.handleClickStart.bind(this);
    this.handleClickStop = this.handleClickStop.bind(this);
    this.handleClickRefresh = this.handleClickRefresh.bind(this);
    this.handleClickMove = this.handleClickMove.bind(this);
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
  }

  handleClickStart() {
    this.startGame();
  }

  handleClickStop() {
    this.stopGame();
  }

  handleClickRefresh() {
    this.refreshGame();
  }

  startGame() {
    this.timerId = setInterval(() => {
      let newDistancePassedValueInM = parseFloat(
        (this.state.distancePassedValueInM + parseFloat(`0.01M`)).toFixed(2)
      );
      this.setState({
        distancePassedValueInM: newDistancePassedValueInM,
      });
    }, 1);
  }

  stopGame() {
    clearInterval(this.timerId);
  }

  refreshGame() {
    this.stopGame();
    this.timerId = null;
    this.setState({
      distancePassedValueInM: 0,
    });
  }

  handleClickMove() {
    let newDistancePassedValueInM = parseFloat(
      (this.state.distancePassedValueInM + parseFloat(`0.5M`)).toFixed(2)
    );
    this.setState({
      distancePassedValueInM: newDistancePassedValueInM,
    });
  }

  render() {
    return (
      <div className="game">
        <button
          onClick={this.handleClickStart}
          style={{
            position: "absolute",
            top: "3rem",
            left: "3rem",
          }}
        >
          {this.state.distancePassedValueInM === 0 ? "Start" : "Continue"}
        </button>
        <button
          onClick={this.handleClickStop}
          style={{
            position: "absolute",
            top: "3rem",
            left: "8rem",
          }}
        >
          Stop
        </button>
        <button
          onClick={this.handleClickRefresh}
          style={{
            position: "absolute",
            top: "5rem",
            left: "3rem",
          }}
        >
          Refresh
        </button>
        <GameField distancePassedValueInM={this.state.distancePassedValueInM} />
        <LifesIndicator />
        <ScoreIndicator
          distancePassedValueInM={this.state.distancePassedValueInM}
        />
        <button onClick={this.handleClickMove}>move</button>
      </div>
    );
  }
}
