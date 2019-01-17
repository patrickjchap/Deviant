const fs = require('fs');
const path = require('path');

const dirpath = path.join(__dirname, '/path');

function listFiles(directory, parentDir) {
	fs.readdir(directory, (err, files) => {
		'use strict';

		if (err) throw err;

		for (let file of files) {

			if(fs.statSync(path.join(directory, file)).isDirectory()) {
				
				listFiles(path.join(directory, file));

			}else if (file.split('.').pop() === 'sol' && !directory.includes("node_modules")){
//				var pattern = "/contracts/"

				document.getElementById('display-files').innerHTML += '<option name = "'+file+'" value="' + directory  + '/' + file + '">' + /*directory.substring(directory.indexOf(pattern) + pattern.length) + */file +  '</option>';
			
			}
		}
	});
}
