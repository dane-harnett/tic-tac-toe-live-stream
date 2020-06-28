import React from 'react';
import './App.css';

function App() {
  return (
    <div id="game">
      <div id="game-board" className="game-board">
        <div id="cell-0-0" className="cell row0 col0"></div>
        <div id="cell-0-1" className="cell row0 col1"></div>
        <div id="cell-0-2" className="cell row0 col2"></div>

        <div id="cell-1-0" className="cell col0"></div>
        <div id="cell-1-1" className="cell col1"></div>
        <div id="cell-1-2" className="cell col2"></div>

        <div id="cell-2-0" className="cell row2 col0"></div>
        <div id="cell-2-1" className="cell row2 col1"></div>
        <div id="cell-2-2" className="cell row2 col2"></div>
      </div>
      <div id="player1">> Player 1</div>
      <div id="player2">Player 2</div>
    </div>
  );
}

export default App;
