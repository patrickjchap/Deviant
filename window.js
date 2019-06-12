/*Requirements */
const electron = require('electron');
var fs = require('fs');
const url = require('url');
const path = require('path');
const child = require('child_process');
const mutation = require('./mutation/mutation');
var project = ''

const {app, BrowserWindow, Menu, ipcMain} = electron;

var mutOpt;
let mainWindow;
let mutOpWindow;

// Listen for app
app.on('ready', function(){
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		resizable: true,
		"max-height": 2160,
		"max-width": 3840,
		title: 'Solidity Mutation'
	});
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, './content/html/main.html'),
		protocol: 'file:',
		slashes: true
	}));

	//Quitting the app when main window closed
	mainWindow.on('closed', function(){
		app.quit();
	});

	const mainMenu = Menu.buildFromTemplate(mainMenuTemp);
	Menu.setApplicationMenu(mainMenu);

	mainWindow.webContents.openDevTools();
});

//Mutant View Window
function createMutViewWindow(){
	mutViewWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		title: 'Generated Mutants'
	});

	mutViewWindow.loadURL(url.format({
		pathname: path.join(__dirname, './content/html/mutView.html'),
		protocol: 'file:',
		slashes: true
	}));

	//Quitting the app when main window closed
	mutViewWindow.on('closed', function(){
		app.quit();
	});

}

//Mutation Operator Window
function createMutOpWindow(){
	mutOpWindow = new BrowserWindow({
		width: 1000,
		height: 800,
		title: 'Select Mutation Operators'
	});

	mutOpWindow.loadURL(url.format({
		pathname: path.join(__dirname, './content/html/mutOp.html'),
		protocol: 'file:',
		slashes: true
	}));

	//Garbage collection
	mutOpWindow.on('close', function(){
		mutOpWindow = null;
	});
	
	mutOpWindow.on('open', function() {
		console.log(mutOpt);
		mutOpWindow.webContents.send('pop-checkboxes', mutOpt);
	});

	//mutOpWindow.webContents.openDevTools();
}

const mainMenuTemp = [
{
	label: 'File',
	submenu:[{
		label: 'Quit',
		click(){
			app.quit();
		}
	}]
},
{
	label: 'Settings',
	submenu: [{
		label: 'Mutation Operators',
		click(){
			createMutOpWindow();
			mutOpWindow.webContents.send('pop-checkboxes', mutOpt);
		}
	}]
}
];

ipcMain.on('save:files', function(e, param) {
	
});

//Catching the items from main window
ipcMain.on('file:select', function(e, mutParam){
	var file = mutParam[0];//.replace(/^.*[\\\/]/, '');
	var dir = mutParam[1];
	var filename = mutParam[2];
	console.log(filename);

	mutation.generateMutant(file, filename, mutOpt);
	//var runScript = exec('sh solm -f ' + filename + ' -d ' + dir + ' -o '+  mutOpt,
	//(error, stdout, stderr) => {
	//	console.log(`${stdout}`);
	//	console.log(`${stderr}`);
	//	if (error !== null) {
	//		console.log(`exec error: ${error}`);
	//	}
	//});
});

var killed = 0;
var live = 0;
ipcMain.on('run:tests', function(e, mutParam){
		dir = mutParam[0];
		filename = mutParam[1];

		dir = dir.replace(filename, "");
		
		console.log(dir);
		console.log(filename);
		child.execSync('mv ' + "'" + dir + '/contracts/' + filename + "' '" + dir + '/contracts/' + filename + ".tmp'");
		
		fs.readdir('./sol_output/' + filename, (err, files) => {
			console.log(files);
			files.forEach(file => {
				console.log(file);
				child.execSync('cp ./sol_output/' + filename + '/' + file + " '"+ dir + "/contracts/'");

				try{
				child.execSync('cd ' + "'"+dir+"'" + ' && ' + 'npm test',
					function(error, stdout, stderr) {
						console.log(stdout);
						console.log(error);
						console.log(stderr);
						if(stdout.includes('failed')){
							killed++;
						}else{
							live++;
						}
					}
				);
				}catch(ex){
					killed++;
				}
				child.execSync('cd ' + "'"+dir + "/contracts/'" + ' && ' + 'rm ' + file);
			});
		});

		child.execSync('mv ' + "'"+dir + '/contracts/' + filename + ".tmp' "  + "'"+dir + '/contracts/' + filename + "'", function(error, stdout, stderr){
		

			printStats();
		});

});

ipcMain.on('save:project', function(e, projPath) {
    project = projPath;
});

ipcMain.on('send:project', function(e) {
     mainWindow.webContents.send('get:project', project);
});

ipcMain.on('load:mutops', function(e) {
	console.log(mutOpt);
	mainWindow.webContents.send('pop-checkboxes', mutOpt);
});

ipcMain.on('op:select', function(e, mutParams){
	console.log("made it");
	mutOpt = mutParams;
	console.log(mutOpt);
	//mutOpWindow.webContents.send('pop-checkboxes', mutOpt);
});

function printStats() {
	console.log('live mutants: ' + live);
	console.log('killed mutants: ' + killed);
}
