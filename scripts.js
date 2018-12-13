var app = app || {};

app.randomNumber = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

app.swapIndexes = function(arr, ind1, ind2)  {
  var safePlace = arr[ind1];
  arr[ind1] = arr[ind2];
  arr[ind2] = safePlace;
}


app.bubbleSort = function(arrayToSort) {
  var size = arrayToSort.length;
  var endCursor = size -1;
  var continueLooping = true;
  while(continueLooping) {
    var swapped = false;
    for(var i = 0; i < endCursor; i++) {
      if(arrayToSort[i] >arrayToSort[i+1]){
        app.swapIndexes(arrayToSort, i, i +1);
        swapped = true;
      }
    }
    endCursor--;
    if(!swapped || endCursor === 0) {
      continueLooping = false;
    }
  }
  return arrayToSort;
}


app.merge = function(left, right){
  var resultArray = [];
  var stillMerging = true;
  var indexForLeft = 0;
  var indexForRight = 0;
  
  while(true){
    var leftHasValues = indexForLeft < left.length;
    var rightHasValues = indexForRight < right.length;
    
    if(leftHasValues && rightHasValues) {
      if(left[indexForLeft] < right[indexForRight]){
        resultArray.push(left[indexForLeft]);
        indexForLeft++;
      } else {
        resultArray.push(right[indexForRight]);
        indexForRight++;
      }
    } else if(leftHasValues) {
      resultArray.push(left[indexForLeft]);
      indexForLeft++;
    } else if(rightHasValues) {
      resultArray.push(right[indexForRight]);
      indexForRight++;
    } else {
      break;
    }
  }
  return resultArray;
}

app.mergeSort = function(arrayToSort) {
  var size = arrayToSort.length;
  if(size === 1) { return arrayToSort; }
  
  var splitSpot = Math.floor(size / 2);
  var leftArr = [];
  var rightArr = [];
  for(var i = 0; i < size; i++) {
    if(i < splitSpot) {
      leftArr.push(arrayToSort[i]);
    } else {
      rightArr.push(arrayToSort[i]);
    }
  }
  
  var leftSorted = app.mergeSort(leftArr);
  var rightSorted = app.mergeSort(rightArr);
  
  var result = app.merge(leftSorted, rightSorted);
  return result;
}


$(function() {
  var results = {
    items: 30000
  };
    
  var array = [];
  var t0 = performance.now();
  
  for(var i = 0; i < results.items; i++){
    array.push(app.randomNumber(0, 100000));
  }

  console.log('first ten', _.slice(array, 0, 10));
  var mergeSorted = app.mergeSort(array);
  results.merge = Math.round(performance.now()-t0);
  
  console.log('Merge took', results.merge, 'ms and returned array starting ', _.slice(mergeSorted, 0, 10));

  t0 = performance.now();
  app.bubbleSort(array);
  results.bubble = Math.round(performance.now()-t0);
  console.log('Bubble took', results.bubble, 'ms and returned array starting ', _.slice(array, 0, 10));
 
  
  var template = $('#template').html();
  Mustache.parse(template);
  var el = $('#target');
  var rendered = Mustache.render(template, results);
  el.html(rendered);
});





