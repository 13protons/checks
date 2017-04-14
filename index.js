let single = [' zero', ' one', ' two', ' three', ' four', ' five', ' six', ' seven', ' eight', ' nine'];
let teen = ['ten', ' eleven', ' twelve', ' thirteen', ' fourteen', ' fifteen', ' sixteen', ' seventeen', ' eighteen', ' nineteen'];
let tens = ['', ' ten', ' twenty', ' thirty', ' fourty', ' fifty', ' sixty', ' seventy', ' eighty', ' ninety']
let power = ['', ' thousand', ' million', ' billion', ' trillion'];
let DOLLAR = ' dollar';
let CENT = ' cent';

module.exports = function (_value) {
  // type safety
  let val = parseFloat(_value);
  if (typeof(val) !== 'number') {
    throw new Error('Only numbers can be converted');
  }

  // convert it
  let total = val.toString().split('.');
  let cents = '';
  let dollars = chunk(total[0], 3)
    .map(convertChunk)
    .reverse()
    .join(' ')
    .trim() + DOLLAR

  if (parseInt(total[0]) > 1){
    dollars += 's';
  }

  if(total[1]) {
    cents = ' and' + double(total[1]) + CENT
  }
  if (parseInt(total[1]) > 1){
    cents += 's';
  }
  return dollars + cents;
}

function double(digit) {
  let number = parseInt(digit);
  if (number >= 20) {
    return tens[digit[0]] + single[digit[1]];
  } else if (number >= 10) {
    return teen[digit[1]];
  }
  return single[digit[1]];
}

function convertChunk(group, i){
  let output = '';
  if (group.length > 2) {
    output = single[parseInt(group[0])] + ' hundred';
    output += double(group.slice(1, 3))
  } else if (group.length > 1) {
    output = double(group);
  } else {
    output = single[parseInt(group)];
  }

  output += power[i];
  return output.trim();
}

function chunk(num, grouping) {
  let str = num.toString();

  return Array
    .from(str)
    .reverse()
    .reduce(function(acc, val){
      var group = acc[acc.length - 1];
      if (!group || group.length >= grouping) {
        group = '';
        acc.push(group);
      }

      if (group.length < grouping) {
        group += val;
        acc[acc.length - 1] = group;
      }

      return acc;
    }, [])
    .map(function(val){
      // reverse order of string since we built it backwards
      return Array.from(val).reverse().join('');
    });
}
