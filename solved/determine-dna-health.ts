// https://www.hackerrank.com/challenges/determining-dna-health/problem?isFullScreen=true
// Basically we need to implement a suffix array and the longest common prefix array

const Genes = ['a','b','c','aa','d','b'];
const Health = [1,2,3,4,5,6];
const DNA = 'bcdybc';
const First = 2;
const Last = 4;

// Based on the test case above, output should be 2 integers, 0 and 19
function solution(genes: Array<string>, health: Array<number>, dna:string, first:number, last:number): void {
  const suffixArray = buildSuffixArray(dna);
  console.log(suffixArray);
  const genesArray = buildOrderedGeneArray(genes, health, first, last);
  const sum = calculateHealth(suffixArray, genesArray, dna);
  console.log('SUM: ', sum);
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

function buildOrderedGeneArray(genes:Array<string>, health:Array<number>, first:number, last:number) {
  let filteredGenes = genes.slice(first, last+1);
  let filteredHealth = health.slice(first, last+1);
  let concatenatedArray = filteredGenes.map((item, index) => {
    return `${item}:${filteredHealth[index].toString()}`;
  });
  return findDuplicateHealthEntry(concatenatedArray.sort());
}

function findDuplicateHealthEntry(health: Array<string>) {
  const h = {};
  for (let i = 0; i < health.length; i++) {
    const gene = health[i].split(':');
    h[gene[0]] = h[gene[0]] ? h[gene[0]] + parseInt(gene[1]) : parseInt(gene[1]);
  }
  return Object.keys(h).map((item) => `${item}:${h[item]}`);
}

/*
 * Algorithm:
 * Considering we have both geneHealth and suffixArray in order:
 * [ 'aaab', 'aab', 'ab', 'b', 'caaab' ]
 * [ 'aa:4', 'b:8', 'c:3', 'd:5' ]
 * We start with 2 pointers, i, j, each for their respective arrays.
 * considering i and j as 1:
 * ['aaab']
 * ['aa:4']
 * we extract the left side of the string aa of the geneHealth array,
 * and check if the respective substring is in the suffixArray item.
 * In the above example, it is, which will cause a match.
 *
 * We need to consider the following cases:
 *
 * Case1: when both suffixArray[i][k] && geneHealth[j][k], where k is the iterator for the substring suffixArray[i]
 * =============================
 * k = 0
 * i = 0
 * j = 0
 * sa = suffixArray[i][k] = ['aaab']
 *                            ^
 * gh = geneHealth[j][k] = ['aa']
 *                           ^
 * Keep iterating k until gh === sa.
 * Sum the corresponding gene.
 *
 * iterate i
 * =============================
 * k = 0
 * i = 1
 * j = 0
 * sa = suffixArray[i][k] = ['aab']
 *                            ^
 * gh = geneHealth[j][k] = ['aa']
 *                           ^
 * Keep iterating until gh === sa.
 * Sum the corresponding gene.
 *
 * iterate i
 * =============================
 * k = 0
 * i = 2
 * j = 0
 * sa = suffixArray[i][k] = ['ab']
 *                            ^
 * gh = geneHealth[j][k] = ['aa']
 *                           ^
 * Keep iterating until gh === sa.
 * In this case, there is no match, sum does not happen.
 *
 * iterate i
 * =============================
 * k = 0
 * i = 3
 * j = 0
 * sa = suffixArray[i][k] = ['b']
 *                            ^
 * gh = geneHealth[j][k] = ['aa']
 *                           ^
 * Case2: sa !== gh && k ===0
 * In this case, it means that we should move j, in order to move forward and find the next available gene.
 * We move j because sa[k] > gh[k], if the case was that sa[k] < gh[k], we would then increment i.
 *
 * iterate j
 * =============================
 * k = 0
 * i = 3
 * j = 1
 * sa = suffixArray[i][k] = ['b']
 *                            ^
 * gh = geneHealth[j][k] = ['b']
 *                           ^
 * sa !== gh
 * Sum the corresponding gene.
 *
 * iterate i
 * =============================
 * k = 0
 * i = 4
 * j = 1
 * sa = suffixArray[i][k] = ['caaab']
 *                            ^
 * gh = geneHealth[j][k] = ['b']
 *                           ^
 * Case2: sa !== gh && k ===0
 * In this case, it means that we should move j, in order to move forward and find the next available gene.
 *
 * iterate j
 * =============================
 * k = 0
 * i = 4
 * j = 2
 * sa = suffixArray[i][k] = ['caaab']
 *                            ^
 * gh = geneHealth[j][k] = ['c']
 *                           ^
 * gh === sa
 * Sum the corresponding gene
 *
 * iterate i
 * end
 *
 * */

function calculateHealth(suffixArray:Array<number>, geneHealth:Array<string>, dna:string) {
  let sum = 0; // consider that all gene health values are positive integers
  let i = 0; // suffixArray pointer
  let j = 0; // geneHealth pointer
  while (j < geneHealth.length && i < suffixArray.length) {
    const gene = geneHealth[j].split(':');
    const suffix = dna.slice(suffixArray[i]);
    console.log('calc: ', gene, suffix, sum);
    if (gene[0][0] === suffix[0]) {
      if (suffix.includes(gene[0])) { // instead of iterating with k, just check to see if the first character matches
        sum += parseInt(gene[1]);
      }
      i += 1;
    } else if (suffix[0] > gene[0]) {
      j += 1;
    } else {
      i += 1;
    }
    if (i === suffixArray.length) j += 1;
    if (j === geneHealth.length) i += 1;
  }
  return sum;
}

solution(Genes, Health, DNA, First, Last);
