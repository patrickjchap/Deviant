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
var dataLocOp = require('./SolidityFeatures/ModifiableDataOperators.js');
var selfdestructOp = require('./SolidityFeatures/SelfdestructOperators.js');
var addressFunctionOp = require('./SolidityFeatures/AddressFunctionOperators.js');
var abstractContractOp = require('./SolidityFeatures/AbstractContractOperators.js');
var errorHandleOp = require('./SolidityFeatures/ErrorHandleOperators.js');
var multipleInheritanceOp = require('./SolidityFeatures/MultipleInheritanceOperators.js');
var libraryOp = require('./SolidityFeatures/LibraryOperators.js');

exports.generateMutant = function(file, filename, args){
	if(!fs.existsSync('./sol_output/' + filename)){
		fs.mkdirSync('./sol_output/' + filename);
	}

	if(args.includes('b')){binOp.mutateBinaryOperator(file, filename);}
//	if(args.includes('u')){upOp.mutateUpdateOperator(file);}
	if(args.includes('n')){unOp.mutateUnaryOperator(file, filename);}
	if(args.includes('s')){strOp.mutateStringOperator(file, filename)};
	if(args.includes('a')){addOp.mutateAddressOperator(file, filename)};
	if(args.includes('g')){gasOp.mutateGasOperator(file, filename)};
	if(args.includes('m')){modOp.mutateModifierOperator(file, filename)};
	if(args.includes('e')){eventOp.mutateEventOperator(file, filename)};
	if(args.includes('v')){stateVarOp.mutateStateVarOperator(file, filename)};
	if(args.includes('f')){functionVisOp.mutateFunctionVisibilityOperator(file, filename)};
	if(args.includes('t')){functionTypeOp.mutateFunctionTypeOperator(file, filename)};
	if(args.includes('d')){dataLocOp.mutateDataLocationOperator(file, filename)};
	if(args.includes('r')){selfdestructOp.mutateSelfdestructOperator(file, filename)};
	if(args.includes('z')){addressFunctionOp.mutateAddressFunctionOperator(file, filename)};
	if(args.includes('c')){abstractContractOp.mutateAbstractContractOperator(file, filename)};
	if(args.includes('h')){errorHandleOp.mutateErrorHandleOperator(file, filename)};
	if(args.includes('i')){multipleInheritanceOp.mutateMultipleInheritanceOperator(file, filename)};
	if(args.includes('l')){libraryOp.mutateLibraryOperator(file, filename)};
}
