import React, { useState } from "react";
import { useMachine } from "@xstate/react";
import gameMachine from "./xstate/gameMachine";
import playerMarkers from "./constants/playerMarkers";
import "./App.css";

function App() {
  const [state, send] = useMachine(gameMachine);
  const [game, setGame] = useState("ticTacToe");
  const [numberOfPlayers, setNumberOfPlayers] = useState(2);
  const [gameBoardSize, setGameBoardSize] = useState([3, 3]);
  const currentPlayers = playerMarkers.slice(0, numberOfPlayers);
  return (
    <div id="app">
      {state.matches("config") && (
        <div id="game-config">
          <label>
            Choose game:
            <select
              onChange={(evt) => {
                setGame(evt.target.value);
              }}
            >
              <option value="ticTacToe">Tic-tac-toe</option>
              <option value="connect4">Connect4</option>
            </select>
          </label>
          <br />
          <label>
            Choose number of players:
            <input
              type="text"
              id="number-of-players"
              onChange={(evt) => {
                setNumberOfPlayers(parseInt(evt.target.value, 10) || "");
              }}
              value={numberOfPlayers}
            />
          </label>
          <br />
          <label>
            Choose game board size:
            <input
              type="text"
              id="game-board-size-width"
              onChange={(evt) =>
                setGameBoardSize([
                  parseInt(evt.target.value, 10) || "",
                  gameBoardSize[1],
                ])
              }
              value={gameBoardSize[0]}
            />
            x
            <input
              type="text"
              id="game-board-size-height"
              onChange={(evt) =>
                setGameBoardSize([
                  gameBoardSize[0],
                  parseInt(evt.target.value, 10) || "",
                ])
              }
              value={gameBoardSize[1]}
            />
          </label>
          <br />
          <button
            id="start-game"
            type="button"
            onClick={() =>
              send("START_GAME", { game, gameBoardSize, numberOfPlayers })
            }
          >
            Start game
          </button>
        </div>
      )}
      {state.matches("playing") && (
        <div id="game">
          <div id="game-board" className="game-board">
            {state.context.gameBoard.map((row, rowIndex) => {
              return row.map((col, colIndex) => {
                return (
                  <div
                    id={`cell-${rowIndex}-${colIndex}`}
                    className={`cell row${rowIndex} col${colIndex}`}
                    data-taken={
                      state.context.gameBoard[rowIndex][colIndex] !== ""
                    }
                    onClick={() =>
                      send("PLAY", { row: rowIndex, col: colIndex })
                    }
                    style={{ flexBasis: `${100 / row.length}%` }}
                  >
                    {state.context.gameBoard[rowIndex][colIndex]}
                  </div>
                );
              });
            })}
          </div>
          {currentPlayers.map((player, playerIndex) => {
            return (
              <div id={`player${playerIndex + 1}`}>
                {state.context.currentPlayerIndex === playerIndex && "> "}
                Player {playerIndex + 1}
              </div>
            );
          })}
          {state.matches("playing.winner") && (
            <div id="winner">
              {playerMarkers[state.context.currentPlayerIndex]} has won the game
            </div>
          )}
          {state.matches("playing.tie") && (
            <div id="tie">The game has ended in a tie</div>
          )}
          <button
            id="play-again"
            type="button"
            onClick={() => send("PLAY_AGAIN")}
          >
            Play again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
