import { checkWinner } from "./ticTacToe";

describe("checkWinner", () => {
  describe("determines winner", () => {
    it("by rows", () => {
      const firstRow = [
        ["O", "O", "O"],
        ["", "", ""],
        ["", "", ""],
      ];
      expect(checkWinner({ gameBoard: firstRow })).toBe(true);
      const secondRow = [
        ["", "", ""],
        ["O", "O", "O"],
        ["", "", ""],
      ];
      expect(checkWinner({ gameBoard: secondRow })).toBe(true);
      const thirdRow = [
        ["", "", ""],
        ["", "", ""],
        ["O", "O", "O"],
      ];
      expect(checkWinner({ gameBoard: thirdRow })).toBe(true);
    });

    it("by columns", () => {
      const firstCol = [
        ["O", "", ""],
        ["O", "", ""],
        ["O", "", ""],
      ];
      expect(checkWinner({ gameBoard: firstCol })).toBe(true);
      const secondCol = [
        ["", "O", ""],
        ["", "O", ""],
        ["", "O", ""],
      ];
      expect(checkWinner({ gameBoard: secondCol })).toBe(true);
      const thirdCol = [
        ["", "", "O"],
        ["", "", "O"],
        ["", "", "O"],
      ];
      expect(checkWinner({ gameBoard: thirdCol })).toBe(true);
    });

    it("by diagonals", () => {
      const firstDiag = [
        ["O", "", ""],
        ["", "O", ""],
        ["", "", "O"],
      ];
      expect(checkWinner({ gameBoard: firstDiag })).toBe(true);
      const secondDiag = [
        ["", "", "O"],
        ["", "O", ""],
        ["O", "", ""],
      ];
      expect(checkWinner({ gameBoard: secondDiag })).toBe(true);
    });
  });
  describe("determines no winner", () => {
    it("empty game board", () => {
      const empty = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ];
      expect(checkWinner({ gameBoard: empty })).toBe(false);
    });
    it("not yet a tie", () => {
      const empty = [
        ["O", "X", ""],
        ["", "O", ""],
        ["", "", "X"],
      ];
      expect(checkWinner({ gameBoard: empty })).toBe(false);
    });
    it("a tie", () => {
      const tie = [
        ["O", "X", "O"],
        ["O", "O", "X"],
        ["X", "O", "X"],
      ];
      expect(checkWinner({ gameBoard: tie })).toBe(false);
    });
  });
});
