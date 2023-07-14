import React from 'react';
import { ShellBar } from '@ui5/webcomponents-react';
import './Navbar.css';

export default function Navbar() {
  return (
    <ShellBar
      logo={<img alt="Kyma Logo" src={require('../../assets/kyma.png')} />}
      primaryTitle="Kyma-Price-Calculator"
      secondaryTitle="The Best Run SAP"
      waitForDefine={true}
    />
  );
}
