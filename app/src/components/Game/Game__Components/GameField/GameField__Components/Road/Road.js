import React from "react";

import { Obstacle } from "./Road__Components/Obstacle.js";

class Road extends React.Component {
  constructor(props) {
    super(props);

    this.road = {
      size: {
        width: `7M`,
        height: `15M`,
      },
    };

    this.style = {
      width: `${
        parseFloat(this.road.size.width) * this.props.MScale.scaleValue
      }${this.props.MScale.scaleUnit}`,
      height: `${
        parseFloat(this.road.size.height) * this.props.MScale.scaleValue
      }${this.props.MScale.scaleUnit}`,
    };
  }

  render() {
    let obstacles = this.props.obstacles.map((obstacle) => {
      return (
        <Obstacle
          key={String(obstacle.id)}
          MScale={this.props.MScale}
          obstacle={obstacle}
        />
      );
    });

    return (
      <div className="road" style={this.style}>
        {obstacles}
      </div>
    );
  }
}

export { Road };
