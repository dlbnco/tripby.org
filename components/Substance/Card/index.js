import React from 'react';
import PropTypes from 'prop-types';
import { Card, StyledBody } from 'baseui/card';

const SubstanceCard = ({ substance }) => {
  return (
    <Card title={substance.name}>
      {substance.class && substance.class.psychoactive && (
        <StyledBody>{substance.class.psychoactive.join(' — ')}</StyledBody>
      )}
    </Card>
  );
};

SubstanceCard.propTypes = {};

export default SubstanceCard;
