var gen = require('./mutation/mutation.js');
var mut = require('./report/TestMutant.js');


//gen.generateClassicalMutants('../MultiSigWallet/contracts/Factory.sol', 'MultiSigWallet-Gen/Factory/')
//gen.generateClassicalMutants('../MultiSigWallet/contracts/MultiSigWallet.sol', 'MultiSigWallet-Gen/MultiSigWallet/')
//gen.generateClassicalMutants('../MultiSigWallet/contracts/MultiSigWalletFactory.sol', 'MultiSigWallet-Gen/MultiSigWalletFactory/')
//gen.generateClassicalMutants('../MultiSigWallet/contracts/MultiSigWalletWithDailyLimit.sol', 'MultiSigWallet-Gen/MultiSigWalletWithDailyLimit/')
//gen.generateClassicalMutants('../MultiSigWallet/contracts/MultiSigWalletWithDailyLimitFactory.sol', 'MultiSigWallet-Gen/MultiSigWalletWithDailyLimitFactory/')
//gen.generateClassicalMutants('../MultiSigWallet/contracts/TestCalls.sol', 'MultiSigWallet-Gen/TestCalls/')
//gen.generateClassicalMutants('../MultiSigWallet/contracts/TestToken.sol', 'MultiSigWallet-Gen/TestToken/')


mut.runMutants('./sol_output/MultiSigWallet-Gen/Factory/','../MultiSigWallet/contracts/','../MultiSigWallet/contracts/Factory.sol','../MultiSigWallet/');
mut.runMutants('./sol_output/MultiSigWallet-Gen/MultiSigWallet/','../MultiSigWallet/contracts/','../MultiSigWallet/contracts/MultiSigWallet.sol','../MultiSigWallet/');
mut.runMutants('./sol_output/MultiSigWallet-Gen/MultiSigWalletFactory/','../MultiSigWallet/contracts/','../MultiSigWallet/contracts/MultiSigWalletFactory.sol','../MultiSigWallet/');
mut.runMutants('./sol_output/MultiSigWallet-Gen/MultiSigWalletWithDailyLimit/','../MultiSigWallet/contracts/','../MultiSigWallet/contracts/MultiSigWalletWithDailyLimit.sol','../MultiSigWallet/');
mut.runMutants('./sol_output/MultiSigWallet-Gen/MultiSigWalletWithDailyLimitFactory/','../MultiSigWallet/contracts/','../MultiSigWallet/contracts/MultiSigWalletWithDailyLimitFactory.sol','../MultiSigWallet/');
mut.runMutants('./sol_output/MultiSigWallet-Gen/TestCalls/','../MultiSigWallet/contracts/','../MultiSigWallet/contracts/TestCalls.sol','../MultiSigWallet/');
mut.runMutants('./sol_output/MultiSigWallet-Gen/TestToken/','../MultiSigWallet/contracts/','../MultiSigWallet/contracts/TestToken.sol','../MultiSigWallet/');
