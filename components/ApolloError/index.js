import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from '../Card';
import Heading from '../Heading';
import Text from '../Text';
import Accordion from '../Accordion';

const Wrapper = styled(Card)`
  max-width: 480px;
`;

const ApolloError = ({ error, ...props }) => {
  const { message } = error;
  return (
    <Wrapper {...props}>
      <Text fontSize={4} mb={2} mx="auto">
        😕
      </Text>
      <Heading mb={3} fontSize={3}>
        Some error occurred, try again later
      </Heading>
      <Accordion label="Details">
        <Text variant="secondary">{message}</Text>
      </Accordion>
    </Wrapper>
  );
};

ApolloError.propTypes = {
  error: PropTypes.object.isRequired,
};

export default ApolloError;
