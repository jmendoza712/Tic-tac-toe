import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// React is based on components
// Every custome-made componet class inherits from React.Component class

// Square is only responsible for displaying the state stablished by Board.
// Function components are a simpler way to write components that only contain a render method and don’t have their own state.
function Square(props) {
  return (
    <button
      className="square"
      onClick={ props.onClick } // Will tell Board when Square is clicked. This is an "event listener"
      >
        {props.value} {/* Will display the "value" prop passed when Square is rendered */}
    </button>
  );
}

// Board handles the state of each Square in order to determine a winner.
class Board extends React.Component {
  renderSquare(i) {
    // "value" and "onClick" is what's called a "prop" (property)
    // <Square /> refers to the Square component declared above
    return (
      <Square
        value={ this.props.squares[i] } // Each Square will receive a value prop that will either be 'X', 'O', or null.
        onClick = { () => this.props.onClick(i) } // "Event handler". Will allow communication btw Board and Square when Square is clicked
      />
    )
  }

  render() {
    return (
      <div>
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
  // This will record every move done of the game.
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
        xIsNext: true, // Flag to determine which player goes next
        stepNumber: 0, // To indicate which step is being displayed
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1); // This fetches the game's records
    const current = history[history.length - 1]; // This gets the current state of the game
    const squares = current.squares.slice()


    // Will ignore re-clicking or stop the game
    if (calculateWinner(squares) || squares[i]) {
      return
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      // #concat() is a immutable version of #push()
      history: history.concat([{
        squares: squares,
      }]), // Updates the record of current state of the game
      xIsNext: !this.state.xIsNext, // Change the flag's value
      stepNumber: history.length,
    });
  }

  jumpTo(step) {
    this.setState ({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    // console.log(this.state.history)

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={ move }>
          <button onClick={ () => this.jumpTo(move) }>{ desc }</button>
        </li>
      )
    })


    // Display player's turn or winner
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={ current.squares }
            onClick={ (i) => this.handleClick(i) }/>
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) {
  // All possible winning combinations
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if ( squares[a] && squares[a] === squares[b] && squares[a] === squares[c] ) {
      return squares[a];
    }
  }
  return null; // If there's no winner
}
