var fs = require('fs');
var solm = require('solmeister');
var parser = require('solparse');
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



exports.collectContractFunctions = function(file) {
	functionList = []
	fs.readFile(file, function(err, data) {	
		if(err) throw err;

		let mutCode = solm.edit(data.toString(), function(node) {
			if(node.type == 'FunctionDeclaration') {functionList.push(node.name);}
		});

	});
	return functionList;
}

exports.collectImportedContracts = function(file) {
	importList = [];
	fs.readFile(file, function(err, data) {
		if(err) throw err;

		let mutCode = solm.edit(data.toString(), function(node) {
			if(node.type == 'ImportStatement') {importList.push(node.from)};
		});
	});
	return importList;
}

exports.collectInheritedContracts = function(file) {
	inheritedList = [];
	fs.readFile(file, function(err, data) {
		if(err) throw err;

		let mutCode = solm.edit(data.toString(), function(node) {
			if(node.type == 'ContractStatement' && node.is.length > 0){
				for(var i = 0; i < node.is.length; i++) {
					inheritedList.push(node.is[i].name);
				}
			}
		});	
	});
	return inheritedList;
}

exports.matchInheritedImportedContracts = function (inheritedList, importList) {
	matchList = [];
	
	for(var i = 0; i < inheritedList.length; i++) {
		for(var j = 0; j < importList.length; j++) {
			if(importList[j].includes(inheritedList[i])){matchList.push(importList[j]);}
		}
	}
	return matchList;
}

exports.getContractType = function(file) {
	fs.readFile(file, function(err, data) {
		if(err) throw err;

		let mutCode = solm.edit(data.toString(), function(node) {
			if(node.type == 'LibraryStatement') {return 'Library';}
			if(node.type == 'ContractStatement') {return 'Contract';}
			if(node.type == 'InterfaceStatement') {return 'Interface';}

		});
		return 'None';
	});
}
