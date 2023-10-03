import './bridge'

window.addEventListener('DOMContentLoaded', (): void => {
  const replaceText = (selector: string, text: string): void => {
    const element: HTMLElement = document.getElementById(selector);
    if (element) element.innerText = text;
  }

  for (const dependency: string of ['chrome', 'node', 'electron']) {
    const version: string = process.versions[dependency] ?? '';
    replaceText(`${dependency}-version`, version);
  }
})

export {}
