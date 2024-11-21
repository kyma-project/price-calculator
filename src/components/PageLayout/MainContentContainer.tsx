import React, { ReactNode } from 'react';
import MainContent from './MainContent';
import SideContent from './SideContent';
import DetailsTable from './DetailsTable';
import './MainContentContainer.css';

interface ContentLayoutProps {
  MainContent: ReactNode;
  SideContent: ReactNode;
}

const ContentLayout: React.FC<ContentLayoutProps> = ({
  MainContent,
  SideContent,
}) => {
  return (
    <div className="content-wrapper">
      <div className="main-content">{MainContent}</div>
      <div className="side-content">{SideContent}</div>
    </div>
  );
};

export default function MainContentContainer() {
  return (
    <>
      <ContentLayout
        MainContent={<MainContent />}
        SideContent={<SideContent />}
      />
      <DetailsTable />
    </>
  );
}
