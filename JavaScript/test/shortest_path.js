const chai = require('chai');
const expect = chai.expect;

const shortestPath = (edges, start, end) => {
  let graph = makeGraph(edges);
  let parents = dijkstra(graph, start);
  let path = constructPath(parents, start, end);
  return path;
};

const makeGraph = (edges) => {
  let graph = {};
  edges.forEach(e => {
    let [from, to, weight] = e.split(' ');
    graph[from] = graph[from] || {};
    graph[from][to] = parseInt(weight);
    graph[to] = graph[to] || {};
  });
  return graph;
};

const dijkstra = (graph, start) => {
  let parents = {};
  let distances = {};
  let seen = new Set();
  let unseen = new Set(Object.keys(graph));
  distances[start] = 0;
  let a = start;

  while(unseen.size > 0){
    seen.add(a);
    unseen.delete(a);

    for(const [b, weight] of Object.entries(graph[a])){
      distances[b] = distances[b] || Number.MAX_VALUE;
      let newDistance = distances[a] + weight;
      let oldDistance = distances[b];
      if(newDistance < oldDistance){
        distances[b] = newDistance;
        parents[b] = a;
      }
    }
    let distance = Number.MAX_VALUE;
    unseen.forEach(notSeen => {
      if(distances[notSeen] <= distance){
        distance = distances[notSeen];
        a = notSeen;
      }
    });
  }

  return parents;
};

const constructPath = (parents, start, end) => {
  let path = [];
  let p = end;
  while(parents[p]){
    path.push(p);
    p = parents[p];
    if (p === start) path.push(start);
  }

  return path.reverse();
};

describe('Shortest Path', () => {
  it('basic', () => {
    //graphs drawn with https://metacpan.org/pod/Graph::Easy
    let picture = `
    8
    +----------------------+
    |                      v
  +----+  2   +---+  1   +---+  3   +---+
  | A  | ---> | B | ---> | C | ---> | E |
  +----+      +---+      +---+      +---+
    |                                 ^
    | 5                               |
    v                                 |
  +----+  4                           |
  | D  | -----------------------------+
  +----+
    `;
    let edges = [
      'A B 2',
      'A C 8',
      'A D 5',
      'B C 1',
      'C E 3',
      'D E 4'];

    let [start, end] = ['A', 'E'];
    let expected = ['A', 'B', 'C', 'E'];
    let actual = shortestPath(edges, start, end);

    expect(actual).to.deep.equal(expected);
  });
  it('basic2', () => {
    let picture = `
    2
    +---------------------+
    |                     v
  +---+  4   +---+  5   +---+  3   +---+  4   +---+  11   +---+
  | A | ---> | B | ---> | C | ---> | E | ---> | D | ----> | F |
  +---+      +---+      +---+      +---+      +---+       +---+
               |   10                           ^
               +--------------------------------+
  
    `;
    let edges = [
      'A B 4',
      'A C 2',
      'B C 5',
      'B D 10',
      'C E 3',
      'D F 11',
      'E D 4',
    ];

    let [start, end] = ['A', 'F'];
    let expected = ['A', 'C', 'E', 'D', 'F'];
    let actual = shortestPath(edges, start, end);

    expect(actual).to.deep.equal(expected);
  });
});