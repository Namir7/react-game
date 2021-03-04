import React from "react";

import { Obstacle } from "./Road__Components/Obstacle2/Obstacle2.js";

export class Road extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    let currentPassedDistance = this.props.distancePassedValueInM;
    let previousPassedDistance = prevProps.distancePassedValueInM;

    let isPassedDistanceChanged =
      currentPassedDistance != previousPassedDistance;
    let isPassedDistanceInteger = Number.isInteger(currentPassedDistance);

    if (isPassedDistanceChanged) {
      let motionStepInM = currentPassedDistance - previousPassedDistance;

      this.props.gameFieldMethods.moveAllObstaclesAndChangeState(
        this.props.road.obstacles,
        motionStepInM,
        this.props.utils.functions.moveObstacle
      );
    }

    // TODO async
    if (isPassedDistanceChanged && isPassedDistanceInteger) {
      setTimeout(() => {
        this.props.gameFieldMethods.createNewObstacleAndChangeState(
          this.props.road.obstacles,
          this.props.utils.gameFieldSize,
          this.props.utils.functions.createNewObstacle
        );
      }, 0);
    }
  }

  render() {
    // TODO (make more beautiful)
    let obstacles = this.props.road.obstacles;

    let propsForObstacle = {
      distancePassedValueInM: this.props.distancePassedValueInM,

      gameFieldMethods: {
        deleteObstacleAndChangeState: this.props.gameFieldMethods
          .deleteObstacleAndChangeState,
      },
      utils: {
        obstacles: obstacles,
        MScale: this.props.utils.MScale,
        functions: {
          findObstacleIndexById: this.props.utils.functions
            .findObstacleIndexById,
        },
      },
    };

    // TODO (<ul className="obstacles" > => <li>)
    return (
      <div className="road">
        {obstacles.map((obstacle) => {
          return (
            <Obstacle
              key={obstacle.id}
              obstacle={obstacle}
              gameFieldMethods={propsForObstacle.gameFieldMethods}
              utils={propsForObstacle.utils}
              distancePassedValueInM={propsForObstacle.distancePassedValueInM}
              />
          );
        })}
      </div>
    );
  }
}
