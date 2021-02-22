import React from "react";

import { GameField } from "./GameField.js";
import { LifesIndicator } from "./LifesIndicator.js";
import { ScoreIndicator } from "./ScoreIndicator.js";

export class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      runnerPosition: 0,
    };

    // const MSize = `3rem`;
    // const sizeCoef = parseFloat(MSize);
    // const motionStep = `0.1M`;

    this.motionStep = `0.1M`;

    this.handleClickStart = this.handleClickStart.bind(this);
    this.handleClickRight = this.handleClickRight.bind(this);
    this.handleClickLeft = this.handleClickLeft.bind(this);
  }

  handleClickStart() {
    console.log("start game");
  }

  handleClickRight() {
    this.setState({
      runnerPosition: this.state.runnerPosition + parseFloat(this.motionStep),
    });
  }

  handleClickLeft() {
    this.setState({
      runnerPosition: this.state.runnerPosition - parseFloat(this.motionStep),
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
          Start
        </button>
        {/* TODO */}
        <div className="motion-buttons">
          <button className="motion-left" onClick={this.handleClickLeft}>
            {"<-"}
          </button>
          <button className="motion-right" onClick={this.handleClickRight}>
            {"->"}
          </button>
        </div>
        <GameField runnerPosition={this.state.runnerPosition} />
        <LifesIndicator />
        <ScoreIndicator />
      </div>
    );
  }
}
