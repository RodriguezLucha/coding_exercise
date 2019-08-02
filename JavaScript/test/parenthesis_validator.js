const chai = require('chai');
const expect = chai.expect;

const isValid = (str) => {
  let stack = [];
  for(let char of str){
    if(isOpener(char)){
      stack.push(char);
    } else {
      if(isCloser(char)){
        let lastOpener = stack.pop();
        if(lastOpener !== closerToOpener[char]) return false;
      }
    }
  }
  return stack.length === 0;
};

const isOpener = (char) => '([{'.includes(char);
const isCloser = (char) => ')]}'.includes(char);
const closerToOpener = {')': '(', '}': '{', ']': '['};


describe('Bracket Validator', () => {
  it('valid short code', () => {
    expect(isValid('(adbs)')).to.equal(true);
  });

  it('valid longer code', () => {
    expect(isValid('([]{[dssdfa]adf})[asdfa]{{adf}()}')).to.equal(true);
  });

  it('mismatched opener and closer', () => {
    expect(isValid('([sdfs][]}')).to.equal(false);
  });

  it('missing closer', () => {
    expect(isValid('[[]()')).to.equal(false);
  });

  it('extra closer', () => {
    expect(isValid('[[]]())')).to.equal(false);
  });

  it('empty string', () => {
    expect(isValid('')).to.equal(true);
  });
});
