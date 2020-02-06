import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


  function Square(props) {
    return (
      <button className="square" onClick = {props.handleClick }>
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {

    renderSquare(i) {
      return <Square value = {this.props.squares[i]} handleClick = {() => this.props.setSquare(i)}/>;
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

    constructor(props) {
      super(props);
      this.state = {
        history: [Array(9).fill(null)],
        xIsNext: true
      }
    }

    setSquare(i) {
      let currentStep = this.state.history.length - 1;
      let currentSquares = this.state.history[currentStep];

      if (calculateWinner(currentSquares) || currentSquares[i]) {
        return;
      }

      let newSquares = currentSquares.slice();
      newSquares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({history: this.state.history.concat([newSquares]), xIsNext: !this.state.xIsNext});
    }

    jumpTo(i) {
      let newHistory = this.state.history.slice(0, i+1);
      this.setState({history: newHistory, xIsNext: i%2 == 0});
    }

    render() {
      let currentStep = this.state.history.length - 1;
      let currentSquares = this.state.history[currentStep];

      let status = 'Next player:' + (this.state.xIsNext? 'X' : 'O');
      const winner = calculateWinner(currentSquares);
      if (winner) {
        status = 'Winner: ' + winner;
      }

      const moves = this.state.history.map((step, move) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
        return (
        <li>
          <button onClick = {() => this.jumpTo(move)}>{desc}</button>
        </li>
        );
      })

      return (
        <div className="game">
          <div className="game-board">
            <Board squares = {currentSquares} setSquare = {(i) => this.setSquare(i)}/>
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

  function calculateWinner(squares) {
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  