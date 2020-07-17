const chai = require('chai');
const expect = chai.expect;

const squareRoot = num => {
  let low = 0;
  let high = num;
  let tolerance = 0.00001;

  const foundResult = candidate => {
    let candidate_result = candidate * candidate;

    let diff = num - candidate_result;
    diff = Math.abs(diff);

    if (diff < tolerance) {
      return true;
    }
    return false;
  };
  const goLeft = candidate => {
    let candidate_result = candidate * candidate;

    return candidate_result > num;
  };
  const goRight = candidate => {
    return candidate * candidate < num;
  };

  while (true) {
    let middle = (low + high) / 2;

    if (foundResult(middle)) {
      return middle;
    }
    if (goLeft(middle)) {
      high = middle;
    }
    if (goRight(middle)) {
      low = middle;
    }
  }
};

describe('Square Root', () => {
  it('Square root of a decimal number', () => {
    let input = 2.25;
    let actual = squareRoot(input);
    let expected = 1.5;
    expect(actual).to.be.closeTo(expected, 0.0001);
  });

  it('Square root of 4', () => {
    let input = 4;
    let actual = squareRoot(input);
    let expected = 2;
    expect(actual).to.be.closeTo(expected, 0.0001);
  });
});
