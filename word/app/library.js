'use strict'
const words = {
  words(str) {
  	if(str === '') {
  		let msg = "No String to Perform Operation On";
  		return msg;
  	} else if(typeof(str) !== "string") {
  		let msg = "Invalid Input";
  		return msg;
  	}
  let obj = {};
  //Replace every \n \t with a space
  let repl = str.replace(/[\n\t]/g, " " );
  repl = repl.replace(/\s\s+/g, " " );
  //Split every word by a space
  repl = repl.split(" ");
  //Push every element in the array into the obj
  for(const i in repl){
    obj[repl[i]] = 1;
  }
  //Filter every element to count number of occurence
  
}
module.exports = words;