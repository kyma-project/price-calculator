import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThemeProvider } from '@ui5/webcomponents-react';
import '@ui5/webcomponents-icons/dist/AllIcons.js';
import App from './App';

type RootElement = Element | DocumentFragment;

const root = ReactDOM.createRoot(
  document.getElementById('root') as RootElement,
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
