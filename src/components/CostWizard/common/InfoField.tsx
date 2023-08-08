import React from 'react';
import { MessageStrip } from '@ui5/webcomponents-react';
import './InfoField.css';

interface Props {
  info: string;
}

export default function InfoField(props: Props) {
  const { info } = props;
  return <MessageStrip className="info" hideCloseButton children={info} />;
}
