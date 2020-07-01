import { assign, Machine } from "xstate";

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

export default gameMachine;
