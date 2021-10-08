const { BrowserWindow, dialog, app, ipcMain } = require("electron");
const path = require("path");
const config = require("./modules/config");

let window;

async function init() {
	window = new BrowserWindow({
		// Define main properties
		title: "Cirlos",
		icon: path.join(__dirname, "assets", "icon.png"),
		alwaysOnTop: config.get("alwaysOnTop"),

		// Define sizes
		width: 1024,
		height: 720,
		minWidth: 600,
		minHeight: 400,

		// Define menu properties
		autoHideMenuBar: true,
		frame: false,
		titleBarStyle: "hidden",

		// Don't actually know what this does but I think it's some Apple garbage
		darkTheme: true,
		backgroundColor: "black",

		// Web preferences
		webPreferences: {
			// nativeWindowOpen: true,
			preload: path.join(__dirname, "modules", "preload.js")
		}
	});

	// Load URI from config
	window.loadURL(config.get("target") || "https://v2.cirlos.net/")
		.catch(err => (
			dialog.showErrorBox(
				"There was an error initializing the renderer!",
				err.toString()
			)
		));

	// Who the fuck uses windowed mode
	window.maximize();

	// Override the close event, hide to tray instead
	window.on("close", e => (e.preventDefault(), window.hide()));

	// Add window title bar listeners
	const events = ["minimize", "maximize", "restore", "close"];

	for (const event of events) {
		ipcMain.on(event, window[event].bind(window));
	}
}

// Disable garbage hardware acceleration if disabled by the user
!config.get("useHardwareAccel") && app.disableHardwareAcceleration();
// Initialize the app when ready
app.whenReady().then(init);