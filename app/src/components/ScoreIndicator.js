import React from "react";

export class ScoreIndicator extends React.Component {
    render() {
      const value = 0;
      return (
        <div className="score-indicator">
          <p>{value}</p>
        </div>
      );
    }
  }