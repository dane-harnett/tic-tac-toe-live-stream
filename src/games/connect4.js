import playerMarkers from "../constants/playerMarkers";

export const startGame = (context, { gameBoardSize, numberOfPlayers }) => {
  return {
    currentPlayerIndex: 0,
    gameBoard: Array.from(new Array(gameBoardSize[1])).fill(
      Array.from(new Array(gameBoardSize[0])).fill("")
    ),
    numberOfPlayers,
  };
};

export const playGameAgain = ({ gameBoard }) => {
  return {
    currentPlayerIndex: 0,
    gameBoard: gameBoard.map((row) => row.map(() => "")),
  };
};

const determinePosition = (gameBoard, col) => {
  for (let rowIndex = gameBoard.length - 1; rowIndex >= 0; rowIndex--) {
    if (gameBoard[rowIndex][col] === "") {
      return {
        row: rowIndex,
        col,
      };
    }
  }
};

export const updateGameBoard = ({ gameBoard, currentPlayerIndex }, event) => {
  const position = determinePosition(gameBoard, event.col);

  return gameBoard.map((row, rowIndex) =>
    position.row === rowIndex
      ? row.map((col, colIndex) =>
          position.col === colIndex ? playerMarkers[currentPlayerIndex] : col
        )
      : row
  );
};

const isWinner = (a, b, c, d) => a !== "" && a === b && a === c && a === d;

const getPositions = (startPosition) => {
  return [
    [
      startPosition,
      [startPosition[0], startPosition[1] + 1],
      [startPosition[0], startPosition[1] + 2],
      [startPosition[0], startPosition[1] + 3],
    ], // row
    [
      startPosition,
      [startPosition[0] + 1, startPosition[1]],
      [startPosition[0] + 2, startPosition[1]],
      [startPosition[0] + 3, startPosition[1]],
    ], // col
    [
      startPosition,
      [startPosition[0] + 1, startPosition[1] + 1],
      [startPosition[0] + 2, startPosition[1] + 2],
      [startPosition[0] + 3, startPosition[1] + 3],
    ], // left-to-right-diagonal
    [
      startPosition,
      [startPosition[0] + 1, startPosition[1] - 1],
      [startPosition[0] + 2, startPosition[1] - 2],
      [startPosition[0] + 3, startPosition[1] - 3],
    ], // right-to-left-diagonal
  ];
};

export const checkWinner = ({ gameBoard }) => {
  for (let rowIndex = 0; rowIndex < gameBoard.length; rowIndex++) {
    const cols = gameBoard[rowIndex];
    for (let colIndex = 0; colIndex < cols.length; colIndex++) {
      const positions = getPositions([rowIndex, colIndex]);
      for (let index = 0; index < positions.length; index++) {
        const element = positions[index];
        if (
          isWinner(
            gameBoard[element[0][0]]?.[element[0][1]],
            gameBoard[element[1][0]]?.[element[1][1]],
            gameBoard[element[2][0]]?.[element[2][1]],
            gameBoard[element[3][0]]?.[element[3][1]]
          )
        ) {
          return true;
        }
      }
    }
  }
  return false;
};

export default {
  startGame,
  playGameAgain,
  updateGameBoard,
  checkWinner,
};
