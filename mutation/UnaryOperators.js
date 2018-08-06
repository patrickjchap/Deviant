var parser = require("solidity-parser-antlr");
var fs = require('fs');
var operators = {
	    "--": "++",
	    "++": "--"
};

exports.mutateUnaryOperator = function(file){
	var newData;
	fs.readFile(file, function(err, data) {	
		if(err) throw err;
		console.log("Unary Operators");
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
			UnaryOperation: function(node) {
				if(node.operator != "!"){
					console.log(node.operator + "\t --> \t" + operators[node.operator]);
					node.operator = operators[node.operator];
				}
			}
		});
	});
	
}

