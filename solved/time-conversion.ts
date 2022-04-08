//https://www.hackerrank.com/challenges/time-conversion/problem?isFullScreen=true

const testCase = '12:05:45PM';

function solution(s: string): string {
  // Write your code here
  if (s.slice(s.length-2, s.length) ===  'PM') {
    console.log('ITS PM!!');
    if (parseInt(s.slice(0, 2)) === 12) return `12${s.slice(2, s.length-2)}`
    return `${parseInt(s.slice(0, 2)) + 12}${s.slice(2, s.length-2)}`
  } else {
    if (parseInt(s.slice(0, 2)) === 12) return `00${s.slice(2, s.length-2)}`
    return `${s.slice(0, s.length-2)}`
  }
}

console.log(solution(testCase));