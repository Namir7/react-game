import React from "react";

import { determineIsObstaclePassedGameField } from "./Obstacle_Utils/Obstacle_functions.js";
import { createStyle } from "./Obstacle_Utils/Obstacle_functions.js";

export class Obstacle extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    let isPassedDistanceChanged =
      this.props.distancePassedValueInM != prevProps.distancePassedValueInM;
    // TODO (think about name)
    let isObstaclePassedGameField = determineIsObstaclePassedGameField(
      this.props.obstacle.size,
      this.props.obstacle.position
    );

    // TODO (Bag:Road repeat two times render())
    // TODO (Bag: don't work with isPassedDistanceChanged && isObstaclePassedGameField)
    if (isObstaclePassedGameField) {
      // console.log(`passed game field`);
      this.props.gameFieldMethods.deleteObstacleAndChangeState(
        this.props.obstacle.id,
        this.props.utils.obstacles,
        this.props.utils.functions.findObstacleIndexById
      );
    }
  }

  render() {
    const style = createStyle(
      this.props.obstacle.size,
      this.props.obstacle.position,
      this.props.utils.MScale
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
