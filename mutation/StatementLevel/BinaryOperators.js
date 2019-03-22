var fs = require('fs');
var solm = require('solmeister');
var path = require('path');
var parser = require('solparse');

var amp = "&";
var pipe = "|";
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
	    '&&': '||',
	    '||': '&&',
	    '&': '|',
	    '|': '&',
	    "^": ['|', "&"],
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



exports.mutateBinaryOperator = function(file, filename){
//	console.log("Binary Operators Found");
	var ast;
	fs.readFile(file, function(err, data) {	
		if(err) throw err;
		console.log("Binary Operators");

	ast = parser.parse(data.toString());
	fs.writeFile('./ast', JSON.stringify(ast, null, 2));


		//using sol parser
	//	parser.visit(ast, {
	//		BinaryOperation: function(node) {
	//			if(node.operator != "="){
	//				console.log(node.operator + "\t --> \t" + operators[node.operator]);
					//node.operator = operators[node.operator];
	//			}
	//		}
				
		//USING json-to-ast
	//	var settings = {
	//		loc: true,
	//		source: file.substring(0, file.indexOf('.'));

		//});
		//TODO: FIX THIS
		//ast = jsonAST(

//		console.log(JSON.stringify(solp.parseFile(file)));
//		console.log("----------------------------------------------");

		fileNum = 1;
		let mutCode = solm.edit(data.toString(), function(node) {
			if(node.type === 'BinaryExpression') {
				var mutOperator;
				mutOperatorList = operators[node.operator];
				if(typeof mutOperatorList !== 'string'){
					mutOperator = mutOperatorList[Math.floor(Math.random()*mutOperatorList.length)];
				}else{
					mutOperator = mutOperatorList;
				}
				//if(node.operator != "&&"){
				//if(node.operator == "<="){ 
				//	console.log(node);
				//	console.log("---------------------------------------");
				//	console.log(node.parent);
				//}
				//
				//node.transform(node.getSourceCode().replace(node.operator, mutOperator));
				tmpNode = node.getSourceCode().replace(node.operator, mutOperator);

				//node2 = node;
				//while(typeof node2.parent !== "undefined"){
				//	node2 = node2.parent;
				//}

				console.log(mutOperator);

				fs.writeFile("./sol_output/" + filename + "/" 
				+ path.basename(file).slice(0, -4) + "BinMut" 
				+ fileNum.toString() + ".sol", data.toString().replace(node.getSourceCode(), tmpNode), 'ascii', function(err) {
					if(err) throw err;
				});
				fileNum++
			
					//console.log(node.operator)
					//console.log(mutOperator);
					//console.log(node.getSourceCode().replace(node.operator, mutOperator));

				//}
			}

		});
		
		//fs.writeFile("./sol_output/" 
		//+ path.basename(file).slice(0, -4) + "BinMut" 
		//+ fileNum.toString() + ".sol", mutCode, 'ascii', function(err) {
		//	if(err) throw err;
		//});
		//fileNum++;


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

