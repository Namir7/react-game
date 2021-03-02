export function moveObstacle(obstacle, motionStepInM) {
  let newObstacle = Object.assign({}, obstacle);
  newObstacle.positionBottom = `${
    parseFloat(newObstacle.positionBottom) - motionStepInM
  }M`;
  return newObstacle;
}
