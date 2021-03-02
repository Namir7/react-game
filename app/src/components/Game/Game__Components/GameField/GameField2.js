import React from "react";

// import { Runner } from "./GameField__Components/Runner2.js";
// import { Road } from "./GameField__Components/Road/Road.js";
import { Road } from "./GameField__Components/Road/Road2.js";

import { initialObstacles } from "./initialObstacles.js";

// functions
import { createNewObstacle } from "./GameField__Functions/createNewObstacle.js";
import { moveObstacle } from "./GameField2__Functions/moveObstacle.js";
import { findObstacleIndexById } from "./GameField2__Functions/findObstacleIndexById.js";

// TODO
function determineIsRunnerAndNearestObstacleCollapsed(
  runnerCoordinatesInPx,
  nearestObstacleCoordinatesInPx
) {
  return false;
}

function createStyleObjectWithWidthAndHeight(width, height, MScale) {
  let style = {
    width: `${parseFloat(width) * MScale.scaleValue}${MScale.scaleUnit}`,
    height: `${parseFloat(height) * MScale.scaleValue}${MScale.scaleUnit}`,
  };

  return style;
}

export class GameField extends React.Component {
  constructor(props) {
    super(props);

    // TODO
    this.MScale = {
      // 1 Module = 3 rem
      //ex: 5M = 5*3(rem)
      scaleValue: 48,
      scaleUnit: "px",
    };

    this.gameField = {
      size: {
        width: `7M`,
        height: `15M`,
      },
    };

    this._runnerCoordinatesIxPx = {};
    this._nearestObstacle = {
      id: null,
      coordinatesInPx: {},
    };

    this.state = {
      runner: {
        // TODO
        positionLeftInM: null,
      },

      road: {
        // obstacles: [],
        obstacles: initialObstacles,
      },
    };

    // road
    this.moveAllObstaclesAndSetNewObstaclesState = this.moveAllObstaclesAndSetNewObstaclesState.bind(
      this
    );
    this.moveObstacleAndSetNewObstaclesState = this.moveObstacleAndSetNewObstaclesState.bind(
      this
    );
    this.createNewObstacleAndSetNewObstaclesState = this.createNewObstacleAndSetNewObstaclesState.bind(
      this
    );
    this.deleteObstacleAndSetNewObstaclesState = this.deleteObstacleAndSetNewObstaclesState.bind(
      this
    );
    // runner
  }

  componentDidMount() {
    console.log(`GameField mounted`);
    // set obstacles
    // this.setState({
    //   road: {
    //     obstacles: initialObstacles,
    //   },
    // });
  }

  componentDidUpdate(prevProps, prevState) {
    // if (this.props != prevProps) {
    //   console.log(`GameField props updated`);
    // }
    // if (this.state != prevState) {
    //   console.log(`GameField state updated`);
    // }
    let isRunnerPositionOrPassedDistanceChanged =
      this.state.runner.positionLeftInM != prevState.runner.positionLeftInM ||
      // TODO
      this.props.distancePassedValueInM != prevProps.distancePassedValueInM;
    if (isRunnerPositionOrPassedDistanceChanged) {
      let isRunnerAndNearestObstacleCollapsed = determineIsRunnerAndNearestObstacleCollapsed(
        this._runnerCoordinatesIxPx,
        this._nearestObstacle.coordinatesInPx
      );
      if (isRunnerAndNearestObstacleCollapsed) {
        this.props.deleteLife();
      }
    }
  }

  //road
  moveAllObstaclesAndSetNewObstaclesState(
    obstacles,
    motionStepInM,
    moveObstacle
  ) {
    let newObstacles = obstacles.slice(0);
    newObstacles = newObstacles.map((obstacle) => {
      return moveObstacle(obstacle, motionStepInM);
    });
    this.setState({
      road: {
        obstacles: newObstacles,
      },
    });
  }

  moveObstacleAndSetNewObstaclesState(
    id,
    obstacles,
    motionStepInM,
    findObstacleIndexById,
    moveObstacle
  ) {
    let newObstacles = obstacles.slice(0);
    let indexOfMovingObstalce = findObstacleIndexById(id, obstacles);
    newObstacles[indexOfMovingObstalce] = moveObstacle(
      newObstacles[indexOfMovingObstalce],
      motionStepInM
    );
    this.setState({
      road: {
        obstacles: newObstacles,
      },
    });
  }

  createNewObstacleAndSetNewObstaclesState(
    obstacles,
    gameFieldSizeInM,
    createNewObstacle
  ) {
    let newObstacles = obstacles.slice(0);
    let newObstacle = createNewObstacle(obstacles, gameFieldSizeInM);
    newObstacles.push(newObstacle);
    this.setState({
      road: {
        obstacles: newObstacles,
      },
    });
  }

  deleteObstacleAndSetNewObstaclesState(id, obstacles, findObstacleIndexById) {
    let newObstacles = obstacles.slice(0);
    let indexOfDeletingObstacle = findObstacleIndexById(id, obstacles);
    newObstacles.splice(indexOfDeletingObstacle, 1);
    this.setState({
      road: {
        obstacles: newObstacles,
      },
    });
  }

  render() {
    const style = createStyleObjectWithWidthAndHeight(
      this.gameField.size.width,
      this.gameField.size.height,
      this.MScale
    );

    return (
      <div className="game-field" style={style}>
        <Road
          obstacles={this.state.road.obstacles}
          gameFieldSize={this.gameField.size}
          distancePassedValueInM={this.props.distancePassedValueInM}
          //   methods
          moveAllObstaclesAndSetNewObstaclesState={
            this.moveAllObstaclesAndSetNewObstaclesState
          }
          createNewObstacleAndSetNewObstaclesState={
            this.createNewObstacleAndSetNewObstaclesState
          }
          deleteObstacleAndSetNewObstaclesState={
            this.deleteObstacleAndSetNewObstaclesState
          }
          MScale={this.MScale}
        />
        {/* <Runner /> */}
      </div>
    );
  }
}
