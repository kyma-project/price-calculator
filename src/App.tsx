import { setTheme } from '@ui5/webcomponents-base/dist/config/Theme.js';
import '@ui5/webcomponents-react/dist/Assets';
import '@ui5/webcomponents-icons/dist/AllIcons.js';
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
