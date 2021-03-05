export const roadHelpfulMethods = {
  createNewObstacle(size, otherNeededInfo) {
    let obstacle = {};

    let obstacles = otherNeededInfo.obstacles;
    let gameFieldSize = otherNeededInfo.gameFieldSize;

    obstacle.id = determineId(obstacles);
    obstacle.size = size;
    obstacle.position = determinePosition(gameFieldSize);

    return obstacle;

    function determineId(obstacles) {
      if (obstacles.length === 0) {
        return 0;
      } else {
        return obstacles[obstacles.length - 1].id + 1;
      }
    }

    function determinePosition(gameFieldSize) {
      let position = {};

      const [minPositionLeftInM, maxPositionLeftInM] = [
        0,
        gameFieldSize.widthInM,
      ];

      position.leftInM =
        Math.floor(Math.random() * (maxPositionLeftInM - minPositionLeftInM)) +
        minPositionLeftInM;
      position.bottomInM = gameFieldSize.heightInM;

      return position;
    }
  },

  moveObstacle(obstacle, motionStepInM) {
    let newObstacle = Object.assign({}, obstacle);
    newObstacle.position.bottomInM =
      obstacle.position.bottomInM - motionStepInM;
    return newObstacle;
  },

  findObstacleIndexById(id, obstacles) {
    let index = obstacles.findIndex((obstacle) => {
      return obstacle.id === id;
    });
    return index;
  },
};

export const runnerHelpfulMethods = {
  determineNewRunnerPosition(direction, runnerNeededInfo, gameFieldSize) {
    if (
      !(
        direction === "right" ||
        direction === "left" ||
        direction === "up" ||
        direction === "down"
      )
    )
      return new Error(`wrong direction`);

    let newRunnerPosition;
    let isGameFieldOver;
    //
    let runnerPosition = runnerNeededInfo.position;
    let runnerMotionStepInM = runnerNeededInfo.motionStepInM;
    let runnerSize = runnerNeededInfo.size;

    if (direction === "right") {
      isGameFieldOver =
        gameFieldSize.widthInM <
        runnerPosition.leftInM + runnerSize.widthInM + runnerMotionStepInM;
      newRunnerPosition = {
        leftInM: runnerPosition.leftInM + runnerMotionStepInM,
        bottomInM: runnerPosition.bottomInM,
      };
    }

    if (direction === "left") {
      isGameFieldOver = 0 > runnerPosition.leftInM - runnerMotionStepInM;
      newRunnerPosition = {
        leftInM: runnerPosition.leftInM - runnerMotionStepInM,
        bottomInM: runnerPosition.bottomInM,
      };
    }

    if (direction === "up") {
      isGameFieldOver =
        gameFieldSize.heightInM <
        runnerPosition.bottomInM + runnerSize.heightInM + runnerMotionStepInM;
      newRunnerPosition = {
        leftInM: runnerPosition.leftInM,
        bottomInM: runnerPosition.bottomInM + runnerMotionStepInM,
      };
    }

    if (direction === "down") {
      isGameFieldOver = 0 > runnerPosition.bottomInM - runnerMotionStepInM;
      newRunnerPosition = {
        leftInM: runnerPosition.leftInM,
        bottomInM: runnerPosition.bottomInM - runnerMotionStepInM,
      };
    }

    return isGameFieldOver ? runnerPosition : newRunnerPosition;
  },
};

