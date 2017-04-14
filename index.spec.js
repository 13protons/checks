const chai = require('chai');
const convert = require('./index.js');
chai.should();

var samples = {
  45: 'fourty five dollars',
  1: 'one dollar',
  5: 'five dollars',
  9: 'nine dollars',
  12: 'twelve dollars',
  15: 'fifteen dollars',
  17: 'seventeen dollars',
  26: 'twenty six dollars',
  78: 'seventy eight dollars',
  109: 'one hundred nine dollars',
  333: 'three hundred thirty three dollars',
  89459: 'eighty nine thousand four hundred fifty nine dollars',
  4359226: 'four million three hundred fifty nine thousand two hundred twenty six dollars',
  '9.95': 'nine dollars and ninety five cents',
  '25.05': 'twenty five dollars and five cents',
  '1.01': 'one dollar and one cent'
}

describe('convert', function(){
  it('should return a string', function(){
    convert(45678).should.be.a('string');
  })

  describe('samples', function(){
    Object.keys(samples).forEach(function(num){
      it(num, function(){
        convert(num).should.equal(samples[num]);
      })
    })
  })
})
