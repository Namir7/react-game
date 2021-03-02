import React from "react";

export class Runner extends React.Component {
  componentDidMount() {
    console.log(`Runner mounted`);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props != prevProps) {
      console.log(`Runner props updated`);
    }
    if (this.state != prevState) {
      console.log(`Runner state updated`);
    }
  }

  render() {
    return <div className="runner" id="runner"></div>;
  }
}
