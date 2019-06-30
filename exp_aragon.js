var mut = require('./report/TestMutant.js');
var gen = require('./mutation/mutation.js');

gen.generateSolidityMutants('../aragonOS/contracts/common/Uint256Helpers.sol', 'aragonOS/Uint256Helpers/');
gen.generateSolidityMutants('../aragonOS/contracts/common/Initializable.sol', 'aragonOS/Initializable/');
gen.generateSolidityMutants('../aragonOS/contracts/common/TimeHelpers.sol', 'aragonOS/TimeHelpers/');
gen.generateSolidityMutants('../aragonOS/contracts/common/EtherTokenConstant.sol', 'aragonOS/EtherTokenConstant/');


mut.runMutants('./sol_output/aragonOS/Uint256Helpers/', '../aragonOS/contracts/common/', '../aragonOS/contracts/common/Uint256Helpers.sol', '../aragonOS/');
mut.runMutants('./sol_output/aragonOS/Initializable/', '../aragonOS/contracts/common/', '../aragonOS/contracts/common/Initializable.sol', '../aragonOS/');
mut.runMutants('./sol_output/aragonOS/TimeHelpers/', '../aragonOS/contracts/common/', '../aragonOS/contracts/common/TimeHelpers.sol', '../aragonOS/');
mut.runMutants('./sol_output/aragonOS/EtherTokenConstant/', '../aragonOS/contracts/common/', '../aragonOS/contracts/common/EtherTokenConstant.sol', '../aragonOS/');
