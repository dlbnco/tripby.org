import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Tabs, TabPanel } from 'react-tabs';
import { StyledTabList, StyledTab } from '../../Tabs';
import flatMap from 'lodash/flatMap';
import HomeClassList from '../ClassList';

const getClasses = (list, type) => {
  return [...new Set(flatMap(list, (substance) => substance?.class?.[type]))]
    .filter(Boolean)
    .sort((a, b) => a > b);
};

const HomeClassSelector = ({ selectedClass, data, onSelect, ...props }) => {
  const psychoactiveClasses = getClasses(data?.substances, 'psychoactive');
  const chemicalClasses = getClasses(data?.substances, 'chemical');
  return (
    <Tabs onSelect={onSelect}>
      <StyledTabList m={-2} justifyContent="center" mb={[3, 4]} {...props}>
        {['psychoactive', 'chemical'].map((classType) => (
          <StyledTab
            p={2}
            fontSize={[1, null, 3]}
            key={`classType-tab-${classType}`}
          >
            <FormattedMessage id={`Home.classes.${classType}.title`} />{' '}
          </StyledTab>
        ))}
      </StyledTabList>
      {[psychoactiveClasses, chemicalClasses].map((classList, idx) => (
        <TabPanel key={`class-tab-panel-${idx}`}>
          {!selectedClass && <HomeClassList classes={classList} />}
        </TabPanel>
      ))}
    </Tabs>
  );
};

export default HomeClassSelector;
