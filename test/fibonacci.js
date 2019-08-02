const chai = require('chai');
const expect = chai.expect;

const fib_iterative = n => {
  let arr = [1, 1];
  let counter = 2;

  while (arr.length < n){
    let previous = counter - 1;
    let previousPrevious = counter - 2;
    let current = arr[previous] + arr[previousPrevious];
    arr.push(current);
    counter += 1;
  }
  return arr;
};

const fib_recursive = n => {
  if(n === 2) return [1, 1];
  let prev = fib_recursive(n - 1);
  return prev.concat(prev[prev.length - 1] + prev[prev.length - 2]);
};


describe('Fibonacci', () => {
  it('First 10 iterative', () => {
    let expected = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
    let actual = fib_iterative(10);
    expect(actual).to.deep.equal(expected);
  });
  it('First 10 recursive', () => {
    let expected = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
    let actual = fib_recursive(10);
    expect(actual).to.deep.equal(expected);
  });
});
