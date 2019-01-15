//var parser = require("solidity-parser-antlr");
var fs = require('fs');
var solm = require('solmeister');
//var solp = require('solidity-parser');
var parser = require('solparse');
var path = require('path');

var operators = {
            "++": '--',
            "--": '++',
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



exports.mutateAddressOperator = function(file){
//	console.log("Binary Operators Found");
	var ast;
	fs.readFile(file, function(err, data) {	
		if(err) throw err;

		fileNum = 1;
		let mutCode = solm.edit(data.toString(), function(node) {
			if(node.type === 'UpdateExpression') {
				var mutOperator;
				mutOperatorList = operators[node.operator];
				console.log(typeof mutOperatorList);
				if(typeof mutOperatorList !== 'string'){
					mutOperator = mutOperatorList[Math.floor(Math.random()*mutOperatorList.length)];
				}else{
					mutOperator = mutOperatorList;
				}
				tmpNode = node.getSourceCode().replace(node.operator, mutOperator);

				console.log(mutOperator);

				fs.writeFile("./sol_output/" 
				+ path.basename(file).slice(0, -4) + "UpdateMut" 
				+ fileNum.toString() + ".sol", data.toString().replace(node.getSourceCode(), tmpNode), 'ascii', function(err) {
					if(err) throw err;
				});
				fileNum++
			
			}

		});
		
	})
	
}

