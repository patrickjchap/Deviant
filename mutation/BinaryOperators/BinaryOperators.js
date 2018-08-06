var parser = require("solidity-parser-antlr");
var fs = require('fs');
var operators = {
            "+": '-',
            "-": '+',
            "*": '/',
            "/": '*',
            "%": '*',
            "<": ['<=', '>='],
            "<=": ['<', '>'],
            ">": ['>=', '<='],
            ">=": ['>', '<'],
            "==": '!=',
            "!=": '==',
            "===": "!==",
            "!==": "===",
	    "&&": "||",
	    "||": "&&",
	    "&": "|",
	    "^": ["|", "&"],
	    "<<": ">>",
	    ">>": "<<"
};

exports.mutateBinaryOperator = function(file){
//	console.log("Binary Operators Found");
	var newData;
	fs.readFile(file, function(err, data) {	
		if(err) throw err;
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
			BinaryOperation: function(node) {
				if(node.operator != "="){
					console.log(node.operator + "\t --> \t" + operators[node.operator]);
					node.operator = operators[node.operator];
				}
			}
		});
		//var lines = data.toString().split("\n");
		//for(var line in lines){
		//	var words = lines[line].split(" ");
		//	for(var word in words){
		//		if(operators.hasOwnProperty(words[word])){
		//			console.log(words[word] + " " + operators[words[word]]);
		//		}
		//	}
		//}
	})
	
}

