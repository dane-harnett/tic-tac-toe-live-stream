import { assign, Machine } from "xstate";
import playerMarkers from "../constants/playerMarkers";
import ticTacToe from "../games/ticTacToe";

const currentGame = ticTacToe;

const gameMachine = Machine(
  {
    id: "game",
    initial: "config",
    context: {},
    states: {
      config: {
        on: {
          START_GAME: {
            actions: "startGame",
            target: "playing",
          },
        },
      },
      playing: {
        initial: "ready",
        states: {
          ready: {
            on: {
              PLAY: [
                {
                  cond: "moveIsValid",
                  actions: "updateBoard",
                  target: "checkEndGame",
                },
              ],
            },
          },
          checkEndGame: {
            on: {
              "": [
                {
                  cond: "checkWinner",
                  target: "winner",
                },
                {
                  cond: "noRemainingValidMoves",
                  target: "tie",
                },
                {
                  actions: "nextPlayer",
                  target: "ready",
                },
              ],
            },
          },
          winner: {},
          tie: {},
        },
        on: {
          PLAY_AGAIN: {
            actions: "playGameAgain",
            target: "playing",
          },
        },
      },
    },
  },
  {
    actions: {
      startGame: assign(currentGame.startGame),
      playGameAgain: assign(currentGame.playGameAgain),
      updateBoard: assign({
        gameBoard: currentGame.updateGameBoard,
      }),
      nextPlayer: assign({
        currentPlayer: ({ currentPlayer }) =>
          currentPlayer === playerMarkers[0]
            ? playerMarkers[1]
            : playerMarkers[0],
      }),
    },
    guards: {
      moveIsValid: ({ gameBoard }, { row, col }) => gameBoard[row][col] === "",
      checkWinner: currentGame.checkWinner,
      noRemainingValidMoves: ({ gameBoard }) =>
        !gameBoard.some((row) => row.some((cell) => cell === "")),
    },
  }
);

export default gameMachine;
