import { assign, Machine } from "xstate";
import playerMarkers from "../constants/playerMarkers";

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
              actions: "playerTurn",
              target: "checkWinner",
            },
          ],
        },
      },
      checkWinner: {
        on: {
          "": "ready",
        },
      },
      winner: {},
      tie: {},
    },
  },
  {
    actions: {
      playerTurn: assign({
        gameBoard: ({ gameBoard, currentPlayer }, event) => {
          const newGameBoard = [...gameBoard];
          newGameBoard[event.row][event.col] = currentPlayer;
          return newGameBoard;
        },
        currentPlayer: ({ currentPlayer }) =>
          currentPlayer === playerMarkers[0]
            ? playerMarkers[1]
            : playerMarkers[0],
      }),
    },
    guards: {
      moveIsValid: ({ gameBoard }, { row, col }) => gameBoard[row][col] === "",
    },
  }
);

export default gameMachine;
