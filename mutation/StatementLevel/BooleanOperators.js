//var parser = require("solidity-parser-antlr");
var fs = require('fs');
var solm = require('solmeister');
//var solp = require('solidity-parser');
var parser = require('solparse');
var path = require('path');

var operators = {
            true: false,
            false: true,
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



exports.mutateBooleanOperator = function(file){
	var ast;
	fs.readFile(file, function(err, data) {	
		if(err) throw err;

		fileNum = 1;
		let mutCode = solm.edit(data.toString(), function(node) {
			if(node.type === 'Literal' && (node.value == true ||
                node.value == false)
            ) {
                mutOperator = operators[node.value];
				tmpNode = node.getSourceCode().replace(node.operator, mutOperator);

                fs.writeFile("./sol_output/" + filename + "/"
                    + path.basename(file).slice(0, -4) + "BooleanMut"
                    + fileNum.toString() + ".sol",
                    data.toString().replace(node.getSourceCode(),
                    tmpNode), 'ascii', function(err) {
                        if(err) throw err;
                    }
                );
                fileNum++
			}

		});
		
	})
	
}

