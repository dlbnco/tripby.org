import React, { useState } from 'react';
import { Flex, Box } from 'rebass';
import Text from '../../Text';
import { useExperienceTracker } from '..';
import Button from '../../Button';

const Reset = () => {
  const { stop } = useExperienceTracker();
  const [isAskingToConfirm, toggleConfirmation] = useState(false);
  return (
    <div>
      {isAskingToConfirm ? (
        <Box>
          <Text fontWeight="bold" color="purpleHeart" textAlign="center" mb={2}>
            Are you sure?
          </Text>
          <Flex m={-2}>
            <Button m={2} onClick={stop}>
              Yes, reset
            </Button>
            <Button m={2} onClick={() => toggleConfirmation(false)}>
              No, nevermind
            </Button>
          </Flex>
        </Box>
      ) : (
        <Button onClick={() => toggleConfirmation(true)}>🌞 Reset</Button>
      )}
    </div>
  );
};

export default Reset;
