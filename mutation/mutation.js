var fs = require('fs');
var binOp = require('./StatementLevel/BinaryOperators.js');
var unOp = require('./StatementLevel/UnaryOperators.js');
//var upOp = require('./UpdateOperators.js');
var strOp = require('./StatementLevel/StringOperators.js');
var addOp = require('./SolidityFeatures/AddressOperators.js');
var gasOp = require('./SolidityFeatures/GasOperators.js');
var modOp = require('./SolidityFeatures/ModifierOperators.js');

exports.generateMutant = function(file, args){
	if(args.includes('b')){binOp.mutateBinaryOperator(file);}
//	if(args.includes('u')){upOp.mutateUpdateOperator(file);}
	if(args.includes('n')){unOp.mutateUnaryOperator(file);}
	if(args.includes('s')){strOp.mutateStringOperator(file)};
	if(args.includes('a')){addOp.mutateAddressOperator(file)};
	if(args.includes('g')){gasOp.mutateGasOperator(file)};
	if(args.includes('m')){modOp.mutateModifierOperator(file)};
}
