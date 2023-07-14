import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThemeProvider } from '@ui5/webcomponents-react';
import { RecoilRoot } from 'recoil';
import App from './App';

type RootElement = Element | DocumentFragment;

const root = ReactDOM.createRoot(
  document.getElementById('root') as RootElement,
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
);
