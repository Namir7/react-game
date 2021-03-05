import React from "react";

import { createStyle } from "./Runner_Utils/Runner_functions.js";

export class Runner extends React.Component {
  constructor(props) {
    super(props);

    this.handleClickArrowRight = this.handleClickArrowRight.bind(this);
    this.handleClickArrowLeft = this.handleClickArrowLeft.bind(this);
    this.handleClickArrowUp = this.handleClickArrowUp.bind(this);
    this.handleClickArrowDown = this.handleClickArrowDown.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keydown", (e) => {
      if (e.code === "ArrowRight") this.handleClickArrowRight();
      if (e.code === "ArrowLeft") this.handleClickArrowLeft();
      if (e.code === "ArrowUp") this.handleClickArrowUp();
      if (e.code === "ArrowDown") this.handleClickArrowDown();
    });
  }

  handleClickArrowRight() {
    this.props.gameFieldMethods.moveRunnerRightAndChangeState(
      "right",
      {
        position: this.props.runner.position,
        size: this.props.runner.size,
        motionStepInM: this.props.runner.motionStepInM,
      },
      this.props.utils.gameField.size,
      this.props.utils.functions.determineNewRunnerPosition
    );
  }

  handleClickArrowLeft() {
    this.props.gameFieldMethods.moveRunnerRightAndChangeState(
      "left",
      {
        position: this.props.runner.position,
        size: this.props.runner.size,
        motionStepInM: this.props.runner.motionStepInM,
      },
      this.props.utils.gameField.size,
      this.props.utils.functions.determineNewRunnerPosition
    );
  }

  handleClickArrowUp() {
    this.props.gameFieldMethods.moveRunnerRightAndChangeState(
      "up",
      {
        position: this.props.runner.position,
        size: this.props.runner.size,
        motionStepInM: this.props.runner.motionStepInM,
      },
      this.props.utils.gameField.size,
      this.props.utils.functions.determineNewRunnerPosition
    );
  }

  handleClickArrowDown() {
    this.props.gameFieldMethods.moveRunnerRightAndChangeState(
      "down",
      {
        position: this.props.runner.position,
        size: this.props.runner.size,
        motionStepInM: this.props.runner.motionStepInM,
      },
      this.props.utils.gameField.size,
      this.props.utils.functions.determineNewRunnerPosition
    );
  }

  render() {
    let style = createStyle(
      this.props.runner.size,
      this.props.runner.position,
      this.props.utils.MScale
    );
    return <div className="runner" id="runner" style={style}></div>;
  }
}
