//var parser = require("solidity-parser-antlr");
var fs = require('fs');
var solm = require('solmeister');
//var solp = require('solidity-parser');
var parser = require('solparse');
var path = require('path');

var operators = {
            "assert": 'require',
            "require": 'assert',
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



exports.mutateErrorHandleOperator = function(file, filename){
//	console.log("Binary Operators Found");
	var ast;
	fs.readFile(file, function(err, data) {	
		if(err) throw err;

		fileNum = 1;
		let mutCode = solm.edit(data.toString(), function(node) {
			if(node.type === 'ExpressionStatement'
			   && node.expression.type === 'CallExpression') {
				
				if (node.expression.callee.name === 'require'
					|| node.expression.callee.name === 'assert') {
				
					var mutOperator;
					mutOperator = operators[node.expression.callee.name];
					tmpNode = node.getSourceCode().replace(node.expression.callee.name, mutOperator);
					
					console.log(node.getSourceCode());
					console.log(tmpNode);

					fs.writeFile("./sol_output/" + filename + '/'
						+ path.basename(file).slice(0, -4) + "ErrorHandle" 
						+ fileNum.toString() + ".sol", data.toString().replace(node.getSourceCode(),
						tmpNode), 'ascii', function(err) {
					
						if(err) throw err;
					});
					fileNum++;
				}

				if (node.expression.callee.name === 'revert'
				|| node.expression.callee.name === 'require'
				|| node.expression.callee.name === 'assert') {
					
					fs.writeFile("./sol_output/" + filename + '/'
                        + path.basename(file).slice(0, -4) + "ErrorHandle"
                        + fileNum.toString() + ".sol", data.toString().replace(node.getSourceCode(),
                        ""), 'ascii', function(err) {

                        if(err) throw err;
                    });
                    fileNum++;
				}
			
			}

		});
		
	})
	
}

