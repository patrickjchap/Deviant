const fs = require('fs');
files = [
    "./aragon_reports/APMNamehash.solMutationReport.txt",
    "./aragon_reports/APMRegistry.solMutationReport.txt",
    "./aragon_reports/AppProxyBase.solMutationReport.txt",
    "./aragon_reports/AppProxyPinned.solMutationReport.txt",
    "./aragon_reports/AppProxyUpgradeable.solMutationReport.txt",
    "./aragon_reports/AppStorage.solMutationReport.txt",
    "./aragon_reports/AragonApp.solMutationReport.txt",
    "./aragon_reports/ENSConstants.solMutationReport.txt",
    "./aragon_reports/ENSSubdomainRegistrar.solMutationReport.txt",
    "./aragon_reports/UnsafeAragonApp.solMutationReport.txt",

    "./txt_reports/CallsScript.solMutationReport.txt",
    "./txt_reports/DAOFactory.solMutationReport.txt",
    "./txt_reports/ERC20.solMutationReport.txt",
    "./txt_reports/KernelConstants.solMutationReport.txt",
    "./txt_reports/Kernel.solMutationReport.txt",
    "./txt_reports/Repo.solMutationReport.txt",
    "./txt_reports/SafeMath64.solMutationReport.txt",
    "./txt_reports/VaultRecoverable.solMutationReport.txt",


    "./curr_rep/ACL.solMutationReport.txt",
    "./curr_rep/ACLSyntaxSugar.solMutationReport.txt",
    "./curr_rep/BaseEVMScriptExecutor.solMutationReport.txt",
    "./curr_rep/ScriptHelpers.solMutationReport.txt",
    "./curr_rep/EVMScriptRegistry.solMutationReport.txt",
    "./curr_rep/EVMScriptRunner.solMutationReport.txt",
    "./curr_rep/Uint256Helpers.solMutationReport.txt",
    "./curr_rep/TimeHelpers.solMutationReport.txt",
    "./curr_rep/Initializable.solMutationReport.txt",
    "./curr_rep/EtherTokenConstant.solMutationReport.txt",
]


var addressFunc = 0;
var address = 0;
var gas = 0;
var dataLoc = 0;
var eventCount = 0;
var sdCount = 0;
var except = 0;
var mod = 0;
var funcType = 0;
var funcVis = 0;
var libFuncVis = 0;
var stateVarVis = 0;
var killed = 0;

for(var i = 0; i < files.length; i++) {
    try{
        data = fs.readFileSync(files[i]).toString();
            var lines = data.toString().split('\n');
            for(var j = 0; j < lines.length; j++) {
                if(lines[j].includes('live')) {
                    if(lines[j].includes('AddressFunction')){
                        addressFunc++;
                    }else if(lines[j].includes('Address')) {
                        address++;
                    }else if(lines[j].includes('Gas')) {
                        gas++;
                    }else if(lines[j].includes('DataLoc')) {
                        dataLoc++;
                    }else if(lines[j].includes('Event')) {
                        eventCount++;
                    }else if(lines[j].includes('Selfdestruct')) {
                        sdCount++;
                    }else if(lines[j].includes('ErrorHandle')) {
                        except++;
                    }else if(lines[j].includes('Modifier')) {
                        mod++;
                    }else if(lines[j].includes('FunctionType')) {
                        funcType++;
                    }else if(lines[j].includes('FunctionVis')) {
                        funcVis++;
                    }else if(lines[j].includes('Library')) {
                        libFuncVis++;
                    }else if(lines[j].includes('StateVar')) {
                        stateVarVis++;
                    }
                }else if(lines[j].includes('killed')){
                    killed++;
                }
            }
    
    }catch(e) {
        console.log(e);
    }
}

console.log('AddressFunction: ' + addressFunc);
console.log('Address: ' + address);
console.log('Gas: ' + gas);
console.log('DataLoc: ' + dataLoc);
console.log('Event: ' + eventCount);
console.log('SD: ' + sdCount);
console.log('Exception: ' + except);
console.log('Modifier: ' + mod);
console.log('FuncType: ' + funcType);
console.log('FuncVis: ' + funcVis);
console.log('Lib: ' + libFuncVis);
console.log('State: ' + stateVarVis);

var total = addressFunc + address + gas
    + dataLoc + eventCount + sdCount + except + mod
    + funcType + funcVis + libFuncVis + stateVarVis;

console.log('Total: ' + total);
console.log('killed: ' + killed);
