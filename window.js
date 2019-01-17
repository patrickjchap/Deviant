/* Requirements */
const electron = require('electron');
const url = require('url');
const path = require('path');
const exec = require('child_process').exec;
const mutation = require('./mutation/mutation');

const {app, BrowserWindow, Menu, ipcMain} = electron;

var mutOpt;
let mainWindow;
let mutOpWindow;

// Listen for app
app.on('ready', function(){
	mainWindow = new BrowserWindow({
		width: 1000,
		height: 667,
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
		width: 600,
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

	mutOpWindow.webContents.openDevTools();
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

ipcMain.on('run:tests', function(e, dir, filename){
		fs.readdir('./sol_output/' + filename, (err, files) => {
			file.forEach(file => {
				exec('cp ./sol_output/' + filename + '/' + 'file ' + dir);
				exec('mv ' + dir + '/' + filename + ' ' + dir + '/' + filename + '.tmp');
				exec('cd ' + dir + ' && ' + 'npm test');
			}
		}
});

ipcMain.on('op:select', function(e, mutParams){
	console.log("made it");
	mutOpt = mutParams;
	console.log(mutOpt);
	mutOpWindow.webContents.send('pop-checkboxes', mutOpt);
});

