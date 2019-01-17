//var parser = require("solidity-parser-antlr");
var fs = require('fs');
var solm = require('solmeister');
//var solp = require('solidity-parser');
var parser = require('solparse');
var path = require('path');

var operators = {
            "pure": ['payable', 'view'],
	    'payable': ['pure', 'view'],
	    'view': ['pure', 'payable'],
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



exports.mutateFunctionTypeOperator = function(file, filename){
	var ast;
	fs.readFile(file, function(err, data) {	
		if(err) throw err;

		fileNum = 1;
		let mutCode = solm.edit(data.toString(), function(node) {
			if(node.type === 'ModifierArgument' && operators[node.name] != null) {
				console.log(node.parent.getSourceCode());

				tmpNodeSC1 = node.parent.getSourceCode().replace(node.name, operators[node.name][0]);
				tmpNodeSC2 = node.parent.getSourceCode().replace(node.name, operators[node.name][1]);

				fs.writeFile("./sol_output/" + filename + "/" 
				+ path.basename(file).slice(0, -4) + "FunctionTypeMut" 
				+ fileNum.toString() + ".sol", data.toString().replace(node.parent.getSourceCode(), tmpNodeSC1), 'ascii', function(err) {
					if(err) throw err;
				});
				fileNum++;

				fs.writeFile("./sol_output/" + filename + "/"
                                + path.basename(file).slice(0, -4) + "FunctionTypeMut"
                                + fileNum.toString() + ".sol", data.toString().replace(node.parent.getSourceCode(), tmpNodeSC2), 'ascii', function(err) {
                                        if(err) throw err;
                                });
                                fileNum++;
			
			}

		});
		
	})
	
}

