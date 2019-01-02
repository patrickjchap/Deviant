const fs = require('fs');
const path = require('path');

const dirpath = path.join(__dirname, '/path');

function listFiles(directory) {
	fs.readdir(directory, (err, files) => {
		'use strict';

		if (err) throw err;

		for (let file of files) {

			if(fs.statSync(path.join(directory, file)).isDirectory()) {
				
				listFiles(path.join(directory, file));

			}else if (file.includes('.sol')){
				
				document.getElementById('display-files').innerHTML += '<option value="' + directory + file + '">' + file +  '</option>';
			
			}
		}
	});
}
