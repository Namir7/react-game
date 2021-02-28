export function isRunnerAndNearestObstacleCollapsed(
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
