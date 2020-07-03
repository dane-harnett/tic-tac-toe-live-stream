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

export const checkWinner = ({ gameBoard }) => {
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
};

export default {
  initialGameState,
  updateGameBoard,
  checkWinner,
};
