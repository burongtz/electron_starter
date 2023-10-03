import path from "path";

export const localhost: string = 'http://localhost:5173';

export const file: string = new URL('./dist/index.html', `file://${__dirname}`).toString();

export const windowDefaultOptions: {} = {
  show: false,
  width: 800,
  height: 600,
  title: 'App name',
  webPreferences: {
    webviewTag: false,
    nodeIntegration: true,
    preload: path.join(__dirname, './preload.js')
  }
}

export const url: string = import.meta.env.DEV ? localhost : file;

