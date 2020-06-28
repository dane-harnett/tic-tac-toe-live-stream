import React from "react";
import { useMachine } from "@xstate/react";
import { assign, Machine } from "xstate";
import "./App.css";

const gameMachine = Machine({
  id: "game",
  initial: "player1",
  context: {
    gameBoard: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
  },
  states: {
    player1: {
      on: {
        PLAY: {
          actions: assign({
            gameBoard: (context, event) => {
              const newGameBoard = [...context.gameBoard];
              newGameBoard[event.row][event.col] = "0";
              return newGameBoard;
            },
          }),
          target: "player2",
        },
      },
    },
    player2: {
      on: {
        PLAY: {
          actions: assign({
            gameBoard: (context, event) => {
              const newGameBoard = [...context.gameBoard];
              newGameBoard[event.row][event.col] = "X";
              return newGameBoard;
            },
          }),
          target: "player1",
        },
      },
    },
    winner: {},
    tie: {},
  },
});

function App() {
  const [state, send] = useMachine(gameMachine);
  return (
    <div id="game">
      <div id="game-board" className="game-board">
        <div
          id="cell-0-0"
          className="cell row0 col0"
          onClick={() => send("PLAY", { row: 0, col: 0 })}
        >{state.context.gameBoard[0][0]}</div>
        <div
          id="cell-0-1"
          className="cell row0 col1"
          onClick={() => send("PLAY", { row: 0, col: 1 })}
        >
          {state.context.gameBoard[0][1]}
        </div>
        <div
          id="cell-0-2"
          className="cell row0 col2"
          onClick={() => send("PLAY", { row: 0, col: 2 })}
        >
          {state.context.gameBoard[0][2]}
        </div>

        <div
          id="cell-1-0"
          className="cell col0"
          onClick={() => send("PLAY", { row: 1, col: 0 })}
        >
          {state.context.gameBoard[1][0]}
        </div>
        <div
          id="cell-1-1"
          className="cell col1"
          onClick={() => send("PLAY", { row: 1, col: 1 })}
        >
          {state.context.gameBoard[1][1]}
        </div>
        <div
          id="cell-1-2"
          className="cell col2"
          onClick={() => send("PLAY", { row: 1, col: 2 })}
        >
          {state.context.gameBoard[1][2]}
        </div>

        <div
          id="cell-2-0"
          className="cell row2 col0"
          onClick={() => send("PLAY", { row: 2, col: 0 })}
        >
          {state.context.gameBoard[2][0]}
        </div>
        <div
          id="cell-2-1"
          className="cell row2 col1"
          onClick={() => send("PLAY", { row: 2, col: 1 })}
        >
          {state.context.gameBoard[2][1]}
        </div>
        <div
          id="cell-2-2"
          className="cell row2 col2"
          onClick={() => send("PLAY", { row: 2, col: 2 })}
        >
          {state.context.gameBoard[2][2]}
        </div>
      </div>
      <div id="player1">{state.matches("player1") && "> "}Player 1</div>
      <div id="player2">{state.matches("player2") && "> "}Player 2</div>
    </div>
  );
}

export default App;
