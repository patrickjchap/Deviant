var diff = require('diff');

function getMutantDiff(origFile, mutFile) {
	var origStr = fs.readFileSync(origFile).toString();
	var mutStr = fs.readFileSync(mutFile).toString();
    var lineNum = 0;
	diffDict = {};
	diffLines = diff.diffTrimmedLines(origStr, mutStr);//, {newlineIsToken: true});

	diffLines.forEach(function(part){
		if(part.removed == true) {
			diffDict['orig'] = part.value;
		}else if(part.added == true) {
			diffDict['mut'] = part.value;	
		}
	});

    origArr = origStr.split('\n');
    mutArr = mutStr.split('\n');
    
    for(var i = 0; i < origArr.length; i++) {
        if(diffDict['orig'].includes(origArr[i])) console.log('found');
        if(diffDict['orig'].includes(origArr[i]) && diffDict['mut'].includes(mutArr[i])) {
            lineNum = i+1;
        }
    }
	
    document.getElementById('diff-textbox').value =
        'Mutation takes place at line ' + lineNum + '\n\n' +   
        '--------Original--------\n' + diffDict['orig'] + '\n\n' +
        '--------Mutant--------\n' + diffDict['mut'];
    return diffDict;
}

function getMutantStats(origFile) {
    reportPath = './txt_reports/' + origFile.replace(/^.*[\\\/]/, '') + 'MutationReport.txt';

    removedOrigSol = origFile.replace(/^.*[\\\/]/, '').replace('.sol', '');
    console.log(removedOrigSol);

    reportStr = fs.readFileSync(reportPath).toString();
    reportLines = reportStr.split('\n');    

    mutantTypeDict = {};
    mutantTypeGenDict = {};
    totalLive = 0;
    totalKilled = 0;
    for(var i = 0; i < reportLines.length; i++) {
        if(reportLines[i].includes('live')) {
            totalLive++;
            mutantFileName = reportLines[i].substr(0, reportLines[i].indexOf('\t'));
            mutantType = mutantFileName.replace(/[0-9]/g, '');
            mutantType = mutantType.replace(removedOrigSol, '').replace('.sol', '');
    
            if(mutantTypeDict[mutantType] == null){
                mutantTypeDict[mutantType] = 1;
            }else{
                mutantTypeDict[mutantType]++;
            }

            if(mutantTypeGenDict[mutantType] == null) {
                mutantTypeGenDict[mutantType] = 1;
            }else{
                mutantTypeGenDict[mutantType]++;
            }
        }else if(reportLines[i].includes('killed')) {
            totalKilled++;

            if(mutantTypeGenDict[mutantType] == null) {
                mutantTypeGenDict[mutantType] = 1;
            }else{
                mutantTypeGenDict[mutantType]++;
            }

        }
    }

    document.getElementById('stats-textbox').value = 
    'Mutation Statistics for: ' + origFile.replace(/^.*[\\\/]/, '') + '\n\n' +
    'Total # of live mutants: ' + totalLive + '\n' + 
    'Total # of killed mutants: ' + totalKilled + '\n\n' +
    'Most common live mutant: ' + Object.keys(mutantTypeDict).reduce(function(a, b){
         return mutantTypeDict[a] > mutantTypeDict[b] ? a : b 
    }) + '\n' +
    'Most common generated mutant: ' + Object.keys(mutantTypeGenDict).reduce(function(a, b){
         return mutantTypeGenDict[a] > mutantTypeGenDict[b] ? a : b
    });
    
}

