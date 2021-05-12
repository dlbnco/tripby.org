import React from 'react';
import fetch from 'isomorphic-unfetch';
import { Flex, Box } from 'rebass';
import uniqBy from 'lodash/uniqBy';
import { Tabs, TabPanel } from 'react-tabs';
import { StyledTabList, StyledTab } from '../../Tabs';
import GET_SUBSTANCES from '../../../queries/substances';
import SubstanceCard from '../Card';
import { FormattedMessage } from 'react-intl';
import { useQuery } from 'react-query';
import { FullSubstance, Substance } from '../../../psy.is/types';
import { QUERY_LIMIT, WIKI_API_URL } from '../../../lib/constants';
import { print } from 'graphql';

interface SubstanceRelatedProps {
  substance: FullSubstance;
}

const SubstanceRelated: React.FC<SubstanceRelatedProps> = ({ substance }) => {
  const { data } = useQuery<{ data: { substances: Substance[] } }>(
    'substances',
    async () => {
      const result = await fetch(WIKI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: print(GET_SUBSTANCES),
          variables: {
            limit: QUERY_LIMIT,
          },
        }),
      });
      return await result.json();
    }
  );
  if (data?.data?.substances != null) {
    const otherSubstances = data.data.substances.filter(
      (sub) => sub.name !== substance.name
    );
    const relatedSubstancesByChemicalClass =
      substance.class && substance.class.chemical
        ? otherSubstances.filter(
            (_substance) =>
              _substance.class &&
              _substance.class.chemical &&
              _substance.class.chemical.some((chemicalClass) =>
                substance.class.chemical.includes(chemicalClass)
              )
          )
        : [];
    const relatedSubstancesByPsychoactiveClass =
      substance.class && substance.class.psychoactive
        ? otherSubstances.filter(
            (_substance) =>
              _substance.class &&
              _substance.class.psychoactive &&
              _substance.class.psychoactive.some((psychoactiveClass) =>
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
    const contentfulRelatedSubstances = relatedSubstances.filter(
      (cat) => cat.value.length > 0
    );
    return (
      <Tabs>
        <StyledTabList m={-1} pb={3}>
          {contentfulRelatedSubstances.map((cat) => (
            <StyledTab p={1} key={`${cat.id}-tab`}>
              <FormattedMessage id={cat.id} />
            </StyledTab>
          ))}
        </StyledTabList>
        {contentfulRelatedSubstances.map((cat) => (
          <TabPanel key={`${cat.id}-content`}>
            <Flex flexWrap="wrap" m={-1}>
              {cat.value.map((relatedSubstance) => (
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
