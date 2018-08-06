var fs = require('fs');
var binOp = require('./BinaryOperators.js');
var boolOp = require('./BooleanOperators.js');
var unOp = require('./UnaryOperators.js');



exports.generateMutant = function(file){
	binOp.mutateBinaryOperator(file);
	boolOp.mutateBooleanOperator(file);
	unOp.mutateUnaryOperator(file);
}
