import React from "react";

function generateGameField(prevGameField, numberOfPaths, step) {
  return prevGameField;
}

class Cell extends React.Component {
  render() {
    const MSize = this.props.MSize;
    const sizeCoef = parseInt(MSize);

    const style = {
      height: `${1 * sizeCoef}rem`,
      width: `${parseInt(this.props.pathSize.width) * sizeCoef}rem`,
    };

    return (
      <div
        className={`cell${this.props.isObstacle ? " cell-obstacle" : ""}`}
        style={style}
      ></div>
    );
  }
}

class Path extends React.Component {
  render() {
    const MSize = this.props.MSize;
    const pathSize = this.props.pathSize;
    const sizeCoef = parseFloat(MSize);

    const style = {
      width: `${parseInt(pathSize.width) * sizeCoef}rem`,
      height: `${parseInt(pathSize.height) * sizeCoef}rem`,
    };

    const cellsInPath = this.props.cellsInPath.map((cellValue, index) => {
      return (
        <Cell
          key={index}
          isObstacle={cellValue}
          pathSize={pathSize}
          MSize={MSize}
        />
      );
    });

    return (
      <div className="path" style={style}>
        {cellsInPath}
      </div>
    );
  }
}

class Runner extends React.Component {
  constructor(props) {
    super(props);
  }

  goRight() {}

  render() {
    const MSize = this.props.MSize;
    const sizeCoef = parseFloat(MSize);
    const runnerSize = {
      width: `1M`,
      height: `1M`,
    };


    const positionLeft = this.props.runnerPosition;

    const style = {
      width: `${parseInt(runnerSize.width) * sizeCoef}rem`,
      height: `${parseInt(runnerSize.height) * sizeCoef}rem`,
      left: `${positionLeft}rem`
    };
    return <div className="runner" style={style}></div>;
  }
}

class GameField extends React.Component {
  render() {
    const MSize = `3rem`;
    const numberOfPaths = 5;
    const pathSize = {
      width: `1M`,
      height: `20M`,
    };
    const step = `5M`;

    //TODO
    let emptyGameField = new Array(numberOfPaths);
    for (let i = 0; i < numberOfPaths; i++) {
      emptyGameField[i] = new Array(parseInt(pathSize.height)).fill(false);
    }

    const gameField = generateGameField(emptyGameField, numberOfPaths, step);
    gameField[0][3] = true;
    gameField[1][13] = true;
    gameField[4][8] = true;

    let paths = [];
    for (let i = 0; i < numberOfPaths; i++) {
      paths.push(
        <Path
          key={i}
          pathSize={pathSize}
          cellsInPath={gameField[i]}
          MSize={MSize}
        />
      );
    }

    return (
      <div className="game-field">
        {paths}
        <Runner MSize={MSize} runnerPosition={this.props.runnerPosition}/>
      </div>
    );
  }
}

export { GameField };
