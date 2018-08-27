/* Requirements */
var mutations = require('./mutation');
const parse = require('json-to-ast');

/* Settings for json to ast parser */
const settings = {
  // Appends location information. Default is <true>
  loc: true, 
  // Appends source information to node’s location. Default is <null>
  source: 'data.json'
};

parse('{"a": 1}', settings);

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
	
//	settings = {
//		loc: true;
//		source: "./generated_ast/" + args[i] +"-AST.json";
//	}

	mutations.generateMutant(args[i]);
}
