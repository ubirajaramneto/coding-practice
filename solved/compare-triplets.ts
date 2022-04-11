// https://www.hackerrank.com/challenges/compare-the-triplets/problem?isFullScreen=true

/*
* Nor a or b will be greater than 3 in length.
* */
interface ITestCase {
  a:Array<number>,
  b:Array<number>
}

const testCase:ITestCase = {
  a: [17, 28, 30],
  b: [99, 16, 8]
};

function solution(args: ITestCase): Array<number> {
  /*
  * The solutions for this has linear time O(n), and linear space O(t) since we
  * need to compare both array items in order, without the use of any auxiliary data structure.
  */
  let ratingA = 0;
  let ratingB = 0;

  for (let i = 0; i < args.a.length; i++) {
    if(args.a[i] > args.b[i]) ratingA += 1;
    if(args.a[i] < args.b[i]) ratingB += 1;
  }

  return [ratingA, ratingB];

}

console.log(solution(testCase))
