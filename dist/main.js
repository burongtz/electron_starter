"use strict";const n=require("electron"),t=require("path"),a=()=>{n.app.requestSingleInstanceLock()||(console.log("App is already running."),n.app.quit(),process.exit())},r=()=>{},s="http://localhost:5173";new URL("./dist/index.html",`file://${__dirname}`).toString();const c={show:!1,width:800,height:600,title:"App name",webPreferences:{webviewTag:!1,nodeIntegration:!0,preload:t.join(__dirname,"./preload.js")}},i=s,l=async()=>{try{const e=new n.BrowserWindow(c);return e.setMenu(null),await e.loadURL(i),e.webContents.openDevTools(),e}catch(e){throw console.error("Error while trying to create window:",e),e}},o=async()=>{const e=await l();return e.on("ready-to-show",()=>e.show())},w=async()=>{try{(await o()).focus()}catch(e){console.error("Error while trying to prevent second-instance Electron event:",e)}},d=()=>{process.platform!=="darwin"&&n.app.quit()},p=async()=>{if(n.BrowserWindow.getAllWindows().length===0)try{await o()}catch(e){console.error("Error while trying to handle activate Electron event:",e)}},h=async()=>{n.app.on("second-instance",w).on("window-all-closed",d).on("activate",p),await n.app.whenReady(),await o()};async function u(){try{a(),await h(),r()}catch(e){console.error("Failed to create window: ",e)}}u().then(()=>console.log("App is ready."));console.log("Hello world!");