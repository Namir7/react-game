export function findObstacleIndexById(id, obstacles) {
  let index = obstacles.findIndex((obstacle) => {
    return obstacle.id === id;
  });
  return index;
}
