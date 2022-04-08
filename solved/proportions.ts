const testCase = [-4, 3, -9, 0, 4, 1];

function solution(arr: number[]): void {
  // Write your code here
  let result;

  const numbers = {
    positive: 0,
    negative: 0,
    zero: 0
  }

  for (let i = 0; i < arr.length; i++) {
    if(arr[i] > 0 ) numbers.positive += 1;
    if(arr[i] < 0 ) numbers.negative += 1;
    if(arr[i] === 0 ) numbers.zero += 1;
  }

  const propPositive = (numbers.positive/arr.length).toFixed(6);
  const propNegative = (numbers.negative/arr.length).toFixed(6);
  const propZero = (numbers.zero/arr.length).toFixed(6);

  console.log(propPositive);
  console.log(propNegative);
  console.log(propZero);
}
solution(testCase);