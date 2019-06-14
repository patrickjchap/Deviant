var gen = require('./mutation/mutation.js');
var mut = require('./report/TestMutant.js');

gen.generateSolidityMutants('../openzeppelin-solidity/contracts/cryptography/ECDSA.sol', 'openzeppelin-solidity/ECDSA/')

mut.runMutants('./sol_output/openzeppelin-solidity/ECDSA/','../openzeppelin-solidity/contracts/cryptography','../openzeppelin-solidity/contracts/cryptography/ECDSA.sol','../openzeppelin-solidity/');
