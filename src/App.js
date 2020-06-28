import React from "react";
import { useMachine } from "@xstate/react";
import { Machine } from "xstate";
import "./App.css";

const gameMachine = Machine({
  id: "game",
  initial: "player1",
  states: {
    player1: {
      on: {
        PLAY: "player2",
      },
    },
    player2: {
      on: {
        PLAY: "player1",
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
          onClick={() => send("PLAY")}
        ></div>
        <div
          id="cell-0-1"
          className="cell row0 col1"
          onClick={() => send("PLAY")}
        ></div>
        <div
          id="cell-0-2"
          className="cell row0 col2"
          onClick={() => send("PLAY")}
        ></div>

        <div
          id="cell-1-0"
          className="cell col0"
          onClick={() => send("PLAY")}
        ></div>
        <div
          id="cell-1-1"
          className="cell col1"
          onClick={() => send("PLAY")}
        ></div>
        <div
          id="cell-1-2"
          className="cell col2"
          onClick={() => send("PLAY")}
        ></div>

        <div
          id="cell-2-0"
          className="cell row2 col0"
          onClick={() => send("PLAY")}
        ></div>
        <div
          id="cell-2-1"
          className="cell row2 col1"
          onClick={() => send("PLAY")}
        ></div>
        <div
          id="cell-2-2"
          className="cell row2 col2"
          onClick={() => send("PLAY")}
        ></div>
      </div>
      <div id="player1">{state.matches("player1") && "> "}Player 1</div>
      <div id="player2">{state.matches("player2") && "> "}Player 2</div>
    </div>
  );
}

export default App;
