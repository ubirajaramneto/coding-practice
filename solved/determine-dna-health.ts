// https://www.hackerrank.com/challenges/determining-dna-health/problem?isFullScreen=true
// Basically we need to implement a suffix array and the longest common prefix array
// Just going to drop this brain dump here with all my experiments on the subject for later reference.

interface ITestCase {
  baseCase: {
    genes: Array<string>,
    health: Array<number>
  },
  genes: {
    d: string,
    first: number,
    last: number
  }
}

const testCase = {
  baseCase: {
    genes: ['a', 'b', 'c', 'aa', 'd', 'b'],
    health: [1,2,3,4,5,6]
  },
  genes: {
    d: 'caaab',
    first: 1,
    last:5
  }
};

// Based on the test case above, output should be 2 integers, 0 and 19
function solution(args: ITestCase): void {
  // Write your code here
  // let solve this first with the hash structures so we can have a better idea.
  // HASH SOLUTION =======================================
  let S=args.genes.d;
  // let S='ABABA';
  // Add lexicographic lowest character $.
  // S=S+'$';
  // console.log('S: ', S);
  // const stringHash = buildStringHash(S);
  // console.log('String hash: ', stringHash);
  // const suffixHash = buildSuffixHash(stringHash);
  // console.log('Suffix hash: ', suffixHash);
  // const LCP = buildLCPHash(suffixHash, S);
  // console.log('LCP: ', LCP);
  // ARRAY SOLUTION =======================================
  const suffixArray = buildSuffixArray(S);
  console.log(suffixArray);
  const lcp = buildLCPArray(suffixArray, S);
  console.log(lcp);
  const geneHash = buildGeneHealthHash(args);
  console.log(geneHash);
  const healthScore = calculateHealth(suffixArray, S, args, geneHash);
  console.log('SCORE: ', healthScore)

}

type TStringHash = {
  [key:string]: number
}

function buildStringHash(S):TStringHash {
  const result = {};
  for (let i = 0; i < S.length; i++) {
    const suffix = S.slice(i, S.length);
    result[suffix] = i;
  }
  return result;
}

function buildSuffixHash(SH:TStringHash):TStringHash {
  const result = {};
  const SHKeys = Object.keys(SH).sort();
  for (let i = 0; i < SHKeys.length; i++) {
    console.log('SA: ', SHKeys[i]);
    result[i] = SH[SHKeys[i]];
  }
  return result;
}

function buildLCPHash(SH:TStringHash, S:string) {
  const result = {0: 0};
  for (let i = 1; i < Object.keys(SH).length; i++) {
    const suffix = getSuffix(SH, S, i);
    const prevSuffix = getSuffix(SH, S, i-1);
    let LCP = 0;
    for (let j = 0; j < suffix.length; j++) {
      if (suffix[j] !== prevSuffix[j] && j === 0) break;
      if (suffix[j] !== '$' && suffix[j] === prevSuffix[j]) LCP += 1;
    }
    result[i] = LCP;
  }
  return result;
}

function getSuffix(SH:TStringHash, S:string, index) {
  return S.slice(SH[index]);
}

function buildSuffixArray(S:string):Array<number> {
  const result = [];
  let unsortedSA = [];
  let sortedSA = [];
  for (let i = 0; i < S.length; i++) {
    unsortedSA.push(S.slice(i));
  }
  sortedSA = [...unsortedSA];
  sortedSA.sort();
  console.log(sortedSA);
  for (let i = 0; i < sortedSA.length; i++) {
    result.push(unsortedSA.indexOf(sortedSA[i]));
  }
  return result;
}

function buildLCPArray(SA:Array<number>, S:string) {
  const lcp = [0]; // by convention the first item is always 0
  for (let i = 1; i < SA.length; i++) {
    let lcpCounter = 0;
    const currentSuffix = S.slice(SA[i]);
    const prevSuffix = S.slice(SA[i-1]);
    for (let j = 0; j < currentSuffix.length; j++) {
      if (j === 0 && currentSuffix[j] !== prevSuffix[j]) break;
      if (currentSuffix[j] !== '$' && currentSuffix[j] === prevSuffix[j]) lcpCounter += 1;
    }
    lcp.push(lcpCounter);
  }
  return lcp;
}

type TCompressedTrie = {
  root: boolean,
  children: TCompressedTrie,
  leaf: boolean
}

function buildGeneHealthHash(gene:ITestCase) {
  const result = {};
  for (let i = 0; i < gene.baseCase.genes.length; i++) {
    result[i] = {
      gene: gene.baseCase.genes[i],
      health: gene.baseCase.health[i]
    }
  }
  return result;
}

function calculateHealth(SA:Array<number>, S:string, sample:ITestCase, geneHealth:object) {
  let unhealthiest = 0;
  let healthiest = 0;
  for (let i = 0; i < SA.length; i++) {
    const suffix = S.slice(SA[i], S.length);
    console.log('suffix: ', suffix);
    let sum = 0;
    for (let j = sample.genes.first; j <= sample.genes.last; j++) {
      if (suffix.includes(geneHealth[j].gene)) sum += geneHealth[j].health;
      console.log('geneHealth: ', geneHealth[j].gene, sum);
    }
    if (sum > healthiest) healthiest = sum;
    if (sum < unhealthiest) unhealthiest = sum;
  }
  return {unhealthiest, healthiest};
}

solution(testCase)

/*
* based on the lecture on strings from MIT OCW, there is a certain way this problem can be solved.
* based on weighted trees and trays.
*
* Interesting resources:
*
* https://en.wikipedia.org/wiki/LCP_array
* https://en.wikipedia.org/wiki/Suffix_tree#CITEREFFarach1997
* https://en.wikipedia.org/wiki/Trie
* https://en.wikipedia.org/wiki/Radix_tree
* https://en.wikipedia.org/wiki/Suffix_array
* This following link explains in detail the building of a suffix tree
* https://www.cise.ufl.edu/~sahni/dsaaj/enrich/c16/suffix.htm
*/
