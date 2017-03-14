  'use strict'
const app = require('../app/library.js');

describe('Palindrome', function() {

  it('bob should return true', function() {
    expect(app.reverseString("bob")).toBeTruthy();
  });

  it('bob should return true', function() {
    expect(app.reverseString("b==o==b")).toBeTruthy();
  });

   it('typeof input should return string', function() {
    expect(typeof app.reverseString("mother")).toEqual("string");
  });

   it('123321 should be truthy', function() {
    expect(app.reverseString("123321")).toBeTruthy();
  });

   it('should return invalid input for unAnticipated Inputs', function() {
    expect(app.reverseString("{[1237&556]}")).toEqual('6557321');
  });

   it('should return invalid input for unAnticipated Inputs', function() {
   	const expectedCount = "Invalid Input, Expecting a string!";
    expect(app.reverseString(true)).toEqual(expectedCount);
  });

   it('should return invalid input for unAnticipated Inputs', function() {
   	const expectedCount = "Invalid Input, Expecting a string!";
    expect(app.reverseString(1233)).toEqual(expectedCount);
  });

   it('2+2=2+2 should be truthy', function() {
    expect(app.reverseString("2+2=2+2")).toBeTruthy();
  });

 it('<[o_o]> should be truthy', function() {
    expect(app.reverseString("<[o_o]>")).toBeTruthy();
  });

  it('mama  ---  mama //  mama should be truthy', function() {
    expect(app.reverseString("mama  ---  mama //  mama")).toBeTruthy();
  });

	it('bobbqwert should return bobbqwert', function() {
    expect(app.reverseString("bobbqwert")).toBe('trewqbbob');
  });
});

describe("Produce the reverse order of a word: ", function() {
  describe("Case for en empty string", function() {

    it("should return null for empty string", function() {
      expect(app.reverseString('')).toEqual(null);
    });

  });

  describe("Case for palindromes", function() {

    it("should return true for `anna`", function() {
      expect(app.reverseString('anna')).toEqual(true);
    });

    it("should return true for `NaN`", function() {
      expect(app.reverseString('NaN')).toEqual(true);
    });

    it("should return true for `civic`", function() {
      expect(app.reverseString('civic')).toEqual(true);
    });

  });

  describe("Case for normal words", function() {

    it("should return `skoob` for `books`", function() {
      expect(app.reverseString('books')).toEqual('skoob');
    });

    it("should return `nomolos` for `solomon`", function() {
      expect(app.reverseString('solomon')).toEqual('nomolos');
    });

    it("should return `csim` for `misc`", function() {
      expect(app.reverseString('misc')).toEqual('csim');
    });

  });

});
  
