const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("__IS_CLIENT__", true);

contextBridge.exposeInMainWorld("electronApi", {
	send: ipcRenderer.send,
	on: (channel, callback) => ipcRenderer.on(channel, (_, ...args) => callback(...args))
});