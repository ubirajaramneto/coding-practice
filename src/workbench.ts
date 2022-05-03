import {readFileSync} from "fs";

const L = 'L';
const S = 'S';
const Sstar = 'S*';

class EnhancedSuffixArray {

  S:string;
  alphabet:Map<string, number>;
  bucketCount:Map<string, number>;
  buckets:Map<string, Array<number>>;
  types:Array<string>;

  constructor(S:string) {
    this.S = S + '$';
    this.alphabet = new Map();
    this.bucketCount = new Map();
    this.buckets = new Map();
    this.types = [];
  }

  buildSA() {

  }

  getCharCode(char:string) {
    if(char === '$' || !char) return 0;
    return char.charCodeAt(0)-96;
  }

  classify() {
    this.types.push(Sstar);
    let Ti = 0;
    for (let i = this.S.length-1; i > 0; i--) {
      const charCode = this.getCharCode(this.S[i]);
      const nextCharCode = this.getCharCode(this.S[i-1]);
      this.alphabet.set(this.S[i], charCode);
      !this.bucketCount.get(this.S[i])
        ? this.bucketCount.set(this.S[i], 1)
        : this.bucketCount.set(this.S[i], this.bucketCount.get(this.S[i]) + 1);
      if (this.types[Ti] === L && this.types[Ti-1] === S) this.types[Ti-1] = Sstar;
      if (nextCharCode < charCode) {
        this.types.push(S);
      }
      if (nextCharCode > charCode) {
        this.types.push(L);
      }
      if (nextCharCode === charCode) {
        this.types.push(this.types[this.types.length-1]);
      }
      Ti += 1;
    }
    this.types.reverse();
    const keys = Array.from(this.alphabet.keys()).sort();
    for (let i = 0; i < keys.length; i++) {
      this.buckets.set(keys[i], []);
      for (let j = 0; j < this.bucketCount.get(keys[i]); j++) {
        this.buckets.get(keys[i]).push(0);
      }
    }
  }
}

const esa = new EnhancedSuffixArray('immissiissippi');
// const dna = readFileSync('./test-cases/test3.txt', {encoding: 'utf8'});
// const esa = new EnhancedSuffixArray(dna);
esa.classify();
console.log('alphabet: ', esa.alphabet);
console.log('bucketCount: ', esa.bucketCount);
console.log('buckets: ', esa.buckets);
console.log('types: ', esa.types.join(' '));
// console.log('range: ', esa.types[0], esa.types[esa.types.length-1]);
console.log('string: ', esa.S.length);
// TODO: Modify this to implement counting sort and radix sort only.
