var fs = require('fs');

exports.generateMutant = function(file, filename, functionNames){
	if(!fs.existsSync('./sol_output/' + filename)){
		fs.mkdirSync('./sol_output/' + filename);
	}

    for(var i = 0; i < functionNames; i++) {
        window[functionNames[i]](file, filename);
    }
}

exports.genAST = function(file, filename) {
    bin = require('./StatementLevel/BinaryOperators.js');
    bin.mutateBinaryOperator(file, filename);
}

var address = require("./SolidityFeatures/AddressOperators.js");
var addressFunction = require("./SolidityFeatures/AddressFunctionOperators.js");
var error = require("./SolidityFeatures/ErrorHandleOperators.js");
var events = require("./SolidityFeatures/EventOperators.js");
var functionType = require("./SolidityFeatures/FunctionTypeOperators.js");
var functionVis = require("./SolidityFeatures/FunctionVisibilityOperators.js");
var gas = require("./SolidityFeatures/GasOperators.js");
var library = require("./SolidityFeatures/LibraryOperators.js");
var modifiable = require("./SolidityFeatures/ModifiableDataOperators.js");
var modifier = require("./SolidityFeatures/ModifierOperators.js");
var sd = require("./SolidityFeatures/SelfdestructOperators.js");
var sv = require("./SolidityFeatures/StateVariableOperators.js");
exports.generateSolidityMutants = function(file, filename) {
    addressFunction.mutateAddressFunctionOperator(file, filename);
    address.mutateAddressLiteralOperator(file, filename);
    address.mutateAddressSwitchCallExpressionOperator(file, filename);
    error.mutateErrorHandleOperator(file, filename);
    events.mutateEventOperator(file, filename);
    functionType.mutateFunctionTypeOperator(file, filename);
    functionVis.mutateFunctionVisibilityOperator(file, filename);
    gas.mutateGasOperator(file, filename);
    library.mutateLibraryOperator(file, filename);
    modifiable.mutateDataLocationOperator(file, filename);
    modifier.mutateModifierOperator(file, filename);
    sd.mutateSelfdestructOperator(file, filename);
    sv.mutateStateVarOperator(file, filename);
}
