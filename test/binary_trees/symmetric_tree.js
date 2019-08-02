const chai = require('chai');
const expect = chai.expect;
const tree = require('leetcode').Tree;

const isSymmetric = root => {
  if(root === null) return true;

  const traverse = (L, R) => {
    if(L === null && R === null) return true;
    if(L === null || R === null || L.val !== R.val) return false;
    let leftSymmetric = traverse(L.left, R.right);
    let rightSymmetric = traverse(L.right, R.left);
    return leftSymmetric && rightSymmetric;
  };
  return traverse(root.left, root.right);
};

describe('Symmetric Tree', () => {
  it('Is symmetric', () => {
    /*
        1
       / \
      2   2
     / \ / \
    3  4 4  3
    */
    let root = tree.create([1, 2, 2, 3, 4, 4, 3]);
    let expected = true;
    let actual = isSymmetric(root);
    expect(actual).to.be.equal(expected);
  });
  it('Is not symmetric', () => {
    let root = tree.create([1, 2, 2, null, 3, null, 3]);
    let expected = false;
    let actual = isSymmetric(root);
    expect(actual).to.be.equal(expected);
  });
});