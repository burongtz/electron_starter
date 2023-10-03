import type { InlineConfig, ViteDevServer } from 'vite'
import { build, createLogger, createServer } from 'vite'
import electronPath from 'electron'
import { ChildProcessWithoutNullStreams, spawn } from 'child_process'

// Shared config across multiple build watchers.
const sharedConfig: InlineConfig = {
  mode: 'development',
  build: {watch: {}},
}

/**
 * Create a Vite build watcher that automatically recompiles when a file is
 * edited.
 */
const getWatcher = (name: string, configFilePath: string, writeBundle: any) =>
  build({
    ...sharedConfig,
    configFile: configFilePath,
    plugins: [{name, writeBundle}],
  })


/**
 * Set up a watcher for the preload package.
 */
const setupPreloadWatcher = async (viteServer: ViteDevServer) =>
  getWatcher('reload-app-on-preload-package-change', 'preload/vite.config.ts', () => {
    // Send a "full-reload" page event using Vite WebSocket server.
    viteServer.ws.send({type: 'full-reload'})
  })

/**
 * Set up the `back` watcher.
 */
const setupMainWatcher = async () => {
  const logger = createLogger('info', {prefix: '[backend]'})
  let spawnProcess: ChildProcessWithoutNullStreams | null = null

  return getWatcher('reload-app-on-backend-package-change', 'backend/vite.config.ts', (): void => {
    if (spawnProcess !== null) {
      spawnProcess.off('exit', () => process.exit)
      spawnProcess.kill('SIGINT')
      spawnProcess = null
    }

    // Restart Electron process when main package is edited and recompiled.
    spawnProcess = spawn(String(electronPath), ['.'])

    // Listen to data events emitted from the child process's stdout stream.
    spawnProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    // Listen to data events emitted from the child process's stderr stream.
    spawnProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`)
    })
  })
}

const startServer = async (): Promise<void> => {
  const rendererServer: ViteDevServer = await createServer({
    ...sharedConfig,
    configFile: 'frontend/vite.config.ts',
  })

  await rendererServer.listen()
  rendererServer.printUrls()

  await setupPreloadWatcher(rendererServer)
  await setupMainWatcher()
}

startServer().catch((err): void => console.error(err));
