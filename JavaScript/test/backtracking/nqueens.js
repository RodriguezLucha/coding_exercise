const chai = require('chai');
const expect = chai.expect;

const nQueens = (num) => {
  let board = makeBoard(num);
  let placed = 0;
  let results = [];

  const isSolution = () => placed === num;
  const solutionFound = () => {
    let result = [];
    for(let row = 0; row <= num - 1; row++){
      let newRow = '';
      for(let col = 0; col <= num - 1; col++){
        if(board[row][col]){
          newRow += 'Q';
        } else{
          newRow += '.';
        }
      }
      result.push(newRow);
    }
    results.push(result);
  };
  const isValid = (candidate) => {
    const inRange = (row, col) => {
      if(row >= 0 && col >= 0){
        if(row <= num - 1 && col <= num - 1){
          return true;
        }
      }
      return false;
    };
    let [row, col] = candidate;
    while(inRange(row, col)){
      if(board[row][col] == 1){
        return false;
      }
      row++;
    }
    [row, col] = candidate;
    while(inRange(row, col)){
      if(board[row][col] == 1){
        return false;
      }
      row--;
    }
    [row, col] = candidate;
    while(inRange(row, col)){
      if(board[row][col] == 1){
        return false;
      }
      col--;
    }
    [row, col] = candidate;
    while(inRange(row, col)){
      if(board[row][col] == 1){
        return false;
      }
      col++;
    }
    [row, col] = candidate;
    while(inRange(row, col)){
      if(board[row][col] == 1){
        return false;
      }
      col++;
      row++;
    }
    [row, col] = candidate;
    while(inRange(row, col)){
      if(board[row][col] == 1){
        return false;
      }
      col++;
      row--;
    }
    [row, col] = candidate;
    while(inRange(row, col)){
      if(board[row][col] == 1){
        return false;
      }
      col--;
      row--;
    }
    [row, col] = candidate;
    while(inRange(row, col)){
      if(board[row][col] == 1){
        return false;
      }
      col--;
      row++;
    }
    return true;
  };
  const listOfCandidates = (candidate) => {
    let squares = [];
    for(let row = 0; row <= num - 1; row++){
      for(let col = 0; col <= num - 1; col++){
        squares.push([row, col]);
      }
    }
    let found = false;
    let candidates = [];
    for(const e of squares){
      if(found){
        candidates.push(e);
      }
      if(e[0]== candidate[0] && e[1]==candidate[1]){
        found = true;
        candidates.push(e);
      }
    }
    return candidates;
  };
  const place = (candidate) => {
    placed++;
    let [row, col] = candidate;
    board[row][col] = 1;
  };
  const remove = (candidate) => {
    placed--;
    let [row, col] = candidate;
    board[row][col] = 0;
  };

  const backtrack = (candidate) => {
    if (isSolution()){
      solutionFound();
      return;
    }
    for(let next_candidate of listOfCandidates(candidate)){
      if (isValid(next_candidate)){
        place(next_candidate);

        backtrack([next_candidate[0] + 1, 0]);

        remove(next_candidate);
      }
    }
  };
  backtrack([0, 0]);
  return results;
};

const makeBoard = (num) => {
  let board = [];
  for(let row = 0; row <= num - 1; row++){
    let newRow = [];
    for(let col = 0; col <= num - 1; col++){
      newRow.push(0);
    }
    board.push(newRow);
  }
  return board;
};

describe('NQueens', () => {
  it('4x4', () => {
    let expected = [
      ['.Q..',
        '...Q',
        'Q...',
        '..Q.'],

      ['..Q.',
        'Q...',
        '...Q',
        '.Q..']
    ];

    let actual = nQueens(4);
    expect(actual).to.deep.equal(expected);
  });

});
