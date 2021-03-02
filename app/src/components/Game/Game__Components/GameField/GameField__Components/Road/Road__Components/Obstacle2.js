import React from "react";

// TODO (bring helpful method with props.utils)
import { findObstacleIndexById } from "../../../GameField2__Functions/findObstacleIndexById.js";

function determineIsObstaclePassedGameField(
  obstaclePositionBottom,
  obstacleHeight
) {
  let obstaclePositionBottomInM = parseFloat(obstaclePositionBottom);
  let obstacleHeightInPx = parseFloat(obstacleHeight);
  return obstaclePositionBottomInM + obstacleHeightInPx <= 0;
}

function createStyleObjectWithSizeAndPosition(
  width,
  height,
  left,
  bottom,
  MScale
) {
  let style = {
    width: `${parseFloat(width) * MScale.scaleValue}${MScale.scaleUnit}`,
    height: `${parseFloat(height) * MScale.scaleValue}${MScale.scaleUnit}`,
    left: `${parseFloat(left) * MScale.scaleValue}${MScale.scaleUnit}`,
    bottom: `${parseFloat(bottom) * MScale.scaleValue}${MScale.scaleUnit}`,
  };

  return style;
}

export class Obstacle extends React.Component {
  componentDidMount() {
    console.log(`Obstacle mounted`);
  }

  componentDidUpdate(prevProps, prevState) {
    // if (this.props != prevProps) {
    //   console.log(`Obstacle props updated`);
    // }
    // if (this.state != prevState) {
    //   console.log(`Obstacle state updated`);
    // }
    //
    let isObstaclePositionBottomChanged =
      this.props.obstacle.positionBottom != prevProps.obstacle.positionBottom;
    // TODO (think about name)
    let isObstaclePassedGameField = determineIsObstaclePassedGameField(
      this.props.obstacle.positionBottom,
      this.props.obstacle.size.height
    );
    if (isObstaclePositionBottomChanged && isObstaclePassedGameField) {
      this.props.deleteObstacleAndSetNewObstaclesState(
        this.props.obstacle.id,
        this.props.utils.obstacles,
        findObstacleIndexById
      );
    }
  }

  render() {
    const style = createStyleObjectWithSizeAndPosition(
      this.props.obstacle.size.width,
      this.props.obstacle.size.height,
      this.props.obstacle.positionLeft,
      this.props.obstacle.positionBottom,
      this.props.MScale
    );

    return (
      <div
        className="obstacle"
        style={style}
        id={`obstacle-${this.props.obstacle.id}`}
      ></div>
    );
  }
}
