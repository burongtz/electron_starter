import './bridge'

const dependencies: string[] = ['chrome', 'node', 'electron'];
const dependenciesLength: number = dependencies.length;

const replaceText = (selector: string, text: string): void => {
  const element: HTMLElement | null = document.getElementById(selector);
  if (element) {
    element.innerText = text;
  }
}

window.addEventListener('DOMContentLoaded', (): void => {
  for (let i: number = 0; i < dependenciesLength; i++) {
    const dependency: string = dependencies[i];
    const version: string = process.versions[dependency] ?? '';
    replaceText(`${dependency}-version`, version);
  }
});

export {}
