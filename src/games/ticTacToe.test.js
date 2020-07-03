import ticTacToe from "./ticTacToe";

describe("Tic-tac-toe", () => {
  describe("determines winner", () => {
    it("by rows", () => {
      const firstRow = [
        ["O", "O", "O"],
        ["", "", ""],
        ["", "", ""],
      ];
      expect(ticTacToe({ gameBoard: firstRow })).toBe(true);
      const secondRow = [
        ["", "", ""],
        ["O", "O", "O"],
        ["", "", ""],
      ];
      expect(ticTacToe({ gameBoard: secondRow })).toBe(true);
      const thirdRow = [
        ["", "", ""],
        ["", "", ""],
        ["O", "O", "O"],
      ];
      expect(ticTacToe({ gameBoard: thirdRow })).toBe(true);
    });

    it("by columns", () => {
      const firstCol = [
        ["O", "", ""],
        ["O", "", ""],
        ["O", "", ""],
      ];
      expect(ticTacToe({ gameBoard: firstCol })).toBe(true);
      const secondCol = [
        ["", "O", ""],
        ["", "O", ""],
        ["", "O", ""],
      ];
      expect(ticTacToe({ gameBoard: secondCol })).toBe(true);
      const thirdCol = [
        ["", "", "O"],
        ["", "", "O"],
        ["", "", "O"],
      ];
      expect(ticTacToe({ gameBoard: thirdCol })).toBe(true);
    });

    it("by diagonals", () => {
      const firstDiag = [
        ["O", "", ""],
        ["", "O", ""],
        ["", "", "O"],
      ];
      expect(ticTacToe({ gameBoard: firstDiag })).toBe(true);
      const secondDiag = [
        ["", "", "O"],
        ["", "O", ""],
        ["O", "", ""],
      ];
      expect(ticTacToe({ gameBoard: secondDiag })).toBe(true);
    });
  });
  describe("determines no winner", () => {
    it("empty game board", () => {
      const empty = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ];
      expect(ticTacToe({ gameBoard: empty })).toBe(false);
    });
    it("not yet a tie", () => {
      const empty = [
        ["O", "X", ""],
        ["", "O", ""],
        ["", "", "X"],
      ];
      expect(ticTacToe({ gameBoard: empty })).toBe(false);
    });
    it("a tie", () => {
      const tie = [
        ["O", "X", "O"],
        ["O", "O", "X"],
        ["X", "O", "X"],
      ];
      expect(ticTacToe({ gameBoard: tie })).toBe(false);
    });
  });
});
