const chai = require('chai');
const expect = chai.expect;

const isBadVersion = (version) => version >= 4;

const myIsBadVersion = (n) => {
  let low = 0;
  let high = n;
  let result = -1;
  let checked = {};

  const continueSearch = () => low <= high;
  const getMiddle = () => Math.floor((low + high) / 2);
  const found = position => {
    let bad = isBadVersion(position);
    checked[position] = bad;

    let previousBad = isBadVersion(position - 1);
    checked[position - 1] = previousBad;

    if(bad && (!previousBad)){
      return true;
    }

    return false;
  };
  const processResult = p => {
    result = p;
  };
  const shouldMoveLeft = p => checked[p];

  const shouldMoveRight = p => !checked[p];

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

describe('First bad version', () => {
  it('Simple case', () => {
    let n = 5;
    let actual = myIsBadVersion(n);
    let expected = 4;
    expect(actual).to.be.equal(expected);
  });
});
