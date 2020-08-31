const chai = require('chai');
const expect = chai.expect;

// 1 2 3 4 5 6 7 = Not rotated, to the left
// 2 3 4 5 6 7 1 = Rotated just one go right
// 7 1 2 3 4 5 6 = Rotated just one go left
// 3 4 5 6 7 1 2 = To the right of middle
// 6 7 1 2 3 4 5 = To the left of middle
// 5 6 7 1 2 3 4 = Exactly the middle

//  10 50 100 - We go left cause - Lower is less than mid and high is higher than mid
//  100 10 50 - Go left          - Lower is higher than current and high is greater than mid
//  50 100 10 - Go right         - else

// Case 2 of elements, 3 elements, 4 elements.

const myFindMinimumInRotatedSortedArray = nums => {
  let low = 0;
  let high = nums.length - 1;
  let result = -1;

  if (nums.length === 1) {
    return nums[0];
  }

  const atStart = pos => pos === 0;
  const atEnd = pos => pos === nums.length - 1;
  const atEdge = pos => atStart(pos) || atEnd(pos);

  const continueSearch = () => low <= high;
  const getMiddle = () => Math.floor((low + high) / 2);
  const found = pos => {
    let current = nums[pos];
    if (atStart(pos)) {
      if (current < nums[pos + 1]) {
        return true;
      }
    }
    if (atEnd(pos)) {
      if (nums[pos - 1] > current) {
        return true;
      }
    }
    if (!atEdge(pos)) {
      if (nums[pos - 1] > current && current < nums[pos + 1]) {
        return true;
      }
    }
  };
  const processResult = position => (result = nums[position]);
  const shouldMoveLeft = pos => {
    let lowElement = nums[low];
    let highElement = nums[high];
    let current = nums[pos];
    if (lowElement < current && current < highElement) {
      return true;
    }
    if (lowElement > current && current < highElement) {
      return true;
    }
    return false;
  };
  const moveLeft = mid => (high = mid - 1);
  const moveRight = mid => (low = mid + 1);

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

describe('Find miniumum in rotated sorted array', () => {
  it('Found', () => {
    let nums = [3, 4, 5, 1, 2];
    let actual = myFindMinimumInRotatedSortedArray(nums);
    let expected = 1;
    expect(actual).to.be.equal(expected);
  });
  it('Minimal', () => {
    let nums = [2, 1];
    let actual = myFindMinimumInRotatedSortedArray(nums);
    let expected = 1;
    expect(actual).to.be.equal(expected);
  });
});
