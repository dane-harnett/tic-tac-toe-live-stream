import React from "react";
import { useMachine } from "@xstate/react";
import gameMachine from "./xstate/gameMachine";
import playerMarkers from "./constants/playerMarkers";
import "./App.css";

function App() {
  const [state, send] = useMachine(gameMachine);
  return (
    <div id="game">
      <div id="game-board" className="game-board">
        {state.context.gameBoard.map((row, rowIndex) => {
          return row.map((col, colIndex) => {
            return (
              <div
                id={`cell-${rowIndex}-${colIndex}`}
                className={`cell row${rowIndex} col${colIndex}`}
                data-taken={state.context.gameBoard[rowIndex][colIndex] !== ""}
                onClick={() => send("PLAY", { row: rowIndex, col: colIndex })}
              >
                {state.context.gameBoard[rowIndex][colIndex]}
              </div>
            );
          });
        })}
      </div>
      <div id="player1">
        {state.context.currentPlayer === playerMarkers[0] && "> "}Player 1
      </div>
      <div id="player2">
        {state.context.currentPlayer === playerMarkers[1] && "> "}Player 2
      </div>
    </div>
  );
}

export default App;
