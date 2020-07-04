const chai = require('chai');
const expect = chai.expect;

const sudokuSolve = grid => {
  let result = [];
  const isSolution = () => {
    for (let row = 0; row <= grid.length - 1; row++) {
      for (let col = 0; col <= grid.length - 1; col++) {
        if (grid[row][col] === '.') {
          return false;
        }
      }
    }
    return true;
  };
  const solutionFound = () => {
    result = JSON.parse(JSON.stringify(grid));
  };
  const listOfCandidates = () => {
    let empty_square = null;

    for (let row = 0; row <= grid.length - 1; row++) {
      for (let col = 0; col <= grid.length - 1; col++) {
        if (grid[row][col] == '.') {
          empty_square = [row, col];
          break;
        }
      }
    }
    let candidates = [];
    if(empty_square){
      for (let num of ['1', '2', '3', '4', '5', '6', '7', '8', '9']) {
        candidates.push([empty_square[0], empty_square[1], num]);
      }
    }
    return candidates;
  };
  const isValid = candidate => {
    let [row, col, char] = candidate;
    if (grid[row][col] !== '.') {
      return false;
    }
    for (let i = 0; i <= grid.length - 1; i++) {
      if (grid[i][col] === char) {
        return false;
      }
    }
    for (let i = 0; i <= grid.length - 1; i++) {
      if (grid[row][i] === char) {
        return false;
      }
    }
    const startNumber = num => num - num % 3;
    let [startRow, startCol] = [startNumber(row), startNumber(col)];
    for (let r = startRow; r <= startRow + 2; r++) {
      for (let c = startCol; c <= startCol + 2; c++) {
        if (grid[r][c] === char) {
          return false;
        }
      }
    }
    return true;
  };
  const place = candidate => {
    let [row, col, char] = candidate;
    grid[row][col] = char;
  };
  const remove = candidate => {
    let [row, col] = candidate;
    grid[row][col] = '.';
  };

  const backtrack = () => {
    if (isSolution()) {
      solutionFound();
      return;
    }
    for (let candidate of listOfCandidates()) {
      if (isValid(candidate)) {
        place(candidate);
        backtrack();
        remove(candidate);
      }
    }
  };
  backtrack();
  return result;
};

describe('Sudoku Solver', () => {
  it('Example', () => {
    let input = [
      ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
      ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
      ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
      ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
      ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
      ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
      ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
      ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
      ['.', '.', '.', '.', '8', '.', '.', '7', '9']
    ];

    let expected = [
      ['5', '3', '4', '6', '7', '8', '9', '1', '2'],
      ['6', '7', '2', '1', '9', '5', '3', '4', '8'],
      ['1', '9', '8', '3', '4', '2', '5', '6', '7'],
      ['8', '5', '9', '7', '6', '1', '4', '2', '3'],
      ['4', '2', '6', '8', '5', '3', '7', '9', '1'],
      ['7', '1', '3', '9', '2', '4', '8', '5', '6'],
      ['9', '6', '1', '5', '3', '7', '2', '8', '4'],
      ['2', '8', '7', '4', '1', '9', '6', '3', '5'],
      ['3', '4', '5', '2', '8', '6', '1', '7', '9']
    ];

    let actual = sudokuSolve(input);
    expect(actual).to.deep.equal(expected);
  });
});
