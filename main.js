/* Requirements */
var mutations = require('./mutation');

/* Arguments include Solidity file names */
var args = process.argv.slice(2);

/* Usage Functions */
var usage = (function() {
	console.log("Usage: node main.js <FileName.sol>");
	throw new Error();
});

if(args.length == 0)
	usage()

for(var i = 0; i < args.length; i ++) {
	if(!args[i].includes(".sol"))
		usage();
//	console.log(args[i]);
	mutations.generateMutant(args[i]);
}
