import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styled from 'styled-components';
import { space, fontSize } from 'styled-system';
import { Box } from 'rebass';
import { useRouter } from 'next/router';

import Card from '../../Card';
import { FormattedMessage } from 'react-intl';
import Heading from '../../Heading';
import SubstanceEffects from '../Effects';

const tabs = [
  {
    id: 'summary',
    label: 'Substance.summary',
    content: ({ substance }) => substance.summary,
  },
  {
    id: 'effects',
    label: 'Substance.effects',
    content: ({ substance }) => (
      <SubstanceEffects effects={substance.effects} />
    ),
  },
];

const StyledTabList = styled(TabList)`
  ${space}
  display: flex;
  align-items: center;
  border-bottom: ${({ theme }) => theme.border};
`;

StyledTabList.defaultProps = {
  variant: 'primary',
};

const StyledTab = styled(Tab).attrs(() => ({ fontSize: 2 }))`
  ${space}
  ${fontSize}
  cursor: pointer;
  transition: 0.2s;
  color: ${({ theme }) => theme.textColor({ theme, variant: 'secondary' })};
  &.react-tabs__tab--selected,
  &:hover {
    color: ${({ theme }) => theme.colors.purpleHeart};
  }
`;

const SubstanceContent = ({ substance }) => {
  const contentfulTabs = tabs.filter(tab => substance[tab.id]);
  const { query, push, pathname } = useRouter();
  const selectedTabIndex = query.tab
    ? tabs.findIndex(tab => tab.id === query.tab)
    : 0;
  const onSelectTab = index =>
    push({
      pathname,
      query: {
        ...query,
        tab: tabs[index].id,
      },
    });
  return (
    <Card p={0} style={{ overflow: 'hidden' }}>
      <Tabs defaultIndex={selectedTabIndex} onSelect={onSelectTab}>
        <StyledTabList mx={-2} p={3}>
          {contentfulTabs.map(tab => {
            return (
              <StyledTab px={2} key={tab.id}>
                <FormattedMessage id={tab.label} />
              </StyledTab>
            );
          })}
        </StyledTabList>
        <Box p={3}>
          {contentfulTabs.map(tab => (
            <TabPanel key={`tab-${tab.id}-content`}>
              {tab.content({ substance })}
            </TabPanel>
          ))}
        </Box>
      </Tabs>
    </Card>
  );
};

SubstanceContent.propTypes = {};

export default SubstanceContent;
