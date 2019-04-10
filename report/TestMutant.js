const fs = require('fs');
const exec = require('child_process').execSync;

exports.runMutants = function(mutantDirectory, contractDirectory, contractFile, sourceProject){
	var killed = 0;
	var live = 0;
	var total_mutants = 0;
	var contractName = contractFile.replace(/^.*[\\\/]/, '');

	fs.rename(contractFile, contractFile + '.tmp', function(err) {
		if (err) console.log('ERROR: ' + err);
	});

	fs.readdirSync(mutantDirectory).forEach(function(file) {
		var filename = file;
		file = mutantDirectory + file;
		console.log(file);
		fs.copyFile(file, contractFile, function(err){
			if(err) console.log(err);
		});

		let child;
		try{
			command = 'cd ' + '"'+sourceProject+'"' + ' && ' + 'npm test';
			child = exec(
				command, 
				{encoding: 'utf8', maxBuffer: 50 * 1024 * 1024}
			).toString();
				
			console.log(child);
			if(child.includes('passing')){
				live++;
				total_mutants++;
				console.log('Mutant live: ' + file);
				fs.appendFileSync(contractName + 'MutationReport.txt', filename + '\t live \n');
				
			}
			fs.unlinkSync(contractFile);
			
			
		}catch(err){
			console.log(err);
			if(err.hasOwnProperty('stdout')) console.log(err.stdout.toString());	
			if(err.stdout.toString().includes('failing')){
				killed++;
                total_mutants++;
				console.log('Mutant killed: ' + file);
                fs.appendFileSync(contractName + 'MutationReport.txt', filename + '\t killed \n');
			}else if(err.stdout.toString().includes('Compilation failed')){
				console.log('Mutant not valid: ' + file);
				fs.unlinkSync(file);
			}

			fs.unlinkSync(contractFile);
		}
	});

	fs.appendFileSync(contractName + 'MutationReport.txt', 'Live: ' + live + '\n');
	fs.appendFileSync(contractName + 'MutationReport.txt', 'Killed: ' + killed + '\n');
	fs.appendFileSync(contractName + 'MutationReport.txt', 'Total: ' + total_mutants+ '\n');
	fs.appendFileSync(contractName + 'MutationReport.txt', 'Mutation Score: ' + killed/total_mutants + '\n');

	fs.rename(contractFile + '.tmp', contractFile, function(err) {
		if (err) {
			console.log('ERROR: ' + err);
			console.log('Original contract NOT restored!');
		}
	});

}

copyFile = function(source, target, cb) {
  var cbCalled = false;

  var rd = fs.createReadStream(source);
  rd.on("error", function(err) {
    done(err);
  });
  var wr = fs.createWriteStream(target);
  wr.on("error", function(err) {
    done(err);
  });
  wr.on("close", function(ex) {
    done();
  });
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
     console.log(err);
      cbCalled = true;
    }
  }
}
