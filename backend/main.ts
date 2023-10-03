import { appEnsureSingleInstance } from "./app/app-ensure-single-instance";
import { appHandleIpcMain } from "./app/app-handle-ipc-main";
import { appSetup } from "./app/app-setup";

async function main(): Promise<void> {
  try {
    appEnsureSingleInstance();
    await appSetup();
    appHandleIpcMain();
  } catch (e) {
    console.error('Failed to create window: ', e);
  }
}

main().then(() => console.log('App is ready.'));
