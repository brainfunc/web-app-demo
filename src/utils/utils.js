import * as Collectibles from "./data/collectibles";
import * as Tasks from "./data/battles/tasks";

export const GetSortOrder = (prop) => {
  return function(a, b) {
      if (a[prop] > b[prop]) {
          return 1;
      } else if (a[prop] < b[prop]) {
          return -1;
      }
      return 0;
  }
}

export const GenerateSubCategoryIndex = function(categoryIndex) {
  var index, max, min;
  if(categoryIndex == 0) { min = 0; max = 4; }
  else if(categoryIndex == 1) { min = 5; max = 7; }
  else if(categoryIndex == 2) { min = 8; max = 10; }
  else if(categoryIndex == 3) { min = 11; max = 12; }
  index = Math.floor(Math.random() * (max - min + 1)) + min;
  return index;
}

export const NeuronSubCategoryCheck = function(categoryIndex, subcategoryIndex) {
  var max, min;
  if(categoryIndex == 0) { min = 0; max = 4; }
  else if(categoryIndex == 1) { min = 5; max = 7; }
  else if(categoryIndex == 2) { min = 8; max = 10; }
  else if(categoryIndex == 3) { min = 11; max = 12; }
  return (subcategoryIndex >= min && subcategoryIndex <= max);
}

export const BrainpartSubCategoryCheck = function(categoryIndex, subcategoryIndex) {
  var max, min;
  if(categoryIndex == 0) { min = 0; max = 4; }
  else if(categoryIndex == 1) { min = 5; max = 7; }
  else if(categoryIndex == 2) { min = 8; max = 10; }
  else if(categoryIndex == 3) { min = 11; max = 12; }
  return (subcategoryIndex >= min && subcategoryIndex <= max);
}

export const GetNeuronItemWithSubCategoryInArray = function(scIndex, neurons) {
  for(let i = 0;i < neurons.length; i++) {
    if(neurons[i].subcategoryIndex == scIndex) { return neurons[i]; }
  }
}
export const GetBrainPartItemWithSubcategoryInArray = function(scIndex, brainparts) {
  for(let i = 0;i < brainparts.length; i++) {
    if(brainparts[i].subcategoryIndex == scIndex) { return brainparts[i]; }
  }
}

export const GetResultOfBattle = function(
  timeTaken, combination, correctCombination) {
  var result = {
    time: timeTaken,
    correct: [],
    incorrect: []
  }
  // console.log(combination);
  for(var i=0; i < combination.length; i++) {
    if(correctCombination.includes(combination[i])){
      result.correct.push(combination[i])
    } else{
      result.incorrect.push(combination[i])
    }
  }
  return result;
}

export const GetCurrentBattleId = function() {
  const max = Tasks.Data.tasks.length; const min = 0;
  return Math.floor(Math.random() * (max - min)) + min;
}
