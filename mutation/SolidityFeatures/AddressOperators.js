//var parser = require("solidity-parser-antlr");
var fs = require('fs');
var solm = require('solmeister');
//var solp = require('solidity-parser');
var parser = require('solparse');
var path = require('path');

var operators = {
            'zero': '0x0',
            'random': '0x12345'
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



exports.mutateAddressOperator = function(file, filename){
	var ast;
	fs.readFile(file, function(err, data) {	
		if(err) throw err;

		fileNum = 1;
		var callNode = null;
		let mutCode = solm.edit(data.toString(), function(node) {
			
			//If contract has more than two calls to change addresses
			//to different contracts. Swap the calls.
			if(node.type === 'CallExpression' && node.callee.type == "Identifier") {
				
				//Check to see if node with call expression has already been found
				if(callNode == null) {
					callNode = node;
				}else{
					fs.writeFile("./sol_output/" + filename + "/"  
					+ path.basename(file).slice(0, -4) + "AddressMutCall" 
					+ fileNum.toString() + ".sol", data.toString().replace(node.getSourceCode(),
					callNode.getSourceCode()), 'ascii', function(err) {
						if(err) throw err;
					});
					fileNum++;
					callNode = null;
				}
			
			}else if(node.type == "AssignmentExpression"){
				console.log(node.left);
				if(node.left.literal != null && node.left.literal.literal == "address"){
					console.log("hello");
					tmpNodeZero = node.getSourceCode().replace(node.right.value, operators['zero']);
					tmpNodeRand = node.getSourceCode().replace(node.right.value, operators['random']);

					fs.writeFile("./sol_output/" + filename + "/"
                    + path.basename(file).slice(0, -4) + "AddressMutZero"
                    + fileNum.toString() + ".sol", data.toString().replace(node.getSourceCode(),
                    tmpNodeZero), 'ascii', function(err) {
                        if(err) throw err;
                    });
					fileNum++;
						
		            fs.writeFile("./sol_output/" + filename + "/"
                    + path.basename(file).slice(0, -4) + "AddressMutRand"
                    + fileNum.toString() + ".sol", data.toString().replace(node.getSourceCode(),
                    tmpNodeRand), 'ascii', function(err) {
                        if(err) throw err;
                    });
					fileNum++;
				}
			}

		});
		
	})
	
}

