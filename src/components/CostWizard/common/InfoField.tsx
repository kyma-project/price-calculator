import React from 'react';
import { MessageStrip } from '@ui5/webcomponents-react';
import './InfoField.css';

interface Props {
  info: string;
  css: string // info / infoSideContent
}

export default function InfoField(props: Props) {
  const { info, css } = props;
  return <MessageStrip className={css} hideCloseButton children={info} />;
}
