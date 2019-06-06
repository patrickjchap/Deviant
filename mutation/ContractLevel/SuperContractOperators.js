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

exports.mutateInsertSuper = function(file, filename){
	svList = utility.getParentStateVariables(file);
    overridingList = utility.buildOverridingList(file);

	fs.readFile(file, function(err, data) {	
		if(err) throw err;

		fileNum = 1;
		let mutCode = solm.edit(data.toString(), function(node) {
			
			if(node.type == 'CallExpression' && node.hasOwnProperty('callee')
                && overridingList.indexOf(node.callee.name) >= 0
            ) {
				tmpNode = node.getSourceCode().replace(node.callee.name,'super.'+node.callee.name);


                fs.writeFile("./sol_output/" + filename + "/"  
				    + path.basename(file).slice(0, -4) + "SuperInsert" 
				    + fileNum.toString() + ".sol", data.toString().replace(node.getSourceCode(),
				    tmpNode), 'ascii', function(err) {
					    if(err) throw err;
			        }
                );
			    fileNum++;
            }else if (node.type('AssignmentExpression') && node.hasOwnProperty('left')
                && svList.indexOf(node.left.name) >= 0
            ){
                tmpNode = node.getSourceCode().replace(node.left.name,'super.'+node.left.name);


                fs.writeFile("./sol_output/" + filename + "/"
                    + path.basename(file).slice(0, -4) + "SuperInsert"          
                    + fileNum.toString() + ".sol", data.toString().replace(node.getSourceCode(),
                    tmpNode), 'ascii', function(err) {
                        if(err) throw err;
                    }
                );
                fileNum++;

            }else if (node.type('BinaryExpression') && 
                (svList.indexOf(node.left.name) >= 0 || svList.indexOf(node.right.name) >=0)
            ){

                if(svList.indexOf(node.left.name) >= 0) {
                    tmpNode = node.getSourceCode().replace(node.left.name,'super.'+node.left.name);
                }else{
                    tmpNode = node.getSourceCode().replace(node.right.name,'super.'+node.right.name);
                }

                fs.writeFile("./sol_output/" + filename + "/"
                    + path.basename(file).slice(0, -4) + "SuperInsert"
                    + fileNum.toString() + ".sol", data.toString().replace(node.getSourceCode(),
                    tmpNode), 'ascii', function(err) {
                        if(err) throw err;
                    }
                );
                fileNum++;

            }

		});
		
	})
}

exports.mutateDeleteSuper = function (file, filename) {
    fs.readFile(file, function(err, data) {
        if(err) throw err;

        fileNum = 1;
        let mutCode = solm.edit(data.toString(), function(node) {

            if(node.type == 'MemberExpression' && node.hasOwnProperty('object')
                && node.object.name == 'super'    
            ) {

                fs.writeFile("./sol_output/" + filename + "/"
                + path.basename(file).slice(0, -4) + "SuperDelete"
                + fileNum.toString() + ".sol", data.toString().replace(node.getSourceCode(),
                "this"), 'ascii', function(err) {
                    if(err) throw err;
                });
                fileNum++;
            }
        });

    })
}

exports.mutateHidingVariableDelete = function (file, filename) {
    svList = utility.getParentStateVariables(file);

    fs.readFile(file, function(err, data) {
        if(err) throw err;

        fileNum = 1;
        let mutCode = solm.edit(data.toString(), function(node) {

            if(node.type == 'StateVariableDeclaration' && svList.indexOf(node.name) >= 0
            ) {

                fs.writeFile("./sol_output/" + filename + "/"
                    + path.basename(file).slice(0, -4) + "HidingVariableDelete"
                    + fileNum.toString() + ".sol", data.toString().replace(node.getSourceCode(),
                    ""), 'ascii', function(err) {
                        if(err) throw err;
                    }
                );
                fileNum++;
            }
        });
    });
}

exports.mutateHidingVariableInsert = function (file, filename) {
    svList = utility.getParentStateVariableDeclaration(file);

    fs.readFile(file, function(err, data) {
        if(err) throw err;

        fileNum = 1;
        let mutCode = solm.edit(data.toString(), function(node) {

            if(node.type == 'ContractStatement') {
                for(var i = 0; i < svList.length; i++) {
                    tmpNode = node.getSourceCode().replace('{', '{\n\t' + svList[i] + '\n');

                    fs.writeFile("./sol_output/" + filename + "/"
                        + path.basename(file).slice(0, -4) + "HidingVariableDelete"
                        + fileNum.toString() + ".sol", data.toString().replace(node.getSourceCode(),
                        tmpNode), 'ascii', function(err) {
                            if(err) throw err;
                        }
                    );
                    fileNum++;
                }
            }
        });
    });
}

exports.mutateTypeCastInsertion = function (file, filename) {
    pRefList = utility.getParentContractReference(file);

    fs.readFile(file, function(err, data) {
        if(err) throw err;
        var contractName = "";
        fileNum = 1;
        let mutCode = solm.edit(data.toString(), function(node) {
            if(node.type == 'ContractStatement') {
                contractName = node.name;
            }            

            if(node.hasOwnProperty('name') && pRefList.indexOf(node.name) >= 0) {
                for(var i = 0; i < svList.length; i++) {
                    tmpNode = node.getSourceCode().replace(node.name,
                        '(('+contractName+')'+node.name+')'
                    );

                    fs.writeFile("./sol_output/" + filename + "/"
                        + path.basename(file).slice(0, -4) + "TypeCastInsertion"
                        + fileNum.toString() + ".sol", data.toString().replace(node.getSourceCode(),
                        tmpNode), 'ascii', function(err) {
                            if(err) throw err;
                        }
                    );
                    fileNum++;
                }
            }
        });
    });
}

exports.mutateTypeCastDeletion = function(file, filename) {
    pRefList = utility.getParentContractReference(file);

    fs.readFile(file, function(err, data) {
        if(err) throw err;
        var contractName = "";
        fileNum = 1;
        let mutCode = solm.edit(data.toString(), function(node) {
            if(node.type == 'ContractStatement') {        
                contractName = node.name;
            }

            if(node.hasOwnProperty('name') && pRefList.indexOf(node.name) >= 0) {
                for(var i = 0; i < svList.length; i++) {
                    tmpNode = node.getSourceCode().replace(node.name,
                        '(('+contractName+')'+node.name+')'
                    );

                    fs.writeFile("./sol_output/" + filename + "/"
                        + path.basename(file).slice(0, -4) + "TypeCastInsertion"
                        + fileNum.toString() + ".sol", data.toString().replace(node.getSourceCode(),
                        tmpNode), 'ascii', function(err) {
                            if(err) throw err;
                        }
                    );
                    fileNum++;
                }
            }
        });
    });
}
