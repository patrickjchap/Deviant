var fs = require('fs');
var solm = require('solmeister');
var path = require('path');

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



exports.mutateStringOperator = function(file){
//	console.log("Binary Operators Found");
	var ast;
	fs.readFile(file, function(err, data) {	
		if(err) throw err;
		console.log("Unary Operators");


		fileNum = 1;
		let mutCode = solm.edit(data.toString(), function(node) {
			if(node.type === 'StateVariableDeclaration' && node.literal == "string") {
				tmpNode = node.getSourceCode().replace(node.value, "");
				
				//Writing to mutant file
				fs.writeFile("./sol_output/" 
				+ path.basename(file).slice(0, -4) + "StrMut" 
				+ fileNum.toString() + ".sol", data.toString().replace(node.getSourceCode(), tmpNode), 'ascii', function(err) {
					if(err) throw err;
				});
				fileNum++
			
			}

		});
		
	})
	
}

