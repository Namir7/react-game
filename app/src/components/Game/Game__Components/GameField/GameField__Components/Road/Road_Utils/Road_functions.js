// function convertObstaclesToObstaclesInComponentForm(
//   Obstacle,
//   obstacles,
//   deleteObstacleAndSetNewObstaclesState,
//   findObstacleIndexById,
//   MScale
// ) {
//   let obstaclesInComponentForm = obstacles.map((obstacle) => {
//     let gameFieldMethodsForObstacle = {
//       deleteObstacleAndSetNewObstaclesState: deleteObstacleAndSetNewObstaclesState,
//     };

//     let utilsForObstacle = {
//       obstacles: obstacles,
//       MScale: MScale,
//       functions: {
//         findObstacleIndexById: findObstacleIndexById,
//       },
//     };

//     return (
//       <Obstacle
//         key={obstacle.id}
//         obstacle={obstacle}
//         gameFieldMethods={gameFieldMethodsForObstacle}
//         utils={utilsForObstacle}
//       />
//     );
//   });

//   return obstaclesInComponentForm;
// }
