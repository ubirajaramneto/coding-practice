// https://www.hackerrank.com/challenges/birthday-cake-candles/problem?isFullScreen=true&h_r=next-challenge&h_v=zen

const testCase = [3, 2, 1, 3];

function solution(candles: Array<number>): number {
  // Write your code here
  const hash = {};
  let highest = 0;
  for (let i = 0; i < candles.length; i++) {
    if(candles[i] > highest) highest = candles[i];
    hash[candles[i]] = hash[candles[i]] + 1 || 1;
  }
  return hash[highest];
}

console.log(solution(testCase));