export const coordinatesHelpfulMethods = {
  determineCoordinates(
    element,
    // element.props = [position, size]
    MScale
  ) {
    let positionLeftInM = element.position.leftInM;
    let positionBottomInM = element.position.bottomInM;
    let widthInM = element.size.widthInM;
    let heightInM = element.size.heightInM;

    // px
    let positionLeftInPx = positionLeftInM * MScale.scaleValue;
    let positionBottomInPx = positionBottomInM * MScale.scaleValue;
    let widthInPx = widthInM * MScale.scaleValue;
    let heightInPx = heightInM * MScale.scaleValue;

    let coordinates;

    let topLeftCornerPoint = {
      x: positionLeftInPx,
      y: positionBottomInPx + heightInPx,
    };

    let bottomRightCornerPoint = {
      x: positionLeftInPx + widthInPx,
      y: positionBottomInPx,
    };

    let centerPoint = {
      x:
        topLeftCornerPoint.x +
        (bottomRightCornerPoint.x - topLeftCornerPoint.x) / 2,
      y:
        topLeftCornerPoint.y +
        (bottomRightCornerPoint.y - topLeftCornerPoint.y) / 2,
    };

    coordinates = { topLeftCornerPoint, bottomRightCornerPoint, centerPoint };

    return coordinates;
  },

  determineDistance(point1, point2) {
    return Math.sqrt(
      Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
    );
  },

  determineNearestObstacleToRunner(obstacles, runner, utils) {
    // TODO fix
    if (obstacles.length === 0) return null;

    // utils.props = [functions:{determineDistance, determineCoordinates}, MScale]
    let runnerCoordiantes = utils.functions.determineCoordinates(
      runner,
      utils.MScale
    );

    let obstaclesCoordinatesWithId = obstacles.map((obstacle) => {
      return convertObstacleToObstacleCoordiantesWithId(
        obstacle,
        utils.MScale,
        utils.functions.determineCoordinates
      );
    });

    return obstaclesCoordinatesWithId.reduce((current, nearest) => {
      let currentDistance = utils.functions.determineDistance(
        // TODO (make pure?)
        current.coordinates.centerPoint,
        runnerCoordiantes.centerPoint
      );
      let nearestDistance = utils.functions.determineDistance(
        nearest.coordinates.centerPoint,
        runnerCoordiantes.centerPoint
      );
      return currentDistance < nearestDistance ? current : nearest;
    });

    function convertObstacleToObstacleCoordiantesWithId(
      obstacle,
      MScale,
      determineCoordinates
    ) {
      return {
        id: obstacle.id,
        coordinates: determineCoordinates(obstacle, MScale),
      };
    }
  },

  // TODO change elementCoorinates => element
  isNearestObstacleAndRunnerCollapsed(
    nearestObstacleCoordinates,
    runnerCoordinates
  ) {
    let A1 = nearestObstacleCoordinates.topLeftCornerPoint;
    let A2 = nearestObstacleCoordinates.bottomRightCornerPoint;
    let B1 = runnerCoordinates.topLeftCornerPoint;
    let B2 = runnerCoordinates.bottomRightCornerPoint;

    let q = 0.01;

    let horizontalRightCollision = B1.x - A2.x < -q && B1.x - A1.x > 0; //B1.x
    let horizontalLeftCollision = B2.x - A1.x > q && B2.x - A2.x < 0; //B2.x
    let horizontalCenterInnerCollision = B1.x - A1.x >= 0 && B2.x - A2.x <= 0; //B1.x && B2.x
    let horizontalCenterOuterCollision = A1.x - B1.x >= 0 && A2.x - B2.x <= 0; //A1.x && A2.x

    let verticalBottomCollision = B1.y - A2.y > q && B1.y - A1.y < 0; //B1.y
    let verticalTopCollision = B2.y - A1.y < -q && B2.y - A2.y > 0; //B2.y
    let verticalCenterInnerCollision = A1.y - B1.y >= 0 && A2.y - B2.y <= 0; //A1.y && A2.y
    let verticalCenterOuterCollision = B1.y - A1.y >= 0 && B2.y - A2.y <= 0; //B1.y && B2.y

    let verticalCollision =
      verticalBottomCollision ||
      verticalTopCollision ||
      verticalCenterInnerCollision ||
      verticalCenterOuterCollision;

    let horizontalCollision =
      horizontalLeftCollision ||
      horizontalRightCollision ||
      horizontalCenterInnerCollision ||
      horizontalCenterOuterCollision;

    let collision = verticalCollision && horizontalCollision;

    return collision;

    // if (verticalCollision) console.log(`vertical collision`);
    // if (horizontalCollision) console.log(`horizontal collision`);

    // if (verticalCollision && horizontalCollision) return true;

    // {
    // if (B1.x < A2.x && B1.x > A1.x && B1.y > A2.y && B1.y < A1.y) {
    //     // Top left angle
    //     console.log(` top left angle collapsed`);
    //     return true;
    //   }
    // // Top right angle
    // if (B2.x > A1.x && B2.x < A2.x && B1.y > A2.y && B1.y < A1.y) {
    //   console.log(`top right angle collapsed`);
    //   return true;
    // }
    // // Bottom left angle
    // if (B1.x < A2.x && B1.x > A1.x && B2.y < A1.y && B2.y > A2.y) {
    //   console.log(`bottom left angle collapsed`);
    //   return true;
    // }
    // // Bottom left angle
    // if (B2.x > A1.x && B1.x < A2.x && B2.y < A1.y && B2.y > A2.y) {
    //   console.log(`bottom right angle collapsed`);
    //   return true;
    // }
    // return false
    // };
  },
};

export function createStyle(size, position, MScale) {
  let style = {};

  if (size) {
    style.width = `${size.widthInM * MScale.scaleValue}${MScale.scaleUnit}`;
    style.height = `${size.heightInM * MScale.scaleValue}${MScale.scaleUnit}`;
  }

  if (position) {
    style.left = `${position.leftInM * MScale.scaleValue}${MScale.scaleUnit}`;
    style.bottom = `${position.bottomInM * MScale.scaleValue}${
      MScale.scaleUnit
    }`;
  }

  return style;
}

// coordinates
