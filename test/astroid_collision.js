const chai = require('chai');
const expect = chai.expect;

const asteroidCollision = astroids => {
  let stack = [];

  const canReduceStack = () => {
    if(stack.length < 2) return false;
    let [current, previous] = [stack[stack.length - 1], stack[stack.length - 2]];
    return current < 0 && previous > 0;
  };

  const reduceStack = () => {
    let [curr, prev] = [stack.pop(), stack.pop()];
    let [acurr, aprev] = [Math.abs(curr), Math.abs(prev)];
    if(acurr === aprev) return;
    if(acurr > aprev) stack.push(curr);
    if(acurr < aprev) stack.push(prev);
  };

  astroids.forEach(current => {
    stack.push(current);
    while(canReduceStack()){
      reduceStack();
    }
  });

  return stack;
};

const assertAstroid = (astroids, expected, message) => {
  it(message, () => {
    let actual = asteroidCollision(astroids);
    expect(expected).to.deep.equal(actual);
  });
};

describe('Astroid Collision', () => {
  assertAstroid([], [], 'Empty input');
  assertAstroid([1], [1], 'Single input');
  assertAstroid([-1], [-1], 'Single negative');
  assertAstroid([1, 1], [1, 1], 'No collisions');
  assertAstroid([5, 10, -5], [5, 10], 'Example 1');
  assertAstroid([8, -8], [], 'Example 2');
  assertAstroid([10, 2, -5], [10], 'Example 3');
  assertAstroid([-2, -1, 1, 2], [-2, -1, 1, 2], 'no collisions');
});