import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo-hooks';
import { Flex, Box } from 'rebass';
import uniqBy from 'lodash/uniqBy';
import { Tabs, TabPanel } from 'react-tabs';
import { StyledTabList, StyledTab } from '../../Tabs';
import GET_SUBSTANCES from '../../../queries/substances';
import SubstanceCard from '../Card';
import { FormattedMessage } from 'react-intl';

const SubstanceRelated = ({ substance }) => {
  const { data } = useQuery(GET_SUBSTANCES, { variables: { limit: 300 } });
  if (data && data.substances) {
    const relatedSubstancesByChemicalClass =
      substance.class && substance.class.chemical
        ? data.substances.filter(
            _substance =>
              _substance.class &&
              _substance.class.chemical &&
              _substance.class.chemical.some(chemicalClass =>
                substance.class.chemical.includes(chemicalClass)
              )
          )
        : [];
    const relatedSubstancesByPsychoactiveClass =
      substance.class && substance.class.psychoactive
        ? data.substances.filter(
            _substance =>
              _substance.class &&
              _substance.class.psychoactive &&
              _substance.class.psychoactive.some(psychoactiveClass =>
                substance.class.psychoactive.includes(psychoactiveClass)
              )
          )
        : [];
    const relatedSubstances = [
      {
        id: 'Substance.allRelatedSubstances',
        value: uniqBy(
          [
            ...relatedSubstancesByChemicalClass,
            ...relatedSubstancesByPsychoactiveClass,
          ],
          'name'
        ),
      },
      {
        id: 'Substance.relatedByChemicalClass',
        value: relatedSubstancesByChemicalClass,
      },
      {
        id: 'Substance.relatedByPsychoactiveClass',
        value: relatedSubstancesByPsychoactiveClass,
      },
    ];
    return (
      <Tabs>
        <StyledTabList m={-1} pb={3}>
          {relatedSubstances.map(cat => (
            <StyledTab p={1} key={`${cat.id}-tab`}>
              <FormattedMessage id={cat.id} />
            </StyledTab>
          ))}
        </StyledTabList>
        {relatedSubstances.map(cat => (
          <TabPanel key={`${cat.id}-content`}>
            <Flex flexWrap="wrap" m={-1}>
              {cat.value.map(relatedSubstance => (
                <Box
                  p={1}
                  key={relatedSubstance.name}
                  width={[1, 1 / 2, 1 / 3]}
                >
                  <SubstanceCard substance={relatedSubstance} />
                </Box>
              ))}
            </Flex>
          </TabPanel>
        ))}
      </Tabs>
    );
  }
  return null;
};

SubstanceRelated.propTypes = {};

export default SubstanceRelated;
