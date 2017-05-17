var expect = require('expect');
var isRealString  = require('../utils/validation.js');

describe('validating strings', ()=>{
  it('should reject non-string values', ()=>{
    var str1 = 13456;
      expect(isRealString(str1)).toBeFalsy();
  });

  it('should reject string with only spaces', () => {
      var str2 = "       ";
      expect(isRealString(str2)).toBeFalsy();
  });

  it('should allow string with non-space characters', () =>{
      var str3 = " Hello ";
      expect(isRealString(str3)).toBeTruthy();
  });

});