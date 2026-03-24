import { ReactNode } from 'react';
import { MessageStrip } from '@ui5/webcomponents-react';
import './InfoField.css';

interface Props {
  info: ReactNode;
}

export default function InfoField(props: Props) {
  const { info } = props;
  return (
    <MessageStrip className="info" hideCloseButton>
      {info}
    </MessageStrip>
  );
}
