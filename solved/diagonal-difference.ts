const testCase =
  [ [1,2,3],
    [4,5,6],
    [9,8,9]];

function solution(args: Array<Array<number>>):number {
  let sumDiagA = 0;
  let sumDiagB = 0;
  let result:number;
  for (let i = 0; i < args.length; i++) {
    sumDiagA = sumDiagA + args[i][i];
  }
  let rowPointer = 0;
  for (let i = args.length - 1; i >= 0; i--) {
    console.log('diagB: ', args[rowPointer][i]);
    sumDiagB = sumDiagB + args[rowPointer][i];
    rowPointer += 1;
  }
  console.log('sums: ', sumDiagA, sumDiagB);
  const absoluteDiff = sumDiagA - sumDiagB;
  return absoluteDiff < 0 ? absoluteDiff * -1 : absoluteDiff;
}

console.log(solution(testCase));