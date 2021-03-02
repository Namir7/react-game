import React from "react";

// import { Obstacle } from "./Road__Components/Obstacle.js";
import { Obstacle } from "./Road__Components/Obstacle2.js";

// TODO (bring helpful method with props.utils)
import { moveObstacle } from "../../GameField2__Functions/moveObstacle.js";
import { createNewObstacle } from "../../GameField__Functions/createNewObstacle.js";

function convertObstaclesToObstaclesInComponentForm(
  obstacles,
  deleteObstacleAndSetNewObstaclesState,
  MScale
) {
  let obstaclesInComponentForm = obstacles.map((obstacle) => {
    let utilsForObstacle = {
      obstacles: obstacles,
    };

    return (
      <Obstacle
        key={obstacle.id}
        obstacle={obstacle}
        deleteObstacleAndSetNewObstaclesState={
          deleteObstacleAndSetNewObstaclesState
        }
        //utils
        utils={utilsForObstacle}
        MScale={MScale}
      />
    );
  });

  return obstaclesInComponentForm;
}

export class Road extends React.Component {
  componentDidMount() {
    console.log(`Road mounted`);
  }

  componentDidUpdate(prevProps, prevState) {
    // if (this.props != prevProps) {
    //   console.log(`Road props updated`);
    //   // console.log(this.props);
    //   // console.log(prevProps);
    // }
    // if (this.state != prevState) {
    //   console.log(`Road state updated`);
    // }
    //
    let isDistancePassedValueChanged =
      this.props.distancePassedValueInM != prevProps.distancePassedValueInM;
    let isDistancePassedValueInterger = Number.isInteger(
      this.props.distancePassedValueInM
    );

    if (isDistancePassedValueChanged) {
      let motionStepInM =
        this.props.distancePassedValueInM - prevProps.distancePassedValueInM;

      this.props.moveAllObstaclesAndSetNewObstaclesState(
        // move all obstacles and change GameField State
        this.props.obstacles,
        motionStepInM,
        moveObstacle
      );
    }

    if (isDistancePassedValueChanged && isDistancePassedValueInterger) {
      this.props.createNewObstacleAndSetNewObstaclesState(
        //   create new obstacle and change GameField State
        this.props.obstacles,
        this.props.gameFieldSize,
        createNewObstacle
      );
    }
  }

  render() {
    let obstaclesInComponentForm = convertObstaclesToObstaclesInComponentForm(
      this.props.obstacles,
      this.props.deleteObstacleAndSetNewObstaclesState,
      this.props.MScale
    );
    // TODO (<ul className="obstacles" > => <li>)
    return <div className="road">{obstaclesInComponentForm}</div>;
  }
}
