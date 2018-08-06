var parser = require("solidity-parser-antlr");
var fs = require('fs');
var operators = {
	    "true": "false",
	    "false": "true",
	    "!": ""
};

exports.mutateBooleanOperator = function(file){
	var newData;
	fs.readFile(file, function(err, data) {	
		if(err) throw err;
		console.log("Boolean Operators");
		var ast;

		try {
			ast = parser.parse(data.toString());
		} catch(e) {
			if(e instanceof parser.ParserError){
				console.log(e.errors);
			}
			throw new Error("Parser Error");
		}
		parser.visit(ast, {
			BooleanLiteral: function(node) {
					console.log(node.value + "\t --> \t" + operators[node.value]);
					node.value = operators[node.value];
			}
		});
	});
	
}

