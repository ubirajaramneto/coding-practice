//https://www.hackerrank.com/challenges/staircase/problem?isFullScreen=true&h_r=next-challenge&h_v=zen&h_r=next-challenge&h_v=zen

const testCase = 6;

function solution(n: number): void {
  // Write your code here
  for (let i = 1; i <= n; i++) {
    let row = '';
    for (let j = 1; j <= n; j++) {
      if(j > n - i) {
        row = row + '#'
      } else {
        row = row + ' ';
      }
    }
    console.log( row);
  }
}
solution(testCase);