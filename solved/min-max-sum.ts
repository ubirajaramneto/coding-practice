// https://www.hackerrank.com/challenges/mini-max-sum/problem?isFullScreen=true

const testCase = [7, 69, 2, 221, 8974];

function solution(arr: Array<number>): void {
  // Write your code here
  let min;
  let max;
  arr.sort((a,b) => a - b);
  for (let i = 0; i < arr.length; i++) {
    let sum = 0;
    for (let j = 0; j < arr.length; j++) {
      if(j !== i) {
        sum += arr[j];
        console.log('PARTIAL: ', sum);
      }
    }
    console.log('=================')
    if(!min) min = sum;
    if(!max) max = sum;
    if (sum < min) min = sum;
    if (sum > max) max = sum;
  }
  console.log(min, max);
}
solution(testCase);