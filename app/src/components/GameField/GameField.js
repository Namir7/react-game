import React from "react";

import { Road } from "./GameField_components/Road.js";
import { Runner } from "./GameField_components/Runner.js";

import { determineNearestObstacleToRunner } from "./determineNearestObstacleToRunner.js";

function isRunnerAndNearestObstacleCollpsed(
  runnerCoordinatesInPx,
  nearestObstacleCoordinatesInPx
) {
  let A1 = nearestObstacleCoordinatesInPx.A1;
  let A2 = nearestObstacleCoordinatesInPx.A2;
  let B1 = runnerCoordinatesInPx.B1;
  let B2 = runnerCoordinatesInPx.B2;
  // console.clear();
  // console.log({ A1, A2 }, { B1, B2 });
  // Top left angle
  if (
    B1.xB1 < A2.xA2 &&
    B1.xB1 > A1.xA1 &&
    B1.yB1 <= A2.yA2 &&
    B1.yB1 >= A1.yA1
  ) {
    // console.log(`top left angle collapsed`);
    return true;
  }
  // Top right angle
  if (
    B2.xB2 > A1.xA1 &&
    B2.xB2 < A2.xA2 &&
    B1.yB1 <= A2.yA2 &&
    B1.yB1 >= A1.yA1
  ) {
    // console.log(`top right angle collapsed`);
    return true;
  }
  // Bottom left angle
  if (
    B1.xB1 < A2.xA2 &&
    B1.xB1 > A1.xA1 &&
    B2.yB2 >= A1.yA1 &&
    B2.yB2 <= A2.yA2
  ) {
    // console.log(`bottom left angle collapsed`);
    return true;
  }
  // Bottom left angle
  if (
    B2.xB2 > A1.xA1 &&
    B1.xB1 < A2.xA2 &&
    B2.yB2 >= A1.yA1 &&
    B2.yB2 <= A2.yA2
  ) {
    // console.log(`bottom right angle collapsed`);
    return true;
  }
  return false;
}
class GameField extends React.Component {
  constructor(props) {
    super(props);

    this.MScale = {
      // 1 Module = 3 rem
      //ex: 5M = 5*3(rem)
      scaleValue: 48,
      scaleUnit: "px",
    };

    this.state = {
      runner: {
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

      isRunnerAndNearestObstacleCollapsed: false,
    };

    this.changeRunnerCoordinates = this.changeRunnerCoordinates.bind(this);
    this.runnerAndObstacleCollapsed = this.runnerAndObstacleCollapsed.bind(
      this
    );
    this.setNearestObstacleToRunner = this.setNearestObstacleToRunner.bind(
      this
    );
    this.stopIsObstacleAndRunnerCollapsed = this.stopIsObstacleAndRunnerCollapsed.bind(
      this
    );
  }

  stopIsObstacleAndRunnerCollapsed() {
    this.setState({ isRunnerAndNearestObstacleCollapsed: false });
  }

  setNearestObstacleToRunner(obstacles, runnerCoordinatesInPx, MScale) {
    let id = determineNearestObstacleToRunner(
      obstacles,
      runnerCoordinatesInPx,
      MScale
    ).id;
    let nearestObstaclCoordinatesInPx = determineNearestObstacleToRunner(
      obstacles,
      runnerCoordinatesInPx,
      MScale
    ).coordinatesInPx;

    this.setState({
      road: {
        nearestObstacleToRunner: {
          id,
          coordinatesInPx: nearestObstaclCoordinatesInPx,
        },
      },
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.distancePassedValueInM != prevProps.distancePassedValueInM ||
      this.state.runner.coordinatesInPx != prevState.runner.coordinatesInPx
    ) {
      if (
        isRunnerAndNearestObstacleCollpsed(
          this.state.runner.coordinatesInPx,
          this.state.road.nearestObstacleToRunner.coordinatesInPx
        )
      ) {
        this.setState({ isRunnerAndNearestObstacleCollapsed: true });
        this.runnerAndObstacleCollapsed();
        this.props.deleteLife();
      }
    }
  }

  changeRunnerCoordinates(runnerCoordinatesInPx) {
    this.setState({
      runner: {
        coordinatesInPx: runnerCoordinatesInPx,
      },
    });
  }

  runnerAndObstacleCollapsed() {
    console.log(`collapse`);
  }

  render() {
    return (
      <div className="game-field">
        <Road
          MScale={this.MScale}
          distancePassedValueInM={this.props.distancePassedValueInM}
          isRunnerAndNearestObstacleCollapsed={
            this.state.isRunnerAndNearestObstacleCollapsed
          }
          setNearestObstacleToRunner={this.setNearestObstacleToRunner}
          stopIsObstacleAndRunnerCollapsed={
            this.stopIsObstacleAndRunnerCollapsed
          }
          nearestObstacleToRunner={this.state.road.nearestObstacleToRunner}
          runner={this.state.runner}
        />
        <Runner
          MScale={this.MScale}
          changeRunnerCoordinates={this.changeRunnerCoordinates}
        />
      </div>
    );
  }
}

export { GameField };
