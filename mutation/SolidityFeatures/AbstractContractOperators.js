//var parser = require("solidity-parser-antlr");
var fs = require('fs');
var solm = require('solmeister');
//var solp = require('solidity-parser');
var parser = require('solparse');
var path = require('path');

var operators = {
            "send": 'transfer',
            "transfer": 'send',
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



exports.mutateAbstractContractOperator = function(file, filename){
//	console.log("Binary Operators Found");
	var ast;
	fs.readFile(file, function(err, data) {	
		if(err) throw err;

		fileNum = 1;
		let mutCode = solm.edit(data.toString(), function(node) {
			if(node.hasOwnProperty('parent') && node.parent != null 
			&& node.parent.hasOwnProperty('type')
			&& node.parent.type === 'FunctionDeclaration'
		    && node.type === 'BlockStatement') {

				fs.writeFile("./sol_output/" + filename + '/'
				+ path.basename(file).slice(0, -4) + "AbstractContract" 
				+ fileNum.toString() + ".sol", data.toString().replace(node.getSourceCode(), ";"), 'ascii', function(err) {
					if(err) throw err;
				});
				fileNum++
			
			}

		});
		
	})
	
}

