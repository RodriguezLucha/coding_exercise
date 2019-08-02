const chai = require('chai');
const expect = chai.expect;

const getPermutations = (str) => {
  if(str.length <= 1) return new Set([str]);

  let results = new Set();
  str.split('').forEach((char, i) => {
    let remaining = str.slice(0, i) + str.slice(i + 1);
    let perms = getPermutations(remaining);
    perms.forEach(p => {
      results.add(char + p);
    });
  });
  return results;
};

describe('Recursive String Permutations', () => {
  it('empty string', () => {
    let input = '';
    let actual = getPermutations(input);
    let expected = new Set(['']);
    expect(actual).to.deep.equal(expected);
  });

  it('one character string', () => {
    let input = 'a';
    let actual = getPermutations(input);
    let expected = new Set(['a']);
    expect(actual).to.deep.equal(expected);
  });

  it('two character string', () => {
    let input = 'ab';
    let actual = getPermutations(input);
    let expected = new Set(['ab', 'ba']);
    expect(actual).to.deep.equal(expected);
  });

  it('three character string', () => {
    let input = 'abc';
    let actual = getPermutations(input);
    let expected = new Set(['abc', 'acb', 'bac', 'bca', 'cab', 'cba']);
    expect(actual).to.deep.equal(expected);
  });
});
