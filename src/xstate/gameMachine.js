import { assign, Machine } from "xstate";
import playerMarkers from "../constants/playerMarkers";
import ticTacToe from "../games/ticTacToe";

const currentGame = ticTacToe;

const gameMachine = Machine(
  {
    id: "game",
    initial: "ready",
    context: {
      ...currentGame.initialGameState,
    },
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
      START_NEW_GAME: {
        actions: "startNewGame",
        target: "ready",
      },
    },
  },
  {
    actions: {
      startNewGame: assign(currentGame.initialGameState),
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
