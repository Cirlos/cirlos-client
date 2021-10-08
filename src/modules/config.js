const Store = require("electron-store");

module.exports = new Store({
	schema: {
		target: {
			type: "string",
			default: "https://v2.cirlos.net/"
		},
		alwaysOnTop: {
			type: "boolean",
			default: false
		},
		useHardwareAccel: {
			type: "boolean",
			default: false
		}
	}
});