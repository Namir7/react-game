import React from "react";

export class Obstacle extends React.Component {
  constructor(props) {
    super(props);

    this.obstacle = this.props.obstacle;
  }

  componentDidUpdate() {
    if (
      parseFloat(this.obstacle.positionBottom) +
        parseFloat(this.obstacle.size.height) <=
      0
    ) {
      this.props.terminatePassedObstacleFromRoad(this.obstacle.id);
    }
  }

  render() {
    const MScale = this.props.MScale;

    const style = {
      width: `${parseFloat(this.obstacle.size.width) * MScale.scaleValue}${
        MScale.scaleUnit
      }`,
      height: `${parseFloat(this.obstacle.size.height) * MScale.scaleValue}${
        MScale.scaleUnit
      }`,
      left: `${parseFloat(this.obstacle.positionLeft) * MScale.scaleValue}${
        MScale.scaleUnit
      }`,
      bottom: `${parseFloat(this.obstacle.positionBottom) * MScale.scaleValue}${
        MScale.scaleUnit
      }`,
    };

    return <div className="obstacle" style={style}></div>;
  }
}
