import React from 'react';
import { DynamicSideContent } from '@ui5/webcomponents-react';
import MainContent from './MainContent';
import SideContent from './SideContent';
import DetailsTable from './DetailsTable';

export default function MainContentContainer() {
  return (
    <div id="MainContentContainer">
      <DynamicSideContent
        sideContent={
          <div>
            <SideContent />
          </div>
        }
        sideContentVisibility="AlwaysShow"
        waitForDefine={true}
      >
        <MainContent />
      </DynamicSideContent>
      <DetailsTable />
    </div>
  );
}
