// https://www.hackerrank.com/challenges/minimum-distances/problem?isFullScreen=true

const testCase = [7, 1, 3, 4, 1, 7];

function solution(a: number[]): number {
  // Write your code here
  interface IHash {
    [key:number]: number
  }
  const hash:IHash = {};
  for (let i = 0; i < a.length; i++) {
    hash[a[i]] = hash[a[i]] + 1 || 1;
  }
  const filteredHash = Object.keys(hash)
    .filter((key:string) => hash[key] > 1 )
    // @ts-ignore
    .reduce((current:string, key:string) => Object.assign(current, {[key]: hash[key]}), {});
  const filteredKeys:Array<number> = Object.keys(filteredHash).map((item:string) => parseInt(item));
  let firsOccurrence:number = 0;
  let lastOccurrence:number = 0;
  let minDistance:number = 10**5;
  for (let i = 0; i < filteredKeys.length; i++) {
    firsOccurrence = a.findIndex((item:number) => item === filteredKeys[i]);
    a.splice(firsOccurrence, 1, null);
    lastOccurrence = a.findIndex((item:number) => item === filteredKeys[i]);
    minDistance = (firsOccurrence - lastOccurrence)*-1 < minDistance ? (firsOccurrence - lastOccurrence)*-1 : minDistance;
  }
  return minDistance === 10**5 ? -1 : minDistance;
}

console.log(solution(testCase));