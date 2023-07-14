import { Text, Title } from '@ui5/webcomponents-react';
import React from 'react';
import './HeaderWithInfo.css';

interface Props {
  header: string;
  info: string;
}

export default function HeaderWithInfo(props: Props) {
  const { header, info } = props;

  return (
    <div className="HeaderWithInfo wizard-subheader">
      <Title level="H5">{header}</Title>
      <Text>({info})</Text>
    </div>
  );
}
