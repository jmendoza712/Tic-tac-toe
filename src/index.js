import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// React is based on components
// Every custome-made componet class inherits from React.Component class

class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {this.props.value}
      </button>
      // this.props.value is how a prop is called
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    // "value" is what's called a "prop" (property)
    return <Square value={i}/>; // <Square /> refers to the Square class declared above
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
