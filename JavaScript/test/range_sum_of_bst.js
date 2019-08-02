const chai = require('chai');
const expect = chai.expect;
const tree = require('leetcode').Tree;

const rangeSumBST = (node, L, R) => {
  let total = 0;
  const traverse = (node, L, R) => {
    if(!node) return;
    if(node.val >= L && node.val <= R) total += node.val;
    if(node.left) traverse(node.left, L, R);
    if(node.right) traverse(node.right, L, R);
  };
  traverse(node, L, R);
  return total;
};

describe('Range sum of BST', () => {
  it('Example 1', () => {
    let root = [10, 5, 15, 3, 7, null, 18], L = 7, R = 15;
    let node = tree.create(root);
    let actual = rangeSumBST(node, L, R);
    let expected = 32;
    expect(actual).to.equal(expected);
  });
  it('Example 2', () => {
    let root = [10, 5, 15, 3, 7, 13, 18, 1, null, 6], L = 6, R = 10;
    let node = tree.create(root);
    let actual = rangeSumBST(node, L, R);
    let expected = 23;
    expect(actual).to.equal(expected);
  });
});
