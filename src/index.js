import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// React is based on components
// Every custome-made componet class inherits from React.Component class

class Square extends React.Component {
  // Constructor is gone since Square no longer keeps track of its own state

  render() {
    return (
      // Function syntax inside onClick is called Arrow Function.
      <button
      className="square"
      onClick={ () => this.props.onClick() } // Will tell Board when Square is clicked. This is an "event listener"
      >
        {this.props.value} {/* Will display the "value" prop passed when Square is rendered */}
      </button>
    );
  }
}

class Board extends React.Component {
  // Equivalent to Ruby's Initialize method. It's used for pre-setting a component "state"
  // This will set the state of the game by telling each Square its own state (null, X or O)
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null)
    }
  }

  // Event handler -> event = click
  // Will update this.state.squares[i] where "i" is the Square that was clicked
  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({ squares: squares });
    // console.log (this.state.squares)
  }

  renderSquare(i) {
    // "value" and "onClick" is what's called a "prop" (property)
    // <Square /> refers to the Square class declared above
    return (
      <Square
        value={ this.state.squares[i] } // Each Square will receive a value prop that will either be 'X', 'O', or null.
        onClick = { () => this.handleClick(i) } // "Event handler". Will allow communication btw Board and Square when Square is clicked
      />
    )
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
