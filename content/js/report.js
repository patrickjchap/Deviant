var diff = require('diff');
var fs = require('fs');


exports.getMutantDiff = function(origFile, mutFile) {
	var origStr = fs.readFileSync(origFile).toString();
	var mutStr = fs.readFileSync(mutFile).toString();

	diffDict = {};
	diffLines = diff.diffTrimmedLines(origStr, mutStr, {newlineIsToken: true})	
	
	diffLines.forEach(function(part){
		if(part.removed == true) {
			diffDict['orig'] = part.value;
		}else if(part.added == true) {
			diffDict['mut'] = part.value;	
		}
	});
	console.log(diffDict);
	return diffDict;
}

