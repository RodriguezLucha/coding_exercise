const chai = require('chai');
const expect = chai.expect;

const floodFill = (image, startRow, startCol, newColor) => {
  let startColor = image[startRow][startCol];
  let queue = [];
  queue.push([startRow, startCol]);
  let seen = new Set();

  const inBounds = ([r, c] = child) => r >= 0 && c >= 0 && r < image.length && c < image[0].length;

  while(queue.length){
    let current = queue.pop();
    if(seen.has(JSON.stringify(current))) continue;
    seen.add(JSON.stringify(current));

    let [row, col] = current;
    if(image[row][col] !== startColor) continue;
    image[row][col] = newColor;
    let children = [
      [row + 1, col],
      [row - 1, col],
      [row, col + 1],
      [row, col - 1]
    ].filter(c => inBounds(c));
    children.forEach(c => queue.push(c));
  }
  return image;
};

describe('Flood fill', () => {
  it('Basic BFS', () => {
    let image = [
      [1, 1, 1],
      [1, 1, 0],
      [1, 0, 1]
    ];

    let [row, col] = [1, 1];
    let newColor = 2;
    let expected = [
      [2, 2, 2],
      [2, 2, 0],
      [2, 0, 1]
    ];

    let actual = floodFill(image, row, col, newColor);
    expect(actual).to.deep.equal(expected);
  });
  it('Basic BFS 2', () => {
    return;
    let image = [
      [7, 7, 1],
      [7, 7, 0],
      [7, 0, 1]
    ];

    let [row, col] = [1, 1];
    let newColor = 2;
    let expected = [
      [2, 2, 1],
      [2, 2, 0],
      [2, 0, 1]
    ];

    let actual = floodFill(image, row, col, newColor);
    expect(actual).to.deep.equal(expected);
  });
});
