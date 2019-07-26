const chai = require('chai');
const expect = chai.expect;

const asteroidCollision = astroids => {
  let res = [];
  for(let i = 0; i < astroids.length; i++){
    if(astroids[i] > 0){
      res.push(astroids[i]);
    }else{
      while(res.length > 0 && res[res.length - 1] > 0 &&  res[res.length - 1] < Math.abs(astroids[i])){
        res.pop();
      }
      if(res.length == 0 || res[res.length - 1] < 0){
        res.push(astroids[i]);
      }
      if(res[res.length - 1] > 0 && res[res.length - 1] == Math.abs(astroids[i])){
        res.pop();
      }
    }
  }
  return res;
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
});