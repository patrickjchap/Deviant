var parser = require("solidity-parser-antlr");
var fs = require('fs');
var solm = require('solmeister');
var solp = require('solidity-parser');
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
	    "&&": "\|\|",
	    "\\|\\|": "&&",
	    "&": "\|",
	    "\\|": "&",
	    "^": ["\\|", "&"],
	    "<<": ">>",
	    ">>": "<<"
};

let options = {
	format: {
		indent: {
			style: '\t',
			base: 0
		},
		newline: '\n\n',
		space: ' ',
		quotes: 'double'
	}
};

exports.mutateBinaryOperator = function(file){
//	console.log("Binary Operators Found");
	var ast;
	fs.readFile(file, function(err, data) {	
		if(err) throw err;
		console.log("Binary Operators");

		try {
			ast = parser.parse(data.toString());
		} catch(e) {
			//if(e instanceof parser.ParserError){
			//	console.log(e.errors);
			//}
			//console.log(e.errors);
			//throw new Error("Parser Error");
		}
		parser.visit(ast, {
			BinaryOperation: function(node) {
				if(node.operator != "="){
					console.log(node.operator + "\t --> \t" + operators[node.operator]);
					//node.operator = operators[node.operator];
				}
			}
		});

//		console.log(JSON.stringify(solp.parseFile(file)));
//		console.log("----------------------------------------------");
		let mutCode = solm.edit(data.toString(), function(node) {
			if(node.type === 'BinaryExpression') {
				var mutOperator;
				mutOperatorList = operators[node.operator];
				if(typeof mutOperatorList !== 'string'){
					mutOperator = mutOperatorList[Math.floor(Math.random()*mutOperatorList.length)];
				}else{
					mutOperator = [mutOperatorList];
				}
				node.transform(node.getSourceCode().replace(node.operator, mutOperator));
			}
		});
		
		fs.writeFile(file.substring(0, file.indexOf('.')) + "-BinMut.sol", mutCode, function(err) {
			if(err) throw err;
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

