const appElement: Element | null = document.querySelector<Element>('#app');

if (appElement === null) {
  throw new Error('Could not find #app element.');
}

appElement!.innerHTML = 'Hello, World!';
