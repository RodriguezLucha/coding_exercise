const chai = require('chai');
const expect = chai.expect;

const generateAllValidParenthesis = num => {
  let results = [];
  let stack = [];

  let remOpen = num;
  let remClose = num;
  let usedOpen = 0;
  let usedClose = 0;

  const isSolution = () => stack.length === num * 2;
  const solutionFound = () => {
    results.push(stack.join(''));
  };
  const listOfCandidates = () => {
    let candidates = [];

    if (remClose === 0 && remOpen === 0) {
      return [];
    }
    if (remOpen) {
      candidates.push('(');
    }
    if (remClose && usedOpen > usedClose) {
      candidates.push(')');
    }
    return candidates;
  };
  const isValid = () => true;
  const move = char => {
    stack.push(char);
    if (char === '(') {
      remOpen--;
      usedOpen++;
    } else {
      remClose--;
      usedClose++;
    }
  };
  const unmove = char => {
    stack.pop();
    if (char === '(') {
      remOpen++;
      usedOpen--;
    } else {
      remClose++;
      usedClose--;
    }
  };

  const backtrack = args => {
    if (isSolution()) {
      solutionFound();
      return;
    }
    for (let candidate of listOfCandidates()) {
      if (isValid()) {
        move(candidate);
        backtrack(args);
        unmove(candidate);
      }
    }
  };
  backtrack({remOpen: num, remClose: num, usedOpen: 0, usedClose: 0});
  return results;
};

describe('Generate All Valid Parentheses', () => {
  it('three character string', () => {
    let input = 3;
    let actual = new Set(generateAllValidParenthesis(input));
    let expected = new Set(['((()))', '(()())', '(())()', '()(())', '()()()']);
    expect(actual).to.deep.equal(expected);
  });
});
