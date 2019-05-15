import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import Card from '../../Card';
import Heading from '../../Heading';
import Text from '../../Text';
import { colors } from '../../../lib/constants';

const SubstanceCard = ({ substance }) => {
  return (
    <Link href={`substances?name=${substance.name}`}>
      <a>
        <Card>
          <Heading mb={2} fontSize={2} fontWeight="500">
            {substance.name}
          </Heading>
          {substance.class && substance.class.psychoactive && (
            <Text color={colors.persianGreen}>
              {substance.class.psychoactive.join('/')}
            </Text>
          )}
        </Card>
      </a>
    </Link>
  );
};

SubstanceCard.propTypes = {
  substance: PropTypes.object.isRequired,
};

export default SubstanceCard;
