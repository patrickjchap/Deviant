//var parser = require("solidity-parser-antlr");
var fs = require('fs');
var solm = require('solmeister');
//var solp = require('solidity-parser');
var parser = require('solparse');
var path = require('path');

var operators = {
            "public": ['internal', 'private', 'external'],
	    'internal': ['public', 'private', 'external'],
	    'private': ['public', 'internal', 'external'],
            "external": ['public', 'internal', 'private']
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



exports.mutateFunctionVisibilityOperator = function(file, filename){
	var ast;
	fs.readFile(file, function(err, data) {	
		if(err) throw err;

		fileNum = 1;
		let mutCode = solm.edit(data.toString(), function(node) {
			if(node.type === 'ModifierArgument' && operators[node.name] != null) {
				console.log(node.parent.getSourceCode());

				tmpNodeSC1 = node.parent.getSourceCode().replace(node.name, operators[node.name][0]);
				tmpNodeSC2 = node.parent.getSourceCode().replace(node.name, operators[node.name][1]);
				tmpNodeSC3 = node.parent.getSourceCode().replace(node.name, operators[node.name][2]);

				fs.writeFile("./sol_output/" + filename + "/"
				+ path.basename(file).slice(0, -4) + "FunctionVisMut" 
				+ fileNum.toString() + ".sol", data.toString().replace(node.parent.getSourceCode(), tmpNodeSC1), 'ascii', function(err) {
					if(err) throw err;
				});
				fileNum++;

				fs.writeFile("./sol_output/" + filename + "/"
                                + path.basename(file).slice(0, -4) + "FunctionVisMut"
                                + fileNum.toString() + ".sol", data.toString().replace(node.parent.getSourceCode(), tmpNodeSC2), 'ascii', function(err) {
                                        if(err) throw err;
                                });
                                fileNum++;

				fs.writeFile("./sol_output/" + filename + "/"
                                + path.basename(file).slice(0, -4) + "FunctionVisMut"
                                + fileNum.toString() + ".sol", data.toString().replace(node.parent.getSourceCode(), tmpNodeSC3), 'ascii', function(err) {
                                        if(err) throw err;
                                });
                                fileNum++;


			
			}

		});
		
	})
	
}

