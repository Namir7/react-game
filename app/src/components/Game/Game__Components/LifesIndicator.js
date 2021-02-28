import React from "react";

export class LifesIndicator extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const lifesNumber = this.props.lifesNumber;
    const lifes = [];
    for (let i = 0; i < lifesNumber; i++) {
      lifes.push(<div key={i} className="life-icon"></div>);
    }

    return <div className="lifes-indicator">{lifes}</div>;
  }
}
