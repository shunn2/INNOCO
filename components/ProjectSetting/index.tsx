import { useState } from 'react';
import InformationSetting from './Information';
import ParticipantsSetting from './Participants';
import VersionSetting from './Version';
import * as Styled from './styled';

const tabContents = [
  { tab: 1, contents: '정보 수정' },
  { tab: 2, contents: '참여자 관리' },
  { tab: 3, contents: '버전 관리' },
];

const ProjectEdit = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  return (
    <>
      <Styled.TabContainer>
        {tabContents.map((tab, tabIdx) => (
          <Styled.Tab
            key={`tab_${tabIdx}`}
            selected={selectedTab === tab.tab}
            onClick={() => setSelectedTab(tab.tab)}
          >
            {tab.contents}
          </Styled.Tab>
        ))}
      </Styled.TabContainer>
      {selectedTab === 1 && <InformationSetting />}
      {selectedTab === 2 && <ParticipantsSetting />}
      {selectedTab === 3 && <VersionSetting />}
    </>
  );
};

export default ProjectEdit;
