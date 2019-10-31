import React, { useState } from 'react';
import { Flex, Box } from 'rebass';
import Text from '../../../../Text';
import Button from '../../../../Button';
import { FormattedMessage } from 'react-intl';
import { useTimeMachine } from '../../..';

const Reset = () => {
  const { stop } = useTimeMachine();
  const [isAskingToConfirm, toggleConfirmation] = useState(false);
  return (
    <div>
      {isAskingToConfirm ? (
        <Box>
          <Text fontWeight="bold" color="purpleHeart" textAlign="center" mb={2}>
            <FormattedMessage id="TimeMachine.reset.confirmation" />
          </Text>
          <Flex m={-2}>
            <Button m={2} onClick={stop}>
              <FormattedMessage id="TimeMachine.reset.confirmation.yes" />
            </Button>
            <Button m={2} onClick={() => toggleConfirmation(false)}>
              <FormattedMessage id="TimeMachine.reset.confirmation.no" />
            </Button>
          </Flex>
        </Box>
      ) : (
        <Button onClick={() => toggleConfirmation(true)}>
          <FormattedMessage id="TimeMachine.reset" />
        </Button>
      )}
    </div>
  );
};

export default Reset;
