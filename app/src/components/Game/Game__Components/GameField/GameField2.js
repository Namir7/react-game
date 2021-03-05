import React from "react";

import { Road } from "./GameField__Components/Road/Road2.js";
import { Runner } from "./GameField__Components/Runner2/Runner2.js";

// data
import { initialObstacles } from "./GameField2_Utils/initialObstacles.js";

// functions
//
//      Road: createNewObstacle, moveObstacle, findObstacleIndexById
import { roadHelpfulMethods } from "./GameField2_Utils/GameField_functions.js";
//      Runner: determineNewRunnerPosition
import { runnerHelpfulMethods } from "./GameField2_Utils/GameField_functions.js";
//      Coordinaets: determineCoordinatesInPx
import { coordinatesHelpfulMethods } from "./GameField2_Utils/GameField_functions.js";
//
import { createStyle } from "./GameField2_Utils/GameField_functions.js";

let determineNearestObstacleToRunner =
  coordinatesHelpfulMethods.determineNearestObstacleToRunner;
let determineCoordinates = coordinatesHelpfulMethods.determineCoordinates;
let determineDistance = coordinatesHelpfulMethods.determineDistance;
let isNearestObstacleAndRunnerCollapsed =
  coordinatesHelpfulMethods.isNearestObstacleAndRunnerCollapsed;

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
        widthInM: 7,
        heightInM: 15,
      },
    };

    this.road = {};
    this.runner = {
      motionStepInM: 1,
      size: {
        widthInM: 1,
        heightInM: 1,
      },
    };

    this._runnerCoordinates = {};
    // TODO (this._nearestBlockToRunner)
    this._nearestObstacleToRunner = {
      id: null,
      coordinates: {},
    };

    this.state = {
      runner: {
        position: {
          leftInM: 3,
          bottomInM: 0,
        },
      },

      road: {
        obstacles: initialObstacles,
      },
    };

    // road
    this.moveAllObstaclesAndChangeState = this.moveAllObstaclesAndChangeState.bind(
      this
    );
    this.moveObstacleAndChangeState = this.moveObstacleAndChangeState.bind(
      this
    );
    this.createNewObstacleAndChangeState = this.createNewObstacleAndChangeState.bind(
      this
    );
    this.deleteObstacleAndChangeState = this.deleteObstacleAndChangeState.bind(
      this
    );
    // runner
    this.moveRunnerRightAndChangeState = this.moveRunnerRightAndChangeState.bind(
      this
    );
    this.moveRunnerLeftAndChangeState = this.moveRunnerLeftAndChangeState.bind(
      this
    );
    this.moveRunnerUpAndChangeState = this.moveRunnerUpAndChangeState.bind(
      this
    );
    this.moveRunnerDownAndChangeState = this.moveRunnerDownAndChangeState.bind(
      this
    );
    // coordinates
    this.setCoordinatesToRunner = this.setCoordinatesToRunner.bind(this);
    this.setNearestObstacleToRunner = this.setNearestObstacleToRunner.bind(
      this
    );
  }

  componentDidMount() {
    // set coordinates
    this.setCoordinatesToRunner();
    this.setNearestObstacleToRunner();
  }

  componentDidUpdate(prevProps, prevState) {
    // TODO (fix bag)
    let isRunnerPositionChanged =
      this.state.runner.position != prevState.runner.position;
    let isPassedDistanceChanged =
      this.props.distancePassedValueInM != prevProps.distancePassedValueInM;
    // TODO
    let isOneObstacleDeleted =
      this.state.road.obstacles.length < prevState.road.obstacles.length;
    // TODO (more clear)

    if (isRunnerPositionChanged || isPassedDistanceChanged) {
      // TODO fix bag(if obstacles === [])
      this.setCoordinatesToRunner();
      this.setNearestObstacleToRunner();
      let isCollapsed = isNearestObstacleAndRunnerCollapsed(
        this._nearestObstacleToRunner.coordinates,
        this._runnerCoordinates
      );

      if (isCollapsed) {
        this.props.deleteLife();
        this.deleteObstacleAndChangeState(
          this._nearestObstacleToRunner.id,
          this.state.road.obstacles,
          roadHelpfulMethods.findObstacleIndexById
        );
      }
    }
  }

  //road
  moveAllObstaclesAndChangeState(obstacles, motionStepInM, moveObstacle) {
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

  moveObstacleAndChangeState(
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

  createNewObstacleAndChangeState(obstacles, gameFieldSize, createNewObstacle) {
    let newObstacles = obstacles.slice(0);
    // let newObstacle = createNewObstacle(obstacles, gameFieldSize);
    let newObstacle = createNewObstacle(
      { widthInM: 1, heightInM: 1 },
      { obstacles, gameFieldSize }
    );
    newObstacles.push(newObstacle);
    this.setState({
      road: {
        obstacles: newObstacles,
      },
    });
  }

  deleteObstacleAndChangeState(id, obstacles, findObstacleIndexById) {
    let newObstacles = obstacles.slice(0);
    let indexOfDeletingObstacle = findObstacleIndexById(id, obstacles);
    newObstacles.splice(indexOfDeletingObstacle, 1);
    this.setState({
      road: {
        obstacles: newObstacles,
      },
    });
  }

  // runner
  moveRunnerRightAndChangeState(
    direction,
    runnerNeededInfo,
    gameFieldSize,
    determineNewRunnerPosition
  ) {
    let newRunnerPosition = determineNewRunnerPosition(
      direction,
      runnerNeededInfo,
      gameFieldSize
    );
    this.setState({
      runner: {
        position: newRunnerPosition,
      },
    });
  }

  moveRunnerLeftAndChangeState(
    direction,
    runnerNeededInfo,
    gameFieldSize,
    determineNewRunnerPosition
  ) {
    let newRunnerPosition = determineNewRunnerPosition(
      direction,
      runnerNeededInfo,
      gameFieldSize
    );
    this.setState({
      runner: {
        position: newRunnerPosition,
      },
    });
  }

  moveRunnerUpAndChangeState(
    direction,
    runnerNeededInfo,
    gameFieldSize,
    determineNewRunnerPosition
  ) {
    let newRunnerPosition = determineNewRunnerPosition(
      direction,
      runnerNeededInfo,
      gameFieldSize
    );
    this.setState({
      runner: {
        position: newRunnerPosition,
      },
    });
  }

  moveRunnerDownAndChangeState(
    direction,
    runnerNeededInfo,
    gameFieldSize,
    determineNewRunnerPosition
  ) {
    let newRunnerPosition = determineNewRunnerPosition(
      direction,
      runnerNeededInfo,
      gameFieldSize
    );
    this.setState({
      runner: {
        position: newRunnerPosition,
      },
    });
  }

  // coordinates
  setCoordinatesToRunner() {
    let runnerNeededData = Object.assign({}, this.runner, this.state.runner);
    let MScale = this.MScale;
    let newCoordinates = determineCoordinates(runnerNeededData, MScale);
    this._runnerCoordinates = newCoordinates;
  }

  setNearestObstacleToRunner() {
    let obstacles = this.state.road.obstacles;
    let runner = Object.assign({}, this.runner, this.state.runner);
    let utils = {
      functions: { determineCoordinates, determineDistance },
      MScale: this.MScale,
    };

    let newNearestObstacleToRunner = determineNearestObstacleToRunner(
      obstacles,
      runner,
      utils
    );

    this._nearestObstacleToRunner = newNearestObstacleToRunner;
  }

  render() {
    const style = createStyle(this.gameField.size, null, this.MScale);

    // TODO (one object)
    let propsForRoad = {
      road: Object.assign({}, this.road, this.state.road),

      distancePassedValueInM: this.props.distancePassedValueInM,

      gameFieldMethods: {
        moveAllObstaclesAndChangeState: this.moveAllObstaclesAndChangeState,
        createNewObstacleAndChangeState: this.createNewObstacleAndChangeState,
        deleteObstacleAndChangeState: this.deleteObstacleAndChangeState,
      },

      utils: {
        gameFieldSize: this.gameField.size,
        MScale: this.MScale,
        functions: {
          moveObstacle: roadHelpfulMethods.moveObstacle,
          createNewObstacle: roadHelpfulMethods.createNewObstacle,
          findObstacleIndexById: roadHelpfulMethods.findObstacleIndexById,
        },
      },
    };

    let propsForRunner = {
      // TODO (need to add static and dymanic difference?)
      runner: Object.assign(
        {},
        // static
        this.runner,
        // dynamic
        this.state.runner
      ),

      gameFieldMethods: {
        moveRunnerRightAndChangeState: this.moveRunnerRightAndChangeState,
        moveRunnerLeftAndChangeState: this.moveRunnerLeftAndChangeState,
      },

      utils: {
        runner: this.runner,
        gameField: this.gameField,
        MScale: this.MScale,
        functions: {
          determineNewRunnerPosition:
            runnerHelpfulMethods.determineNewRunnerPosition,
        },
      },
    };

    return (
      <div className="game-field" style={style}>
        <Road
          road={propsForRoad.road}
          gameFieldMethods={propsForRoad.gameFieldMethods}
          utils={propsForRoad.utils}
          distancePassedValueInM={propsForRoad.distancePassedValueInM}
        />

        <Runner
          runner={propsForRunner.runner}
          gameFieldMethods={propsForRunner.gameFieldMethods}
          utils={propsForRunner.utils}
        />
      </div>
    );
  }
}
