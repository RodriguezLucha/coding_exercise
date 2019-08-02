const chai = require('chai');
const expect = chai.expect;

const canFinish = (numCourses, preRequisites) => {
  let graph = makeGraph(numCourses, preRequisites);

  for(let node of Object.keys(graph)){
    let seen = new Set();
    let cycle = false;

    const dfs = node => {
      if(cycle) return;
      if(seen.has(node)) cycle = true;
      seen.add(node);
      graph[node].forEach(n => dfs(n));
      seen.delete(node);
    };

    dfs(node);
    if(cycle) return false;
  }
  return true;
};

const makeGraph = (numCourses, preReqs) => {
  let graph = {};
  for(let i = 0; i < numCourses; i++)
    graph[i] = [];

  preReqs.forEach(p => graph[p[0]].push(p[1]));
  return graph;
};

describe('Course Schedule', () => {
  it('Example 1', () => {
    let actual = canFinish(2, [[1, 0]]);
    expect(actual).to.equal(true);
  });
  it('Example 2', () => {
    let actual = canFinish(2, [[1, 0], [0, 1]]);
    expect(actual).to.equal(false);
  });
  it('Example 3', () => {
    let actual = canFinish(3, [[1, 0], [1, 2], [0, 1]]);
    expect(actual).to.equal(false);
  });
  it('Example 4', () => {
    let actual = canFinish(3, [[0, 1], [0, 2], [1, 2]]);
    expect(actual).to.equal(true);
  });
});
