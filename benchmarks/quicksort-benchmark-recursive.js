// JavaScript program for implementation of QuickSort

const testCase = [];
for (let i = 0; i < 10**8; i++) {
  testCase.push(i);
}

const testCaseCopy = [...testCase];
const result = fisherYates(testCase);
console.log('sorted: ', testCaseCopy);
console.log('shuffled: ', result);
qSort(result, 0, result.length-1);
console.log('quicksortedArray: ', result);

function fisherYates(arr) {
  for (let i = 0; i < arr.length; i++) {
    let max = arr.length-1;
    let min = i
    const pointer = Math.floor(Math.random() * (max - min) + min);
    const tmp = arr[i];
    arr[i] = arr[pointer];
    arr[pointer] = tmp;
  }
  return arr;
}

/* This function takes last element
as pivot, places the pivot element
at its correct position in sorted
array, and places all smaller
(smaller than pivot) to left of
pivot and all greater elements to
right of pivot */
function partition(arr, low, high)
{
  let temp;
  let pivot = arr[high];

  // index of smaller element
  let i = (low - 1);
  for (let j = low; j <= high - 1; j++) {

    // If current element is
    // smaller than or
    // equal to pivot
    if (arr[j] <= pivot) {
      i++;

      // swap arr[i] and arr[j]
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }

  // swap arr[i+1] and arr[high]
  // (or pivot)
  temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;

  return i + 1;
}

/* The main function that implements
QuickSort() arr[] --> Array to be
sorted,
low --> Starting index,
high --> Ending index */
function qSort(arr, low, high)
{
  if (low < high) {
    /* pi is partitioning index,
    arr[pi] is now at right place */
    let pi = partition(arr, low, high);

    // Recursively sort elements
    // before partition and after
    // partition
    qSort(arr, low, pi - 1);
    qSort(arr, pi + 1, high);
  }
}
