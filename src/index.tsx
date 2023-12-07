import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App/App';
import { Workbox } from 'workbox-window';
import './styles/index.scss';

const root = createRoot(document.getElementById('root') as HTMLElement);

const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    const wb = new Workbox('/service-worker.js');

    try {
      await wb.register();
    } catch (e) {
      console.error('Service worker registration failed:', e);
    }
  }
};

registerServiceWorker();

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
