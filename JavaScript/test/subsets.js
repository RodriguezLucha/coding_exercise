const chai = require('chai');
const expect = chai.expect;

const subsets = arr => {
  let result = [];
  let sub = [];
  const recur = start => {
    result.push([...sub]);
    for(let i = start; i < arr.length; i++){
      sub.push(arr[i]);
      recur(i + 1);
      sub.pop();
    }
  };
  recur(0);
  return result;
};


describe('Subsets', () => {
  it('All subsets backtracking', () => {
    let input = [1, 2, 3];
    let actual = subsets(input);
    let expected = [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]];
    expect(actual).to.deep.equal(expected);
  });
});
