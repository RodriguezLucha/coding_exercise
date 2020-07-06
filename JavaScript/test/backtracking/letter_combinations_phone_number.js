const chai = require('chai');
const expect = chai.expect;

const letterCombinationsForPhoneNumber = (inputString) => {
  if(inputString.length == 0){
    return [];
  }
  let results = [];

  let numberLookup = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz'
  };

  let buffer = '';

  const isSolution = (str) => str.length <= 0;
  const solutionFound = () => {
    results.push(buffer);
  };
  const listOfCandidates = (str) => {
    let candidates = [];

    let firstNum = str[0];
    let remainingNum = str.slice(1);

    let chars = numberLookup[firstNum];
    for(let char of chars){
      candidates.push([char, remainingNum]);
    }
    return candidates;
  };
  const isValid = () => true;
  const move = (char) => {
    buffer += char;
  };
  const unmove = () => {
    buffer = buffer.slice(0, buffer.length - 1);
  };

  const backtrack = (str) => {
    if(isSolution(str)){
      solutionFound(str);
      return;
    }
    for(let candidate of listOfCandidates(str)){
      if(isValid()){
        let [char, rest] = candidate;
        move(char);
        backtrack(rest);
        unmove(char);
      }
    }
  };
  backtrack(inputString);
  return results;
};


describe('Letter Combinations of a Phone Number', () => {
  it('23', () => {
    let actual = new Set(letterCombinationsForPhoneNumber('23'));
    let expected = new Set(['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']);
    expect(actual).to.deep.equal(expected);
  });
});
