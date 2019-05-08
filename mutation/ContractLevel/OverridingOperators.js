//var parser = require("solidity-parser-antlr");
var fs = require('fs');
var solm = require('solmeister');
//var solp = require('solidity-parser');
var parser = require('solparse');
var path = require('path');
var utility = require('../utility/utility.js');


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

buildOverriddingList = function(file) {
	//gathering location of files that contract inherits from
    importList = utility.collectImportContracts(file);
    inheritedList = utility.collectInheritedContracts(file);
    matchList = utility.matchInheritedImportedContracts(inheritedList, importList);

    functionMatchLists = [];
    //changing path to match relation to original contract
    for(var i = 0; i < matchList.length; i++) {
        functionMatchLists.push(utility.collectContractFunctions(
            path.dirname(file) + '/' + matchList[i])
        );
    }

    currFunctionList = utility.collectContractFunctions(file);
    overridingList = [];
    for(var i = 0; i < functionMatchLists.lengthi; i++) {
        for(var j = 0; j < functionMatchLists[i].length; j++){
            //if both lists contain same function name
            if(currFunction.indexOf(functionMatchLists[i][j]) > -1){
                overridingList.push(functionMatchLists[i][j]);
            }
        }
    }
	return overridingList;
}

exports.mutateOverrideFunctionDeleteOperator = function(file, filename){
	overridingList = buildOverridingList(file);

	fs.readFile(file, function(err, data) {	
		if(err) throw err;

		fileNum = 1;
		let mutCode = solm.edit(data.toString(), function(node) {
			
			if(node.type == 'FunctionDeclaration' && overridingList.indexOf(node.name) > -1) {
				fs.writeFile("./sol_output/" + filename + "/"  
				+ path.basename(file).slice(0, -4) + "OverriddenFunctionDelete" 
				+ fileNum.toString() + ".sol", data.toString().replace(node.getSourceCode(),
				""), 'ascii', function(err) {
					if(err) throw err;
				});
				fileNum++;
			}
		});
		
	})
	
}

exports.mutateOverrideFunctionCPC = function(file, filename) {
   overridingList = buildOverridingList(file); 

	fs.readFile(file, function(err, data) {
        if(err) throw err;

        fileNum = 1;
        let mutCode = solm.edit(data.toString(), function(node) {

            if(node.type == 'FunctionDeclaration' && overridingList.indexOf(node.name) > -1) {
                //appending mutant to change the function name
                replaceCode = node.getSourceCode().replace(node.name, node.name + "MUTANT");

                fs.writeFile("./sol_output/" + filename + "/"
                + path.basename(file).slice(0, -4) + "OverriddenFunctionRename"
                + fileNum.toString() + ".sol", data.toString().replace(node.getSourceCode(),
                replaceCode), 'ascii', function(err) {
                    if(err) throw err;
                });
                fileNum++;
            }
        });

    })


}

exports.mutateOverrideFunctionRename = function(file, filename) {
	overridingList = buildOverridingList(file);

    fs.readFile(file, function(err, data) {
        if(err) throw err;

        fileNum = 1;
        let mutCode = solm.edit(data.toString(), function(node) {

            if(node.type == 'FunctionDeclaration' && overridingList.indexOf(node.name) > -1) {
				//appending mutant to change the function name
				replaceCode = node.getSourceCode().replace(node.name, node.name + "MUTANT");
				
				fs.writeFile("./sol_output/" + filename + "/"
                + path.basename(file).slice(0, -4) + "OverriddenFunctionRename"
                + fileNum.toString() + ".sol", data.toString().replace(node.getSourceCode(),
                replaceCode), 'ascii', function(err) {
                    if(err) throw err;
                });
                fileNum++;
            }
        });

    })

}
