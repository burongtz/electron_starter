import { app, BrowserWindow } from "electron";
import { url, windowDefaultOptions } from "./app-config";


const setupWindow = async (): Promise<BrowserWindow> => {
  try {
    const window: BrowserWindow = new BrowserWindow(windowDefaultOptions);
    window.setMenu(null);
    await window.loadURL(url);
    window.webContents.openDevTools();
    return window;
  } catch (error) {
    console.error('Error while trying to create window:', error);
    throw error;
  }
}

const createWindow = async (): Promise<BrowserWindow> => {
  const window: BrowserWindow = await setupWindow();
  return window.on('ready-to-show', () => window.show());
}

const handleSecondInstance = async (): Promise<void> => {
  try {
    const window: BrowserWindow = await createWindow();
    window.focus();
  } catch (e) {
    console.error('Error while trying to prevent second-instance Electron event:', e);
  }
}

const handleWindowAllClosed = (): void => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
}

const handleActivate = async (): Promise<void> => {
  if (BrowserWindow.getAllWindows().length === 0) {
    try {
      await createWindow();
    } catch (e) {
      console.error('Error while trying to handle activate Electron event:', e)
    }
  }
}

export const appSetup = async (): Promise<void> => {
  app
    .on('second-instance', handleSecondInstance)
    .on('window-all-closed', handleWindowAllClosed)
    .on('activate', handleActivate);

  await app.whenReady();
  await createWindow();
}
