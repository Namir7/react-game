import React from "react";

export class Runner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const MScale = this.props.MScale;
    const runner = this.props.runner;
    const positionLeftInM = this.props.runnerPositionLeftInM;

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
