import React from "react";

export class GamePanel extends React.Component {
  constructor(props) {
    super(props);

    this.handleClickStart = this.handleClickStart.bind(this);
    this.handleClickStop = this.handleClickStop.bind(this);
    this.handleClickRefresh = this.handleClickRefresh.bind(this);
    this.handleClickMoveGameField = this.handleClickMoveGameField.bind(this);
  }

  handleClickStart() {
    this.props.startGame();
  }

  handleClickStop() {
    this.props.stopGame();
  }

  handleClickRefresh() {
    this.props.refreshGame();
  }

  handleClickMoveGameField() {
    this.props.moveGameField();
  }
  render() {
    return (
      <div className="game-panel">
        <button onClick={this.handleClickStart}>
          {this.props.distancePassedValueInM === 0 ? "Start" : "Continue"}
        </button>
        <button onClick={this.handleClickStop}>Stop</button>
        <button onClick={this.handleClickRefresh}>Refresh</button>
        <button onClick={this.handleClickMoveGameField}>Move</button>
      </div>
    );
  }
}
