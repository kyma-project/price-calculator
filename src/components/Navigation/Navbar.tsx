import React from 'react';
import { ShellBar } from '@ui5/webcomponents-react';
import './Navbar.css';

export default function Navbar() {
  return (
    <ShellBar
      logo={<img alt="SAP BTP, Kyma runtime Logo" src={require('../../assets/kyma.png')} />}
      primaryTitle="SAP Business Technology Platform, Kyma runtime"
      secondaryTitle="Cost Estimator"
    />
  );
}
