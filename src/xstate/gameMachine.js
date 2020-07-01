import { assign, Machine } from "xstate";
import playerMarkers from "../constants/playerMarkers";

const gameMachine = Machine(
  {
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
          PLAY: [
            {
              cond: "moveIsValid",
              actions: "player1Turn",
              target: "player2",
            },
          ],
        },
      },
      play: {},
      player2: {
        on: {
          PLAY: {
            cond: "moveIsValid",
            actions: "player2Turn",
            target: "player1",
          },
        },
      },
      winner: {},
      tie: {},
    },
  },
  {
    actions: {
      player1Turn: assign({
        gameBoard: (context, event) => {
          const newGameBoard = [...context.gameBoard];
          newGameBoard[event.row][event.col] = playerMarkers[0];
          return newGameBoard;
        },
      }),
      player2Turn: assign({
        gameBoard: (context, event) => {
          const newGameBoard = [...context.gameBoard];
          newGameBoard[event.row][event.col] = playerMarkers[1];
          return newGameBoard;
        },
      }),
    },
    guards: {
      moveIsValid: ({ gameBoard }, { row, col }) => gameBoard[row][col] === "",
    },
  }
);

export default gameMachine;
