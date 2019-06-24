import React from 'react';
import { Flex, Box } from 'rebass';
import Button from '../Button';
import Modal from '../Modal';
import QrCode from './QrCode';
import Text from '../Text';
import { FormattedMessage } from 'react-intl';

const Donate = () => {
  return (
    <Modal
      maxWidth={640}
      content={({ closeModal }) => (
        <Flex flexDirection="column" alignItems="center" m={-2}>
          <Text fontSize={4} p={2}>
            <FormattedMessage id="App.donate.bitcoinCash" />
          </Text>
          <Box p={2} style={{ maxWidth: '100%', overflow: 'auto' }}>
            <pre>bitcoincash:qz63dps5fmdvre3g8jkm8cywkhd5audnas2g9gwzt2</pre>
          </Box>
          <Box p={2}>
            <QrCode width="128" />
          </Box>
          <Button bg="none" onClick={closeModal} m={2}>
            <FormattedMessage id="App.close" />
          </Button>
        </Flex>
      )}
    >
      {({ openModal }) => (
        <Button onClick={openModal}>
          <FormattedMessage id="App.donate" />
        </Button>
      )}
    </Modal>
  );
};

export default Donate;
