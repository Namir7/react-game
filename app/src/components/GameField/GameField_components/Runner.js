import React from "react";

export class Runner extends React.Component {
  constructor(props) {
    super(props);

    this.runner = {
      motionStep: `1M`,
      size: {
        width: `1M`,
        height: `1M`,
      },
    };

    this.state = {
      runnerPositionLeftInM: 1,
    };

    this.handleClickArrowRight = this.handleClickArrowRight.bind(this);
    this.handleClickArrowLeft = this.handleClickArrowLeft.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keydown", (e) => {
      if (e.code === "ArrowRight") this.handleClickArrowRight();
      if (e.code === "ArrowLeft") this.handleClickArrowLeft();
    });
  }

  componentDidUpdate() {
    const runner = document.querySelector("#runner");
    let B1 = {
      xB1: runner.offsetLeft,
      yB1: runner.offsetTop,
    };
    let B2 = {
      xB2:
        runner.offsetLeft +
        parseFloat(this.runner.size.width) * this.props.MScale.scaleValue,
      yB2:
        runner.offsetTop +
        parseFloat(this.runner.size.height) * this.props.MScale.scaleValue,
    };
    console.log(B1, B2);
  }

  handleClickArrowRight() {
    if (this.state.runnerPositionLeftInM >= 6) return;
    this.setState({
      runnerPositionLeftInM:
        this.state.runnerPositionLeftInM + parseFloat(this.runner.motionStep),
    });
  }

  handleClickArrowLeft() {
    if (this.state.runnerPositionLeftInM <= 0) return;
    this.setState({
      runnerPositionLeftInM:
        this.state.runnerPositionLeftInM - parseFloat(this.runner.motionStep),
    });
  }

  render() {
    const MScale = this.props.MScale;
    const runner = this.runner;
    const positionLeftInM = this.state.runnerPositionLeftInM;

    const style = {
      width: `${parseFloat(runner.size.width) * MScale.scaleValue}${
        MScale.scaleUnit
      }`,
      height: `${parseFloat(runner.size.height) * MScale.scaleValue}${
        MScale.scaleUnit
      }`,
      left: `${parseFloat(positionLeftInM) * MScale.scaleValue}${
        MScale.scaleUnit
      }`,
    };

    return <div className="runner" id="runner" style={style}></div>;
  }
}
