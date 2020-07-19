const chai = require('chai');
const expect = chai.expect;

const guess = num => {
  /*
 -1 : My number is lower
  1 : My number is higher
  0 : Congrats! You got it!
 */
  if(num == 6){
    return 0;
  }
  if(num > 6){
    return -1;
  }
  if(num < 6){
    return 1;
  }
};

const myGuessNumber = n => {
  let low = 1;
  let high = n;
  let result = undefined;

  const continueSearch = () => true;

  const getMiddle = () => Math.floor((low + high) / 2);

  const found = position => guess(position) === 0;
  const processResult = position => {
    result = position;
  };
  const shouldMoveLeft = position => guess(position) === -1;
  const shouldMoveRight = position => guess(position) === 1;
  const moveLeft = position => {
    high = position - 1;
  };
  const moveRight = position => {
    low = position + 1;
  };

  while (continueSearch()) {
    let middle = getMiddle();

    if (found(middle)) {
      processResult(middle);
      break;
    }
    if (shouldMoveLeft(middle)) {
      moveLeft(middle);
    }
    if (shouldMoveRight(middle)) {
      moveRight(middle);
    }
  }
  return result;
};

describe('Guess Number Higher Or Lower', () => {
  it('Out of 10 pick 6', () => {
    let n = 10;
    let actual = myGuessNumber(n);
    let expected = 6;
    expect(actual).to.be.equal(expected);
  });
});
