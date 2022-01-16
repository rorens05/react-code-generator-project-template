
export const integerToRoman = (num) => {
  var romanLookup = {M:1000, D:500, C:100, L:50, X:10, V:5, I:1};
  var roman = [];
  var romanKeys = Object.keys(romanLookup);
  var curValue;
  var index;
  var count = 1;
  
  for(var numeral in romanLookup){
    curValue = romanLookup[numeral];
    index = romanKeys.indexOf(numeral);
    while(num >= curValue){
      if(count < 4){
        roman.push(numeral);
      } else {
        if(roman.indexOf(romanKeys[index - 1]) > -1){
          roman.splice(roman.indexOf(romanKeys[index - 1]));
          roman.push(romanKeys[index], romanKeys[index - 2]);
        } else {
         
          roman.splice(-3);
          roman.push(romanKeys[index], romanKeys[index - 1]);
        }
      }
      num -= curValue;
      count++;
    }
    count = 1;
  }
  return roman.join("");
}

