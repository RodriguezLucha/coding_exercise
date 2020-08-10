const chai = require('chai');
const expect = chai.expect;

const myFindPeakElement = nums => {
  let low = 0;
  let high = nums.length - 1;
  let result = -1;

  if (nums.length === 1) {
    return 0;
  }

  const atEdge = position => {
    let atStart = position === 0;
    let atEnd = position === nums.length - 1;
    return atStart || atEnd;
  };

  const continueSearch = () => low <= high;
  const getMiddle = () => Math.floor((low + high) / 2);
  const found = position => {
    let current = nums[position];
    //At start and immediately to the right is lower, at a peak
    if (position == 0 && nums[position + 1] < current) {
      return true;
    }
    //At end and immediately to the left is lower, at a peak
    if (position == nums.length - 1 && nums[position - 1] < current) {
      return true;
    }
    //Somewhere in the middle, and immediately to the left and right is lower
    if (nums[position - 1] < current && nums[position + 1] < current) {
      return true;
    }
    return false;
  };
  const processResult = position => {
    result = position;
  };
  const shouldMoveLeft = position => {
    let current = nums[position];
    //Example:6,5,4,3,2,1
    //At end and immediately to left is higher
    if (position == nums.length - 1 && nums[position - 1] > current) {
      return true;
    }
    //Move left if immediately to left is higher, and immediately to right is lower
    if (!atEdge(position)) {
      if (nums[position - 1] > current && nums[position + 1] < current) {
        return true;
      }
    }
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
    } else {
      moveRight(middle);
    }
  }
  return result;
};

describe('Find peak element', () => {
  it('It is found', () => {
    let nums = [1, 2, 3, 1];
    let actual = myFindPeakElement(nums);
    let expected = 2;
    expect(actual).to.be.equal(expected);
  });
  it('Small case', () => {
    let nums = [2, 1];
    let actual = myFindPeakElement(nums);
    let expected = 0;
    expect(actual).to.be.equal(expected);
  });
});
