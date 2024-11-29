import React from 'react';
import { setTheme } from '@ui5/webcomponents-base/dist/config/Theme';
import '@ui5/webcomponents-react/dist/Assets';
import './App.css';
import Navbar from './components/Navigation/Navbar';
import MainContentContainer from './components/PageLayout/MainContentContainer';

export default function App() {
  setTheme('sap_horizon');

  return (
    <div className="App">
      <Navbar />
      <MainContentContainer />
    </div>
  );
}
