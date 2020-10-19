const chai = require('chai');
const expect = chai.expect;

const COMPARE_RESULTS = {
  GO_LEFT: 'GO_LEFT',
  FOUND: 'FOUND',
  GO_RIGHT: 'GO_RIGHT',
};

const myFindRange = (nums, target) => {
  let findLeftCompare = (target, current, mid, nums) => {
    if(((mid - 1) < 0) || (nums[mid - 1] < current)){
      return COMPARE_RESULTS.FOUND;
    }
    if(nums[mid - 1] === target){
      return COMPARE_RESULTS.GO_LEFT;
    }
    return COMPARE_RESULTS.GO_RIGHT;
  };

  let leftNum = myBinarySearchCustom(nums, target, findLeftCompare);

  let findRightCompare = (target, current, mid, nums) => {
    if(((mid + 1) > nums.length - 1) || (current < nums[mid + 1])){
      return COMPARE_RESULTS.FOUND;
    }
    if(nums[mid + 1] === target){
      return COMPARE_RESULTS.GO_RIGHT;
    }
    return COMPARE_RESULTS.GO_LEFT;
  };
  let rightNum = myBinarySearchCustom(nums, target, findRightCompare);

  return [leftNum, rightNum];
};


const myBinarySearchCustom = (nums, target, currentMatched) => {
  let low = 0;
  let high = nums.length - 1;
  let result = -1;

  while(low <= high){
    let mid = Math.floor((low + high) / 2);

    let current = nums[mid];
    if(current < target){
      low = mid + 1;
    } else if(target < current){
      high = mid - 1;
    } else {
      let compareResult = currentMatched(target, current, mid, nums);
      if(compareResult == COMPARE_RESULTS.GO_LEFT){
        high = mid - 1;
      } else if(compareResult == COMPARE_RESULTS.FOUND){
        return mid;
      } else if(compareResult == COMPARE_RESULTS.GO_RIGHT){
        low = mid + 1;
      }
    }
  }

  return result;
};


describe('Search for a Range', () => {
  it('Find within', () => {
    let nums = [5, 7, 7, 8, 8, 10];
    let target = 8;
    let actual = myFindRange(nums, target);
    let expected = [3, 4];
    expect(actual).to.be.deep.equal(expected);
  });
  it('It is not found', () => {
    let nums = [5, 7, 7, 8, 8, 10];
    let target = 6;
    let actual = myFindRange(nums, target);
    let expected = [-1, -1];
    expect(actual).to.be.deep.equal(expected);
  });
  it('Empty inputs', () => {
    let nums = [];
    let target = 0;
    let actual = myFindRange(nums, target);
    let expected = [-1, -1];
    expect(actual).to.be.deep.equal(expected);
  });
});
