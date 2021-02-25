export function createNewObstacle(
  curentObstacles,
  distancePassedValueInM,
  roadSize
) {
  let obstacle = {};
  // TODO
  if (curentObstacles.length === 0) {
    obstacle.id = 0;
  } else {
    obstacle.id = curentObstacles[curentObstacles.length - 1].id + 1;
  }
  obstacle.size = {
    width: `1M`,
    height: `1M`,
  };
  // TODO
  const [min, max] = [0, parseInt(roadSize.width)];
  obstacle.positionLeft = `${Math.floor(Math.random() * (max - min)) + min}`;
  obstacle.positionFromStart = `${
    distancePassedValueInM + parseInt(roadSize.height)
  }M`;
  return obstacle;
}
