import { assign, Machine } from "xstate";

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
          PLAY: {
            actions: "player1Turn",
            target: "player2",
          },
        },
      },
      player2: {
        on: {
          PLAY: {
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
          newGameBoard[event.row][event.col] = "0";
          return newGameBoard;
        },
      }),
      player2Turn: assign({
        gameBoard: (context, event) => {
          const newGameBoard = [...context.gameBoard];
          newGameBoard[event.row][event.col] = "X";
          return newGameBoard;
        },
      }),
    },
  }
);

export default gameMachine;
