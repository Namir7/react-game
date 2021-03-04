import React from "react";

import { LifesIndicator } from "./Game__Components/LifesIndicator.js";
import { ScoreIndicator } from "./Game__Components/ScoreIndicator.js";
import { GamePanel } from "./Game__Components/GamePanel.js";
import { GameField } from "./Game__Components/GameField/GameField2.js";

export class Game extends React.Component {
  constructor() {
    super();

    this.timerId = null;
    this.state = {
      gameState: null,
      // waitToStart, stopped, inProcess,
      distancePassedValueInM: 0,
      lifesNumber: 3,
    };

    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.refreshGame = this.refreshGame.bind(this);
    this.moveGameField = this.moveGameField.bind(this);
    this.deleteLife = this.deleteLife.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.lifesNumber <= 0) {
      this.stopGame();
    }
    // DELETE
    if (this.state.distancePassedValueInM != prevState.distancePassedValueInM) {
    }
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

  moveGameField() {
    let newDistancePassedValueInM = parseFloat(
      (this.state.distancePassedValueInM + parseFloat(`0.5M`)).toFixed(2)
    );
    this.setState({
      distancePassedValueInM: newDistancePassedValueInM,
    });
  }

  deleteLife() {
    this.setState({ lifesNumber: this.state.lifesNumber - 1 });
  }

  render() {
    return (
      <div className="game">
        <GamePanel
          startGame={this.startGame}
          stopGame={this.stopGame}
          refreshGame={this.refreshGame}
          moveGameField={this.moveGameField}
          distancePassedValueInM={this.state.distancePassedValueInM}
        />
        <GameField
          distancePassedValueInM={this.state.distancePassedValueInM}
          deleteLife={this.deleteLife}
        />
        <LifesIndicator lifesNumber={this.state.lifesNumber} />
        <ScoreIndicator
          distancePassedValueInM={this.state.distancePassedValueInM}
        />
      </div>
    );
  }
}
