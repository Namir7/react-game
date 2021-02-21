import React from "react";
import ReactDOM from "react-dom";
import "./style.css";

//module M is an unit of size;
//1 module = 3 rem;
const MSize = `3rem`;

function generateGameField(prevGameField, numberOfPaths, step) {
  return prevGameField;
}

class Cell extends React.Component {
  render() {
    const sizeCoef = parseInt(MSize);

    const isObstacle = this.props.isObstacle;
    const style = {
      height: `${1 * sizeCoef}rem`,
      width: `${parseInt(this.props.size.width) * sizeCoef}rem`,
    };

    return (
      <div
        className={`cell${isObstacle ? " cell-obstacle" : ""}`}
        style={style}
      ></div>
    );
  }
}

class Path extends React.Component {
  render() {
    const size = this.props.size;
    const sizeCoef = parseFloat(MSize);

    const style = {
      width: `${parseInt(size.width) * sizeCoef}rem`,
      height: `${parseInt(size.height) * sizeCoef}rem`,
    };

    const cellsInPath = this.props.cellsInPath.map((cellValue, index) => {
      return <Cell key={index} isObstacle={cellValue} size={size} />;
    });

    return (
      <div className="path" style={style}>
        {cellsInPath}
      </div>
    );
  }
}

class GameField extends React.Component {
  render() {
    const numberOfPaths = 5;
    const pathSize = {
      width: `1M`,
      height: `20M`,
    };

    //TODO
    let emptyGameField = new Array(numberOfPaths);
    for (let i = 0; i < numberOfPaths; i++) {
      emptyGameField[i] = new Array(parseInt(pathSize.height)).fill(false);
    }

    const gameField = generateGameField(emptyGameField, numberOfPaths, `5M`);

    let paths = [];
    for (let i = 0; i < numberOfPaths; i++) {
      paths.push(<Path key={i} size={pathSize} cellsInPath={gameField[i]} />);
    }

    return <div className="game-field">{paths}</div>;
  }
}

class LifesIndicator extends React.Component {
  render() {
    const numberOfLifes = 3;
    const lifes = [];
    for (let i = 0; i < numberOfLifes; i++) {
      lifes.push(<div key={i} className="life-icon"></div>);
    }

    return <div className="life-indicator">{lifes}</div>;
  }
}

class ScoreIndicator extends React.Component {
  render() {
    const value = 0;
    return (
      <div className="score-indicator">
        <p>{value}</p>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("start game");
  }

  render() {
    return (
      <div className="game">
        <button
          onClick={this.handleClick}
          style={{
            position: "absolute",
            top: "3rem",
            left: "3rem",
          }}
        >
          Start
        </button>
        <GameField />
        <LifesIndicator />
        <ScoreIndicator />
      </div>
    );
  }
}

function Footer() {
  return <footer className="footer">footer</footer>;
}

function App() {
  return (
    <div className="app">
      <Game />
      <Footer />
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector(`#root`));
