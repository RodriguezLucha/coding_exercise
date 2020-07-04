const chai = require('chai');
const expect = chai.expect;

const getPermutationsBacktrack = (inputString) => {
  let results = [];

  let buffer = '';

  const isSolution = (str) => str.length <= 1;
  const solutionFound = (str) => {
    buffer += str;
    results.push(buffer);
    buffer = buffer.slice(0, buffer.length - 1);
  };
  const listOfCandidates = (str) => {
    let candidates = [];
    for(let i = 0; i <= str.length - 1; i++){
      let char = str[i];
      let rest = str.slice(0, i) + str.slice(i + 1);
      candidates.push([char, rest]);
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


describe('Permutations via backtracking', () => {
  it('three character string', () => {
    let input = 'abc';
    let actual = new Set(getPermutationsBacktrack(input));
    let expected = new Set(['abc', 'acb', 'bac', 'bca', 'cab', 'cba']);
    expect(actual).to.deep.equal(expected);
  });
});
