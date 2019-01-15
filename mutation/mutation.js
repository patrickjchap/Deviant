var fs = require('fs');
var binOp = require('./StatementLevel/BinaryOperators.js');
var unOp = require('./StatementLevel/UnaryOperators.js');
//var upOp = require('./UpdateOperators.js');
var strOp = require('./StatementLevel/StringOperators.js');


exports.generateMutant = function(file, args){
	if(args.includes('b')){binOp.mutateBinaryOperator(file);}
//	if(args.includes('u')){upOp.mutateUpdateOperator(file);}
	if(args.includes('n')){unOp.mutateUnaryOperator(file);}
	if(args.includes('s')){strOp.mutateStringOperator(file)};
}
