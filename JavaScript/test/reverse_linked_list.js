const chai = require('chai');
const expect = chai.expect;

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function makeList(){
  let nodeA = new Node('A');
  let nodeB = new Node('B');
  let nodeC = new Node('C');
  let nodeD = new Node('D');
  nodeA.next = nodeB;
  nodeB.next = nodeC;
  nodeC.next = nodeD;
  return nodeA;
}

const reverseLinkedList = (head) => {
  let curr = head;
  let prev = null;
  let next = null;

  while(curr){
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
};

describe('Reverse a linked list', () => {
  it('empty string', () => {
    let head = makeList();
    head = reverseLinkedList(head);

    expect(head.value).to.equal('D');
    expect(head.next.value).to.equal('C');
    expect(head.next.next.value).to.equal('B');
    expect(head.next.next.next.value).to.equal('A');
    expect(head.next.next.next.next).to.equal(null);
  });
});