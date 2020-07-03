import { assign, Machine } from "xstate";
import playerMarkers from "../constants/playerMarkers";

const isWinner = (a, b, c) => a !== "" && a === b && a === c;

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
      checkWinner: ({ gameBoard }) => {
        if (
          // columns
          isWinner(gameBoard[0][0], gameBoard[1][0], gameBoard[2][0]) ||
          isWinner(gameBoard[0][1], gameBoard[1][1], gameBoard[2][1]) ||
          isWinner(gameBoard[0][2], gameBoard[1][2], gameBoard[2][2]) ||
          // rows
          isWinner(gameBoard[0][0], gameBoard[0][1], gameBoard[0][2]) ||
          isWinner(gameBoard[1][0], gameBoard[1][1], gameBoard[1][2]) ||
          isWinner(gameBoard[2][0], gameBoard[2][1], gameBoard[2][2]) ||
          // diagonals
          isWinner(gameBoard[0][0], gameBoard[1][1], gameBoard[2][2]) ||
          isWinner(gameBoard[0][2], gameBoard[1][1], gameBoard[2][0])
        ) {
          return true;
        }
        return false;
      },
      noRemainingValidMoves: ({ gameBoard }) =>
        !gameBoard.some((row) => row.some((cell) => cell === "")),
    },
  }
);

export default gameMachine;
