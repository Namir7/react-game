import React from "react";

export class LifesIndicator extends React.Component {
    render() {
      const numberOfLifes = 3;
      const lifes = [];
      for (let i = 0; i < numberOfLifes; i++) {
        lifes.push(<div key={i} className="life-icon"></div>);
      }
  
      return <div className="lifes-indicator">{lifes}</div>;
    }
  }