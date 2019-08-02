const chai = require('chai');
const expect = chai.expect;

const binary_search = (arr, target) => {
  let low = 0;
  let high = arr.length - 1;
  while(low <= high){
    let mid = Math.floor((low + high) / 2);
    let val = arr[mid];
    if(target === val) return mid;
    if(target < val) high = mid - 1;
    if(target > val) low = mid + 1;
  }
  return -1;
};

describe('Binary Search', () => {
  it('Basic Found', () => {
    let arr = [-1, 0, 3, 5, 9, 12];
    let target = 9;
    let expected = 4;
    let actual = binary_search(arr, target);
    expect(actual).to.equal(expected);
  });
  it('Not Found', () => {
    let arr = [-1, 0, 3, 5, 9, 12];
    let target = 1;
    let expected = -1;
    let actual = binary_search(arr, target);
    expect(actual).to.equal(expected);
  });
  it('One Found', () => {
    let arr = [1];
    let target = 1;
    let expected = 0;
    let actual = binary_search(arr, target);
    expect(actual).to.equal(expected);
  });
  it('Empty Array', () => {
    let arr = [];
    let target = 1;
    let expected = -1;
    let actual = binary_search(arr, target);
    expect(actual).to.equal(expected);
  });
  it('Even left', () => {
    let arr = [1, 2, 3, 4];
    let target = 2;
    let expected = 1;
    let actual = binary_search(arr, target);
    expect(actual).to.equal(expected);
  });
});
