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
import SubstanceRelated from '../Related';
import { StyledTabList, StyledTab } from '../../Tabs';
import SubstanceInteractions from '../Interactions';

const tabs = [
  {
    id: 'summary',
    label: 'Substance.summary',
    content: ({ substance }) => substance.summary || null,
  },
  {
    id: 'effects',
    label: 'Substance.effects',
    content: ({ substance }) =>
      substance.effects ? (
        <SubstanceEffects effects={substance.effects} />
      ) : null,
  },
  {
    id: 'related',
    label: 'Substance.related',
    content: ({ substance }) =>
      substance.class &&
      (substance.class.psychoactive || substance.class.chemical) ? (
        <SubstanceRelated substance={substance} />
      ) : null,
  },
  {
    id: 'interactions',
    label: 'Substance.interactions',
    content: ({ substance }) =>
      substance.dangerousInteractions ||
      substance.uncertainInteractions ||
      substance.unsafeInteractions ? (
        <SubstanceInteractions substance={substance} />
      ) : null,
  },
];

const BorderedTabList = styled(StyledTabList)`
  border-bottom: ${({ theme }) => theme.border};
`;

BorderedTabList.defaultProps = {
  variant: 'primary',
  fontSize: 2,
};

const SubstanceContent = ({ substance }) => {
  const contentfulTabs = tabs.filter(
    tab => tab.content({ substance }) !== null
  );
  const { query, push, pathname } = useRouter();
  const selectedTabIndex = query.tab
    ? contentfulTabs.findIndex(tab => tab.id === query.tab)
    : 0;
  const onSelectTab = index =>
    push({
      pathname,
      query: {
        ...query,
        tab: contentfulTabs[index].id,
      },
    });
  return (
    <Card shadow={false} p={0} style={{ overflow: 'hidden' }}>
      <Tabs defaultIndex={selectedTabIndex} onSelect={onSelectTab}>
        <BorderedTabList mx={-2} p={3}>
          {contentfulTabs.map(tab => {
            return (
              <StyledTab px={2} key={tab.id}>
                <FormattedMessage id={tab.label} />
              </StyledTab>
            );
          })}
        </BorderedTabList>
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
