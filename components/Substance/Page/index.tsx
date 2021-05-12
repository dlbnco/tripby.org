import React from 'react';
import { Flex, Box } from 'rebass';
import { position } from 'styled-system';
import styled from 'styled-components';

import Container from '../../Container';
import SubstancePageHeader from '../Header';
import SubstanceContent from '../Content';
import SubstanceMeta from './Meta';
import { FullSubstance } from '../../../lib/psy.is';

const StickyHeader = styled(Box).attrs(() => ({
  position: ['relative', null, 'sticky'],
}))`
  ${position}
  top: 0;
  height: 100%;
`;

interface SubstancePageProps {
  substance: FullSubstance;
}

const SubstancePage: React.FC<SubstancePageProps> = ({ substance }) => {
  return (
    <Container py={[3, 4, 5]}>
      <SubstanceMeta substance={substance} />
      <Flex flexWrap="wrap" m={[-2, -3, -4]}>
        <StickyHeader width={[1, null, 2 / 5, 1 / 3]} p={[2, 3, 4]}>
          <SubstancePageHeader substance={substance} />
        </StickyHeader>
        <Box flex="1" p={[2, 3, 4]}>
          <SubstanceContent substance={substance} />
        </Box>
      </Flex>
    </Container>
  );
};

export default SubstancePage;
