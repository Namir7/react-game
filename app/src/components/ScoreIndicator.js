import React from "react";

export class ScoreIndicator extends React.Component {
  render() {
    return (
      <div className="score-indicator">
        <p>{parseInt(this.props.distancePassedValueInM)}</p>
      </div>
    );
  }
}
