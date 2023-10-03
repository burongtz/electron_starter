import { app } from 'electron';

export const appEnsureSingleInstance = (): void => {
  const isSingleInstance: boolean = app.requestSingleInstanceLock()
  if (!isSingleInstance) {
    console.log('App is already running.');
    app.quit()
    process.exit()
  }
}
