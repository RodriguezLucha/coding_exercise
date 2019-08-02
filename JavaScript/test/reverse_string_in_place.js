const chai = require('chai');
const expect = chai.expect;

const reverse = (str) => {
  let low = 0;
  let high = str.length;
  while(low < high) {
    swap(str, low, high);
    low += 1;
    high -= 1;
  }
};

const swap = (str, i, j) => {
  let temp = str[i];
  str[i] = str[j];
  str[j] = temp;
};

describe('Reverse String in place', () => {
  it('empty string', () => {
    let input = ''.split('');
    reverse(input);
    let actual = input.join('');
    let expected = '';
    expect(actual).to.equal(expected);
  });

  it('single character string', () => {
    let input = 'A'.split('');
    reverse(input);
    let actual = input.join('');
    let expected = 'A';
    expect(actual).to.equal(expected);
  });

  it('longer string', () => {
    let input = 'ABCDE'.split('');
    reverse(input);
    let actual = input.join('');
    let expected = 'EDCBA';
    expect(actual).to.equal(expected);
  });
  it('even string', () => {
    let input = 'ABCD'.split('');
    reverse(input);
    let actual = input.join('');
    let expected = 'DCBA';
    expect(actual).to.equal(expected);
  });
});
