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

    return isGameFieldOver ? runnerPosition : newRunnerPosition;
  },
};

export const coordinatesHelpfulMethods = {
  determineCoordinatesInPx(
    // TODO (make one measure scale)
    elementPositionInM,
    elementSize,
    MScale
  ) {
    // console.log(elementPositionInM);
    // M
    let positionLeftInM = elementPositionInM.positionLeftInM;
    let positionBottomInM = elementPositionInM.positionBottomInM;
    let widthInM = parseFloat(elementSize.width);
    let heightInM = parseFloat(elementSize.width);

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

  determineNearestObstacleToRunner(obstacles) {},
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
