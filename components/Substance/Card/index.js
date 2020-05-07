import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import Card from '../../Card';
import Heading from '../../Heading';
import Text from '../../Text';
import { colors, NODE_ENV } from '../../../lib/constants';

const SubstanceCard = React.memo(({ substance }) => {
  return (
    <Link
      href={
        NODE_ENV === 'production'
          ? `substance/${substance.name}`
          : `substance?name=${substance.name}`
      }
    >
      <a>
        <Card style={{ overflow: 'auto' }}>
          <Heading fontSize={2} fontWeight="500">
            {substance.name}
          </Heading>
          {(() => {
            if (substance.class) {
              if (
                Array.isArray(substance.class.psychoactive) &&
                substance.class.psychoactive.length > 0
              ) {
                return (
                  <Text mt={2} color={colors.persianGreen}>
                    {substance.class.psychoactive.join(' / ')}
                  </Text>
                );
              } else if (
                Array.isArray(substance.class.chemical) &&
                substance.class.chemical.length > 0
              ) {
                return (
                  <Text mt={2} color={colors.persianGreen}>
                    {substance.class.chemical.join(' / ')}
                  </Text>
                );
              }
            }
          })()}
        </Card>
      </a>
    </Link>
  );
});

SubstanceCard.propTypes = {
  substance: PropTypes.object.isRequired,
};

export default SubstanceCard;
