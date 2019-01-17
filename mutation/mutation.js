var fs = require('fs');
var binOp = require('./StatementLevel/BinaryOperators.js');
var unOp = require('./StatementLevel/UnaryOperators.js');
//var upOp = require('./UpdateOperators.js');
var strOp = require('./StatementLevel/StringOperators.js');
var addOp = require('./SolidityFeatures/AddressOperators.js');
var gasOp = require('./SolidityFeatures/GasOperators.js');
var modOp = require('./SolidityFeatures/ModifierOperators.js');
var eventOp = require('./SolidityFeatures/EventOperators.js');
var stateVarOp = require('./SolidityFeatures/StateVariableOperators.js');
var functionVisOp = require('./SolidityFeatures/FunctionVisibilityOperators.js');
var functionTypeOp = require('./SolidityFeatures/FunctionTypeOperators.js');

exports.generateMutant = function(file, args){
	if(args.includes('b')){binOp.mutateBinaryOperator(file);}
//	if(args.includes('u')){upOp.mutateUpdateOperator(file);}
	if(args.includes('n')){unOp.mutateUnaryOperator(file);}
	if(args.includes('s')){strOp.mutateStringOperator(file)};
	if(args.includes('a')){addOp.mutateAddressOperator(file)};
	if(args.includes('g')){gasOp.mutateGasOperator(file)};
	if(args.includes('m')){modOp.mutateModifierOperator(file)};
	if(args.includes('e')){eventOp.mutateEventOperator(file)};
	if(args.includes('v')){stateVarOp.mutateStateVarOperator(file)};
	if(args.includes('f')){functionVisOp.mutateFunctionVisibilityOperator(file)};
	if(args.includes('t')){functionTypeOp.mutateFunctionTypeOperator(file)};
}
