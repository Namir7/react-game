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

    // road
    this.changeRunnerCoordinates = this.changeRunnerCoordinates.bind(this);
    this.terminatePassedObstacleFromRoad = this.terminatePassedObstacleFromRoad.bind(
      this
    );
    this.moveObstaclesForward = this.moveObstaclesForward.bind(this);
    this.clearPassedObstacles = this.clearPassedObstacles.bind(this);
    this.createNewObstacleAndAdd = this.createNewObstacleAndAdd.bind(this);
    // runner
    this.handleClickArrowRight = this.handleClickArrowRight.bind(this);
    this.handleClickArrowLeft = this.handleClickArrowLeft.bind(this);
    // this.setRunnerCoordinates = this.setRunnerCoordinates.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keydown", (e) => {
      if (e.code === "ArrowRight") this.handleClickArrowRight();
      if (e.code === "ArrowLeft") this.handleClickArrowLeft();
    });
    // this.setRunnerCoordinates();
    // this.props.changeRunnerCoordinates(this.runner.coordinatesInPx);
  }

  componentDidUpdate(prevProps, prevState) {
    // rodad
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
    // runner
    if (
      this.state.runner.runnerPositionLeftInM !=
      prevState.runner.runnerPositionLeftInM
    ) {
      // if runnerPositionLeft changed
      // this.setRunnerCoordinates();
      // this.props.changeRunnerCoordinates(this.runner.coordinatesInPx);
    }
  }

  // road
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

  // runner
  changeRunnerCoordinates(runnerCoordinatesInPx) {
    this.setState({
      runner: {
        coordinatesInPx: runnerCoordinatesInPx,
      },
    });
  }

  handleClickArrowRight() {
    if (this.state.runner.runnerPositionLeftInM >= 6) return;
    this.setState({
      runner: {
        runnerPositionLeftInM:
          this.state.runner.runnerPositionLeftInM +
          parseFloat(this.runner.motionStep),
      },
    });
  }

  handleClickArrowLeft() {
    if (this.state.runner.runnerPositionLeftInM <= 0) return;
    this.setState({
      runner: {
        runnerPositionLeftInM:
          this.state.runner.runnerPositionLeftInM -
          parseFloat(this.runner.motionStep),
      },
    });
  }

  // setRunnerCoordinates() {
  //   const runner = document.querySelector("#runner");
  //   let B1 = {
  //     xB1: runner.offsetLeft,
  //     yB1: runner.offsetTop,
  //   };
  //   let B2 = {
  //     xB2:
  //       runner.offsetLeft +
  //       parseFloat(this.runner.size.width) * this.props.MScale.scaleValue,
  //     yB2:
  //       runner.offsetTop +
  //       parseFloat(this.runner.size.height) * this.props.MScale.scaleValue,
  //   };
  //   let B3 = {
  //     xB3: B1.xB1 + (B2.xB2 - B1.xB1) / 2,
  //     yB3: B1.yB1 + (B2.yB2 - B1.yB1) / 2,
  //   };
  //   this.runner.coordinatesInPx = { B1, B2, B3 };
  // }

  render() {
    return (
      <div className="game-field">
        <Road MScale={this.MScale} obstacles={this.state.road.obstacles} />
        <Runner
          MScale={this.MScale}
          runner={this.runner}
          runnerPositionLeftInM={this.state.runner.runnerPositionLeftInM}
          changeRunnerCoordinates={this.changeRunnerCoordinates}
        />
      </div>
    );
  }
}
