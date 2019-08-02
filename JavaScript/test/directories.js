const chai = require('chai');
const expect = chai.expect;

const CREATE = 'CREATE';
const LIST = 'LIST';
const MOVE = 'MOVE';
const DELETE = 'DELETE';

const parseLine = (line) => {
  let cmd = null;
  let args = [];
  line = line.trim();
  cmd = line.split(' ')[0];
  args = line.split(' ').slice(1);
  return [cmd, args];
};

const runCommands = (input) => {
  let lines = input.split('\n');
  let result = [];
  let directories = {};

  const handleCreate = directory => {
    let fullpath = directory.split('/');
    let pointer = directories;
    while(fullpath.length){
      let path = fullpath.shift();
      if(!pointer[path]){
        pointer[path] = {};
      }
      pointer = pointer[path];
    }
  };
  const handleMove = (from, to) => {
    const dfs = (dir, path) => {
      if(path.length === 1){
        return [dir, dir[path[0]]];
      }
      return dfs(dir[path[0]], path.slice(1));
    };
    let [fromParent, fromPointer] = dfs(directories, from.split('/'));
    let [toParent, toPointer] = dfs(directories, to.split('/'));
    let lastFrom = from.split('/')[from.split('/').length - 1];
    let lastTo = to.split('/')[to.split('/').length - 1];
    let copy = {};
    copy[lastFrom] = fromPointer;
    toParent[lastTo] = Object.assign(toParent[lastTo], JSON.parse(JSON.stringify(copy)));
    delete fromParent[lastFrom];
    return;
  };

  const handleList = () => {
    const dfs = (tabCount, pointer) => {
      Object.keys(pointer).sort().forEach(dir => {
        result.push(' '.repeat(2).repeat(tabCount) + dir);
        dfs(tabCount + 1, pointer[dir]);
      });
    };
    dfs(0, directories);
  };
  const handleDelete = (given) => {
    let fullpath = given.split('/');
    let pointer = directories;
    while(fullpath.length > 1){
      let path = fullpath.shift();
      if(pointer[path])
        pointer = pointer[path];
      else{
        result.push(`Cannot delete ${given} - ${path} does not exist`);
        return;
      }
    }
    delete pointer[fullpath[0]];
  };

  const handleLine = (line) => {
    let[cmd, args] = parseLine(line);
    if(cmd === CREATE) handleCreate(args[0]);
    if(cmd === LIST) handleList(args[0]);
    if(cmd === MOVE) handleMove(args[0], args[1]);
    if(cmd === DELETE) handleDelete(args[0]);
  };

  lines.forEach(line => {
    result.push(line);
    handleLine(line);
  });
  return result.join('\n');
};


describe('Directories', () => {
  it('Echos input', () => {
    let input = `
CREATE fruits
`;

    let expected = `
CREATE fruits
`;

    let actual = runCommands(input);
    expect(expected).to.equal(actual);
  });
  it('Lists current structure', () => {
    let input = `
CREATE fruits
CREATE vegetables
CREATE grains
CREATE fruits/apples
CREATE fruits/apples/fuji
LIST
`;

    let expected = `
CREATE fruits
CREATE vegetables
CREATE grains
CREATE fruits/apples
CREATE fruits/apples/fuji
LIST
fruits
  apples
    fuji
grains
vegetables
`;

    let actual = runCommands(input);
    expect(expected).to.equal(actual);
  });
  it('Handles move command', () => {
    let input = `
CREATE fruits
CREATE vegetables
CREATE grains
CREATE fruits/apples
CREATE fruits/apples/fuji
LIST
CREATE grains/squash
MOVE grains/squash vegetables
CREATE foods
MOVE grains foods
MOVE fruits foods
MOVE vegetables foods
LIST
`;

    let expected = `
CREATE fruits
CREATE vegetables
CREATE grains
CREATE fruits/apples
CREATE fruits/apples/fuji
LIST
fruits
  apples
    fuji
grains
vegetables
CREATE grains/squash
MOVE grains/squash vegetables
CREATE foods
MOVE grains foods
MOVE fruits foods
MOVE vegetables foods
LIST
foods
  fruits
    apples
      fuji
  grains
  vegetables
    squash
`;

    let actual = runCommands(input);
    expect(expected).to.equal(actual);
  });


  it('Handles delete case', () => {
    let input = `
CREATE fruits
CREATE vegetables
CREATE grains
CREATE fruits/apples
CREATE fruits/apples/fuji
LIST
CREATE grains/squash
MOVE grains/squash vegetables
CREATE foods
MOVE grains foods
MOVE fruits foods
MOVE vegetables foods
LIST
DELETE fruits/apples
DELETE foods/fruits/apples
LIST
`;

    let expected = `
CREATE fruits
CREATE vegetables
CREATE grains
CREATE fruits/apples
CREATE fruits/apples/fuji
LIST
fruits
  apples
    fuji
grains
vegetables
CREATE grains/squash
MOVE grains/squash vegetables
CREATE foods
MOVE grains foods
MOVE fruits foods
MOVE vegetables foods
LIST
foods
  fruits
    apples
      fuji
  grains
  vegetables
    squash
DELETE fruits/apples
Cannot delete fruits/apples - fruits does not exist
DELETE foods/fruits/apples
LIST
foods
  fruits
  grains
  vegetables
    squash
`;

    let actual = runCommands(input);
    expect(expected).to.deep.equal(actual);
  });
});