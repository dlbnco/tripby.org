import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo-hooks';
import { Flex, Box } from 'rebass';
import uniqBy from 'lodash/uniqBy';
import GET_SUBSTANCES from '../../../queries/substances';
import SubstanceCard from '../Card';

const SubstanceRelated = ({ substance }) => {
  const { data } = useQuery(GET_SUBSTANCES, { variables: { limit: 300 } });
  if (data && data.substances) {
    const relatedSubstancesByChemicalClass = data.substances.filter(
      _substance =>
        _substance.class &&
        _substance.class.chemical &&
        _substance.class.chemical.some(chemicalClass =>
          substance.class.chemical.includes(chemicalClass)
        )
    );
    const relatedSubstancesByPsychoactiveClass = data.substances.filter(
      _substance =>
        _substance.class &&
        _substance.class.psychoactive &&
        _substance.class.psychoactive.some(psychoactiveClass =>
          substance.class.psychoactive.includes(psychoactiveClass)
        )
    );
    const relatedSubstances = uniqBy(
      [
        ...relatedSubstancesByChemicalClass,
        ...relatedSubstancesByPsychoactiveClass,
      ],
      'name'
    );
    return (
      <Flex flexWrap="wrap" m={-1}>
        {relatedSubstances.map(relatedSubstance => (
          <Box p={1} key={relatedSubstance.name} width={[1, 1 / 2, 1 / 3]}>
            <SubstanceCard substance={relatedSubstance} />
          </Box>
        ))}
      </Flex>
    );
  }
  return null;
};

SubstanceRelated.propTypes = {};

export default SubstanceRelated;
