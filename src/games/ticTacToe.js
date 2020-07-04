import playerMarkers from "../constants/playerMarkers";

export const initialGameState = {
  currentPlayer: playerMarkers[0],
  gameBoard: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
};

export const updateGameBoard = ({ gameBoard, currentPlayer }, event) => {
  return gameBoard.map((row, rowIndex) =>
    event.row === rowIndex
      ? row.map((col, colIndex) =>
          event.col === colIndex ? currentPlayer : col
        )
      : row
  );
};

const isWinner = (a, b, c) => a !== "" && a === b && a === c;

const getPositions = (startPosition) => {
  return [
    [
      startPosition,
      [startPosition[0], startPosition[1] + 1],
      [startPosition[0], startPosition[1] + 2],
    ], // row
    [
      startPosition,
      [startPosition[0] + 1, startPosition[1]],
      [startPosition[0] + 2, startPosition[1]],
    ], // col
    [
      startPosition,
      [startPosition[0] + 1, startPosition[1] + 1],
      [startPosition[0] + 2, startPosition[1] + 2],
    ], // left-to-right-diagonal
    [
      startPosition,
      [startPosition[0] + 1, startPosition[1] - 1],
      [startPosition[0] + 2, startPosition[1] - 2],
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
            gameBoard[element[2][0]]?.[element[2][1]]
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
  initialGameState,
  updateGameBoard,
  checkWinner,
};
