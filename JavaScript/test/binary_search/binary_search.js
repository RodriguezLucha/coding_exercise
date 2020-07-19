const chai = require('chai');
const expect = chai.expect;

const myBinarySearch = (nums, target) => {
  let low = 0;
  let high = nums.length - 1;
  let result = -1;

  const continueSearch = () => low <= high;
  const getMiddle = () => Math.floor((low + high) / 2);
  const found = position => {
    let element = nums[position];

    if (element === target) {
      return true;
    }
    return false;
  };
  const processResult = position => {
    result = position;
  };
  const shouldMoveLeft = position => {
    let element = nums[position];
    return element > target;
  };
  const shouldMoveRight = position => {
    let element = nums[position];
    return element < target;
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

describe('Regular Binary Search', () => {
  it('It is found', () => {
    let nums = [-1, 0, 3, 5, 9, 12];
    let target = 9;
    let actual = myBinarySearch(nums, target);
    let expected = 4;
    expect(actual).to.be.equal(expected);
  });
  it('It is not found', () => {
    let nums = [-1, 0, 3, 5, 9, 12];
    let target = 2;
    let actual = myBinarySearch(nums, target);
    let expected = -1;
    expect(actual).to.be.equal(expected);
  });
});
