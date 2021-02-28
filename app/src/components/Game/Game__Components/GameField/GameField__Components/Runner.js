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

      coordinatesInPx: {
        // B1 - Top and left angle point
        B1: {
          xB1: null,
          yX1: null,
        },
        // B2 - Bottom and right angle point
        B2: {
          xB2: null,
          yB2: null,
        },
        B3: {
          // B3 - center
          xB3: null,
          yB3: null,
        },
      },
    };

    this.state = {
      runnerPositionLeftInM: 1,
    };

    this.handleClickArrowRight = this.handleClickArrowRight.bind(this);
    this.handleClickArrowLeft = this.handleClickArrowLeft.bind(this);
    this.setRunnerCoordinates = this.setRunnerCoordinates.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keydown", (e) => {
      if (e.code === "ArrowRight") this.handleClickArrowRight();
      if (e.code === "ArrowLeft") this.handleClickArrowLeft();
    });
    this.setRunnerCoordinates();
    this.props.changeRunnerCoordinates(this.runner.coordinatesInPx);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.runnerPositionLeftInM != prevState.runnerPositionLeftInM) {
      // if runnerPositionLeft changed
      this.setRunnerCoordinates();
      this.props.changeRunnerCoordinates(this.runner.coordinatesInPx);
    }
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

  setRunnerCoordinates() {
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
    let B3 = {
      xB3: B1.xB1 + (B2.xB2 - B1.xB1) / 2,
      yB3: B1.yB1 + (B2.yB2 - B1.yB1) / 2,
    };
    this.runner.coordinatesInPx = { B1, B2, B3 };
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
