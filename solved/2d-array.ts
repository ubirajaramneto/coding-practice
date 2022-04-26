const testCase = [
  [0, -4, -6, 0, -7, -6],
  [-1, -2, -6, -8, -3, -1],
  [-8, -4, -2, -8, -8, -6],
  [-3, -1, -2, -5, -7, -4],
  [-3, -5, -3, -6, -6, -6],
  [-3, -6, 0, -8, -6, -7],
]

function hourglassSum(arr: number[][]): number {
  // Write your code here
  function iteratePosition(pattern: Array<Array<number>>) {
    const result = [...pattern]
    if (result[0][2] < 6) {
      result[0][1] += 1;
      result[0][2] += 1;
      result[1][1] += 1;
      result[1][2] += 1;
      result[2][1] += 1;
      result[2][2] += 1;
    }
    return result;
  }

  function iterateLine(pattern: Array<Array<number>>) {
    const result = [...pattern];
    if (result[0][2] === 6) {
      result[0][0] += 1;
      result[0][1] = 0;
      result[0][2] = 2;
      result[1][0] += 1;
      result[1][1] = 1;
      result[1][2] = 1;
      result[2][0] += 1;
      result[2][1] = 0;
      result[2][2] = 2;
    }
    return result;
  }

  let result = -64; // considering -9 can appear anywhere, the minimum value we should start is 64 (63 if you are supper picky);
  // considering a zero index position system, lets mark the indexes of the positions that form
  // the hourglass shape in the array.
  let pattern = [[0,0,2],[1,1,1],[2,0,2]];
  while (pattern[0][0] <= 3) {
    let sum = 0;
    for (let j = 0; j < pattern.length; j++) {
      const line = pattern[j][0];
      const startPos = pattern[j][1];
      const endPos = pattern[j][2];
      for (let k = startPos; k <= endPos; k++) {
        console.log(arr[line][k]);
        if (arr[line][k]) sum += arr[line][k];
      }
    }
    // after sum, we need to increment the pattern array in a way that it scans from left to right top to bottom
    iteratePosition(pattern);
    iterateLine(pattern)
    console.log('SUM: ', sum);
    if (sum > result) result = sum;
  }
  return result
}

console.log(hourglassSum(testCase));