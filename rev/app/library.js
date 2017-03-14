'use strict'
const pally = {
	reverseString(str) {
		if(typeof str !== "string") {
			const msg = "Invalid Input, Expecting a string!"
			return msg;
		}
		else if(str === ""){
			return null;
		}
		let str_split  = str.toLowerCase();
		str_split = str_split.replace(/[\W_]/g,"");
		const final = str_split.split("").reverse().join("");
		return (str_split === final)? true: final;
}
}
module.exports = pally;