import React from "react";

import { Obstacle } from "./Obstacle.js";
import { obstacles } from ".././obstacles.js";
import { createNewObstacle } from ".././createNewObstacle.js";

class Road extends React.Component {
  constructor(props) {
    super(props);

    this.road = {
      moveDistance: `0.1M`,
      size: {
        width: `7M`,
        height: `15M`,
      },
    };

    this.state = {
      obstacles: obstacles,
    };

    this.terminatePassedObstacleFromRoad = this.terminatePassedObstacleFromRoad.bind(
      this
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      Number.isInteger(this.props.distancePassedValueInM) &&
      // TODO
      // wrong condition value
      this.props.distancePassedValueInM !== prevProps.distancePassedValueInM
    ) {
      let obstacles = this.state.obstacles;
      obstacles.push(
        createNewObstacle(
          this.state.obstacles,
          this.props.distancePassedValueInM,
          this.road.size
        )
      );
      this.setState(obstacles);
    }
  }

  terminatePassedObstacleFromRoad(id) {
    const obstaclesWithoutTerminatedObstacle = this.state.obstacles;
    const indexOfSeekingObstacle = obstacles.findIndex((obstacle) => {
      return obstacle.id === id;
    });
    obstaclesWithoutTerminatedObstacle.splice(indexOfSeekingObstacle, 1);
    this.setState(obstaclesWithoutTerminatedObstacle);
  }

  render() {
    const style = {
      width: `${
        parseFloat(this.road.size.width) * this.props.MScale.scaleValue
      }${this.props.MScale.scaleUnit}`,
      height: `${
        parseFloat(this.road.size.height) * this.props.MScale.scaleValue
      }${this.props.MScale.scaleUnit}`,
    };

    return (
      <div className="road" style={style}>
        {this.state.obstacles.map((obstacle) => {
          let positionBottom = `${
            parseFloat(obstacle.positionFromStart) -
            this.props.distancePassedValueInM
          }M`;

          obstacle.positionBottom = positionBottom;

          return (
            <Obstacle
              key={String(obstacle.id)}
              MScale={this.props.MScale}
              obstacle={obstacle}
              terminatePassedObstacleFromRoad={
                this.terminatePassedObstacleFromRoad
              }
            />
          );
        })}
      </div>
    );
  }
}

export { Road };
