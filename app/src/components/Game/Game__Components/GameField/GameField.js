import React from "react";

import { Road } from "./GameField__Components/Road/Road.js";
import { Runner } from "./GameField__Components/Runner.js";

import { determineNearestObstacleToRunner } from "./GameField__Functions/determineNearestObstacleToRunner.js";
import { isRunnerAndNearestObstacleCollapsed } from "./GameField__Functions/isRunnerAndNearestObstacleCollapsed.js";
import { createNewObstacle } from "./GameField__Functions/createNewObstacle.js";

import { obstacles } from "./obstacles.js";

export class GameField extends React.Component {
  constructor(props) {
    super(props);

    this.MScale = {
      // 1 Module = 3 rem
      //ex: 5M = 5*3(rem)
      scaleValue: 48,
      scaleUnit: "px",
    };

    this.road = {
      size: {
        width: `7M`,
        height: `15M`,
      },
    };

    this.state = {
      runner: {
        runnerPositionLeftInM: 1,
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
            // B3 - center point
            xB3: null,
            yB3: null,
          },
        },
      },

      road: {
        obstacles: obstacles,

        nearestObstacleToRunner: {
          id: null,
          coordinatesInPx: {
            A1: {
              xA1: null,
              yA1: null,
            },
            A2: {
              xA1: null,
              yA1: null,
            },
            A3: {
              xA3: null,
              yA3: null,
            },
          },
        },
      },
    };

    this.changeRunnerCoordinates = this.changeRunnerCoordinates.bind(this);
    this.terminatePassedObstacleFromRoad = this.terminatePassedObstacleFromRoad.bind(
      this
    );
    this.moveObstaclesForward = this.moveObstaclesForward.bind(this);
    this.clearPassedObstacles = this.clearPassedObstacles.bind(this);
    this.createNewObstacleAndAdd = this.createNewObstacleAndAdd.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.distancePassedValueInM != prevProps.distancePassedValueInM) {
      let obstacles = this.state.road.obstacles;
      let distanceDifferenceInM =
        this.props.distancePassedValueInM - prevProps.distancePassedValueInM;
      // move
      this.moveObstaclesForward(obstacles, distanceDifferenceInM);
      // delete
      this.clearPassedObstacles(obstacles);
    }
    if (
      Number.isInteger(this.props.distancePassedValueInM) &&
      this.state == prevState
    ) {
      // create
      this.createNewObstacleAndAdd(this.state.road.obstacles);
    }
  }

  createNewObstacleAndAdd(obstacles) {
    let obstaclesWithNewOneObstacle = obstacles;
    obstaclesWithNewOneObstacle.push(
      createNewObstacle(
        obstacles,
        this.props.distancePassedValueInM,
        this.road.size
      )
    );
    this.setState({
      road: {
        obstacles: obstaclesWithNewOneObstacle,
      },
    });
  }

  moveObstaclesForward(obstacles, distanceDifferenceInM) {
    let modifiedObstacles = [...obstacles];
    modifiedObstacles.forEach((obstacle) => {
      const positionBottom = obstacle.positionBottom;
      obstacle.positionBottom = `${
        parseFloat(positionBottom) - distanceDifferenceInM
      }M`;
    });
    this.setState({
      road: {
        obstacles: modifiedObstacles,
      },
    });
  }

  clearPassedObstacles(obstacles) {
    let obstaclesClone = [...obstacles];
    obstaclesClone.forEach((obstacle) => {
      let positionBottomInM = parseFloat(obstacle.positionBottom);
      let heightInM = parseFloat(obstacle.size.height);
      if (positionBottomInM + heightInM <= 0) {
        this.terminatePassedObstacleFromRoad(obstacle.id, obstacles);
      }
    });
  }

  terminatePassedObstacleFromRoad(id, obstacles) {
    let obstaclesWithoutTerminatedObstacle = [...obstacles];
    let indexOfSeekingObstacle = obstaclesWithoutTerminatedObstacle.findIndex(
      (obstacle) => {
        return obstacle.id === id;
      }
    );
    obstaclesWithoutTerminatedObstacle.splice(indexOfSeekingObstacle, 1);
    this.setState({
      road: {
        obstacles: obstaclesWithoutTerminatedObstacle,
      },
    });
  }

  changeRunnerCoordinates(runnerCoordinatesInPx) {
    this.setState({
      runner: {
        coordinatesInPx: runnerCoordinatesInPx,
      },
    });
  }

  render() {
    return (
      <div className="game-field">
        <Road MScale={this.MScale} obstacles={this.state.road.obstacles} />
        <Runner
          MScale={this.MScale}
          changeRunnerCoordinates={this.changeRunnerCoordinates}
        />
      </div>
    );
  }
}
