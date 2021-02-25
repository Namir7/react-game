import React from "react";

import { Road } from "./GameField_components/Road.js";
import { Runner } from "./GameField_components/Runner.js";

class GameField extends React.Component {
  constructor(props) {
    super(props);

    this.MScale = {
      // 1 Module = 3 rem
      //ex: 5M = 5*3(rem)
      scaleValue: 48,
      scaleUnit: "px",
    };
  }

  runnerAndObstaclecollapsed(){
    console.log(`collapsed`);
  }

  render() {
    return (
      <div className="game-field">
        <Road
          distancePassedValueInM={this.props.distancePassedValueInM}
          MScale={this.MScale}
        />
        <Runner MScale={this.MScale} />
      </div>
    );
  }
}

export { GameField };
