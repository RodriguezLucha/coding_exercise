const chai = require('chai');
const expect = chai.expect;
const tree = require('leetcode').Tree;

const maxDepth = (root) => {
  let [level, max] = [0, 0];

  const traverse = node => {
    if(node === null) return;
    level += 1;
    max = Math.max(max, level);
    if (node.left) traverse(node.left);
    if (node.right) traverse(node.right);
    level -= 1;
  };
  traverse(root);
  return max;
};

describe('Maximum Depth of a Binary Tree', () => {
  it('Returns a depth of 3', () => {
    let root = tree.create([3, 9, 20, null, null, 15, 7]);
    // npx treevis [3,9,20,null,null,15,7]
    //    3
    //   / \
    //  9  20
    //     / \
    //    15  7
    let expected = 3;
    let actual = maxDepth(root);
    expect(actual).to.be.equal(expected);
  });
});