const chai = require('chai');
const expect = chai.expect;

const squareRootInt = num => {
  let low = 0;
  let high = num;
  let result = undefined;

  const continueSearch = () => low <= high;
  const getMiddle = () => Math.floor((low + high) / 2);
  const found = position => {
    let currentSquared = position * position;
    if (currentSquared === num) {
      return true;
    }
    let nextSquared = (position + 1) * (position + 1);
    if (currentSquared < num && nextSquared > num) {
      return true;
    }
    return false;
  };
  const processResult = position => {
    result = position;
  };
  const shouldMoveLeft = position => {
    let currentSquared = position * position;
    return currentSquared > num;
  };
  const shouldMoveRight = position => {
    let currentSquared = position * position;
    return currentSquared < num;
  };
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

describe('Square Root Int', () => {
  it('Square root of 2', () => {
    let input = 4;
    let actual = squareRootInt(input);
    let expected = 2;
    expect(actual).to.be.equal(expected);
  });

  it('Square root of 8', () => {
    let input = 8;
    let actual = squareRootInt(input);
    let expected = 2;
    expect(actual).to.be.equal(expected);
  });

  it('Square root of 9', () => {
    let input = 9;
    let actual = squareRootInt(input);
    let expected = 3;
    expect(actual).to.be.equal(expected);
  });
});
