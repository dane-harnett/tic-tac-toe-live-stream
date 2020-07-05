import { assign, Machine } from "xstate";

import games from "../games";

const gameMachine = Machine(
  {
    id: "game",
    initial: "config",
    context: {},
    states: {
      config: {
        on: {
          START_GAME: {
            actions: ["setCurrentGame", "startGame"],
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
      setCurrentGame: assign({
        currentGame: (context, event) => games[event.game],
      }),
      startGame: assign((context, event) =>
        games[event.game].startGame(context, event)
      ),
      playGameAgain: assign((context, event) =>
        context.currentGame.playGameAgain(context, event)
      ),
      updateBoard: assign({
        gameBoard: (context, event) =>
          context.currentGame.updateGameBoard(context, event),
      }),
      nextPlayer: assign({
        currentPlayerIndex: ({ currentPlayerIndex, numberOfPlayers }) =>
          currentPlayerIndex === numberOfPlayers - 1
            ? 0
            : currentPlayerIndex + 1,
      }),
    },
    guards: {
      moveIsValid: ({ gameBoard }, { row, col }) => gameBoard[row][col] === "",
      checkWinner: (context, event) =>
        context.currentGame.checkWinner(context, event),
      noRemainingValidMoves: ({ gameBoard }) =>
        !gameBoard.some((row) => row.some((cell) => cell === "")),
    },
  }
);

export default gameMachine;
