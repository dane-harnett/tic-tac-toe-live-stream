import { assign, Machine } from "xstate";
import playerMarkers from "../constants/playerMarkers";
import ticTacToe from "../games/ticTacToe";

const gameMachine = Machine(
  {
    id: "game",
    initial: "ready",
    context: {
      currentPlayer: playerMarkers[0],
      gameBoard: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
    },
    states: {
      ready: {
        on: {
          PLAY: [
            {
              cond: "moveIsValid",
              actions: "updateBoard",
              target: "checkWinner",
            },
          ],
        },
      },
      checkWinner: {
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
  },
  {
    actions: {
      updateBoard: assign({
        gameBoard: ({ gameBoard, currentPlayer }, event) => {
          const newGameBoard = [...gameBoard];
          newGameBoard[event.row][event.col] = currentPlayer;
          return newGameBoard;
        },
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
      checkWinner: ticTacToe,
      noRemainingValidMoves: ({ gameBoard }) =>
        !gameBoard.some((row) => row.some((cell) => cell === "")),
    },
  }
);

export default gameMachine;
