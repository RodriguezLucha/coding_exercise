const chai = require('chai');
const expect = chai.expect;

const mySearchRotatedSortedArray = (nums, target) => {
  let low = 0;
  let high = nums.length - 1;
  let result = -1;

  const notRotated = () => nums[low] <= nums[high];

  while(low <= high){
    let middleIndex = Math.floor((low + high) / 2);
    let mid = nums[middleIndex];
    if(mid === target){
      result = middleIndex;
      break;
    }

    if(notRotated()){
      //Normal binary search
      if(target < mid){
        high = middleIndex - 1;
      }
      if(target > mid) {
        low = middleIndex + 1;
      }
    } else {
      //Special binary search
      //Find non rotated half
      let nonRotatedHalf = nums[low] <= mid ? 'left' : 'right';
      //Get range of that half
      let range = nonRotatedHalf === 'left' ? [nums[low], mid] : [mid, nums[high]];
      //Is the number within that range?
      if(target >= range[0] && target <= range[1]){
        //  Yes it is, go that direction
        if(nonRotatedHalf === 'left'){
          high = middleIndex - 1;
        } else{
          low = middleIndex + 1;
        }
      } else {
        //  No its not. go the other direction.
        if(nonRotatedHalf === 'left') {
          low = middleIndex + 1;
        } else {
          high = middleIndex - 1;
        }
      }
    }
  }
  return result;
};

describe('Search in Rotated Sorted Array', () => {
  it('Found', () => {
    let nums = [4, 5, 6, 7, 0, 1, 2];
    let target = 0;
    let actual = mySearchRotatedSortedArray(nums, target);
    let expected = 4;
    expect(actual).to.be.equal(expected);
  });
  it('Found Simple', () => {
    let nums = [1];
    let target = 1;
    let actual = mySearchRotatedSortedArray(nums, target);
    let expected = 0;
    expect(actual).to.be.equal(expected);
  });

  it('Not Rotated', () => {
    let nums = [1, 3];
    let target = 3;
    let actual = mySearchRotatedSortedArray(nums, target);
    let expected = 1;
    expect(actual).to.be.equal(expected);
  });

  it('Simple 2', () => {
    let nums = [3, 5, 1];
    let target = 3;
    let actual = mySearchRotatedSortedArray(nums, target);
    let expected = 0;
    expect(actual).to.be.equal(expected);
  });
});
