// interesting links:
// http://web.stanford.edu/class/archive/cs/cs166/cs166.1196/lectures/04/Small04.pdf
// https://www.youtube.com/watch?v=OIuG_Dqyl_s&t=228s
// https://www.cin.ufpe.br/~paguso/courses/if767/bib/Ko_2005.pdf

// Not solved yet, will return to this one once I have more time

import {readFileSync} from "fs";

const L = 'L';
const S = 'S';
const Sstar = 'S*';

type SAISInput = {
  S:string;
  SA:Array<string>;
  alphabet:Map<string, number>;
  bucketCount:Map<string, number>;
  buckets:Map<string, Array<number>>;
  types:Array<string>;
}

class EnhancedSuffixArray {

  S:string;
  SA:Array<number>;
  alphabet:Map<string, number>;
  bucketCount:Map<string, number>;
  buckets:Map<string, Array<number>>;
  bucketPointer:Map<string, number>;
  types:Array<string>;
  explicitSA: Array<string>;
  LMS: Array<number>;
  LMSSuffixSummary: Array<number>;
  LMSSuffixSummaryOffset: Array<number>;
  reverseBucket: Array<string>;

  constructor(S:string) {
    this.S = S + '$';
    this.SA = [];
    this.explicitSA = [];
    this.alphabet = new Map();
    this.bucketCount = new Map();
    this.buckets = new Map();
    this.bucketPointer = new Map();
    this.types = [];
    this.LMS = [];
    this.reverseBucket = [];
    this.classify();
  }

  inducedSorting(text:string = this.S, SA:any = this.SA) {
    this.positionLMSSuffixes(text);
    this.inducedSortL(text);
    this.inducedSortS(text);
    this.getSAFromMap();
  }

  positionLMSSuffixes(text) {
    for (let i = 0; i < this.types.length; i++) {
      if (this.types[i] === Sstar) {
        let bucket = this.buckets.get(text[i]);
        let pointer = this.bucketPointer.get(text[i]);
        bucket[pointer] = i;
        if (pointer > 0) pointer -= 1;
        this.buckets.set(text[i], bucket);
        this.bucketPointer.set(text[i], pointer);
      }
    }
    this.resetBucketPointersHead();
  }

  inducedSortL(text:string) {
    this.resetBucketPointersHead();
    this.buckets.forEach((value, key, map) => {
      this.reverseBucket.unshift(key);
      const bucket = map.get(key);
      for (let i = 0; i < bucket.length; i++) {
        if (this.types[bucket[i]-1] === L && bucket[i] > -1) {
          const SABucketToInsert = text[bucket[i]-1];
          let SAPointerOfBucket = this.bucketPointer.get(SABucketToInsert);
          const SABucket = this.buckets.get(SABucketToInsert);
          SABucket[SAPointerOfBucket] = bucket[i]-1;
          SAPointerOfBucket += 1;
          this.buckets.set(SABucketToInsert, SABucket);
          this.bucketPointer.set(SABucketToInsert, SAPointerOfBucket);
        }
      }
    });
  }

  inducedSortS(text:string) {
    this.resetBucketPointersEnd();
    for (let i = 0; i < this.reverseBucket.length-1; i++) {
      const bucket = this.buckets.get(this.reverseBucket[i]);
      for (let j = bucket.length-1; j >= 0; j--) {
        if (this.types[bucket[j]-1] === S || this.types[bucket[j]-1] === Sstar) {
          const SABucketToInsert = text[bucket[j]-1];
          let SAPointerOfBucket = this.bucketPointer.get(SABucketToInsert);
          const SABucket = this.buckets.get(SABucketToInsert);
          SABucket[SAPointerOfBucket] = bucket[j]-1;
          SAPointerOfBucket -= 1;
          this.buckets.set(SABucketToInsert, SABucket);
          this.bucketPointer.set(SABucketToInsert, SAPointerOfBucket);
        }
      }
    }
  }

  getCharCode(char:string) {
    if(char === '$' || !char) return 0;
    return char.charCodeAt(0)-96;
  }

  resetBucketPointersHead() {
    this.bucketPointer.forEach((value,key,map) => {
      map.set(key, 0);
    })
  }

  resetBucketPointersEnd() {
    this.bucketPointer.forEach((value,key,map) => {
      map.set(key, this.buckets.get(key).length-1);
    })
  }


  classify() {
    this.types.push(Sstar);
    let Ti = 0; // reverse counter for T
    for (let i = this.S.length-1; i > 0; i--) {
      const charCode = this.getCharCode(this.S[i]);
      const nextCharCode = this.getCharCode(this.S[i-1]);
      this.alphabet.set(this.S[i], charCode);
      !this.bucketCount.get(this.S[i])
        ? this.bucketCount.set(this.S[i], 1)
        : this.bucketCount.set(this.S[i], this.bucketCount.get(this.S[i]) + 1);
      if (this.types[Ti] === L && this.types[Ti-1] === S) {
        this.types[Ti-1] = Sstar;
      }
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
        this.buckets.get(keys[i]).push(-1);
      }
      this.bucketPointer.set(keys[i], this.buckets.get(keys[i]).length-1);
    }
    for (let i = 0; i < this.types.length; i++) {
      if (this.types[i] === Sstar) this.LMS.push(i);
    }
  }

  private _buildSA(value, key, map) {
    for (let i = 0; i < map.get(key).length; i++) {
      this.SA.push(map.get(key)[i]);
    }
  }

  private _buildExplicitSA() {
    for (let i = 0; i < this.SA.length; i++) {
      this.explicitSA.push(this.S.slice(this.SA[i]))
    }
  }

  getSAFromMap() {
    this.SA = [];
    this.explicitSA = [];
    this._buildSA = this._buildSA.bind(this);
    this.buckets.forEach(this._buildSA);
    this._buildExplicitSA();
    return this.SA;
  }
}

const esa = new EnhancedSuffixArray('mmiissiissiippii');
// const dna = readFileSync('./test-cases/test3.txt', {encoding: 'utf8'});
// const esa = new EnhancedSuffixArray(dna);
esa.inducedSorting();
console.log('buckets after induced sorting: ', esa.buckets, esa.SA);
