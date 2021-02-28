function determineNearestObstacleToRunner(
  obstacles,
  runnerCoordinatesInPx,
  MScale
) {
  let obstaclesCoordinatesInPxWithId = convertObstaclesToObstaclesCoordinatesInPxWithId(
    obstacles,
    MScale
  );
  let nearest = obstaclesCoordinatesInPxWithId.reduce(
    (
      nearestObstacleCoordinatesInPxWithId,
      currentObstacleCoordinatesInPxWithId
    ) => {
      let nearestObstacleDistance = determineDistanceFromObstacleToRunnerInPx(
        nearestObstacleCoordinatesInPxWithId.coordinatesInPx,
        runnerCoordinatesInPx
      );
      let currentObstacleDistance = determineDistanceFromObstacleToRunnerInPx(
        currentObstacleCoordinatesInPxWithId.coordinatesInPx,
        runnerCoordinatesInPx
      );
      //
      return currentObstacleDistance < nearestObstacleDistance
        ? currentObstacleCoordinatesInPxWithId
        : nearestObstacleCoordinatesInPxWithId;
    }
  );
  return nearest;
}

function determineDistanceFromObstacleToRunnerInPx(
  obstacleCoordinatesInPx,
  runnerCoordinatesInPx
) {
  let A3 = obstacleCoordinatesInPx.A3;
  let B3 = runnerCoordinatesInPx.B3;
  let distance = Math.sqrt(
    Math.pow(A3.xA3 - B3.xB3, 2) + Math.pow(A3.yA3 - B3.yB3, 2)
  );
  return distance;
}

function convertObstaclesToObstaclesCoordinatesInPxWithId(obstacles, MScale) {
  let obstaclesCoordinates = obstacles.map((obstacle) => {
    let id = obstacle.id;
    let coordinatesInPx = determineObstacleCoordinatesInPx(obstacle, MScale);
    return { id, coordinatesInPx };
  });
  return obstaclesCoordinates;
}

function determineObstacleCoordinatesInPx(obstacle, MScale) {
  let obstacleHTML = document.querySelector(`#obstacle-${obstacle.id}`);
  let A1 = {
    xA1: obstacleHTML.offsetLeft,
    yA1: obstacleHTML.offsetTop,
  };
  let A2 = {
    xA2:
      obstacleHTML.offsetLeft +
      parseFloat(obstacle.size.width) * MScale.scaleValue,
    yA2:
      obstacleHTML.offsetTop +
      parseFloat(obstacle.size.height) * MScale.scaleValue,
  };
  let A3 = {
    xA3: A1.xA1 + (A2.xA2 - A1.xA1) / 2,
    yA3: A1.yA1 + (A2.yA2 - A1.yA1) / 2,
  };
  return { A1, A2, A3 };
}

export { determineNearestObstacleToRunner };
