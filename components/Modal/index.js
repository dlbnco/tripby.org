import React, { useEffect, Fragment, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';
import { space } from 'styled-system';

import styled from 'styled-components';
import Container from '../Container';
import Card from '../Card';

const FixedWrapper = styled.div`
  ${space}
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 1;
  overflow-y: auto;
  &:before {
    content: '';
    top: 0;
    left: 0;
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    background: rgba(0, 0, 0, 0.48);
  }
`;

FixedWrapper.defaultProps = {
  p: [1, 3, 4],
};

const Modal = ({
  children,
  content,
  maxWidth,
  onClose,
  isOpen: isOpenProp,
}) => {
  const [isOpen, setOpen] = useState(isOpenProp || false);
  const openModal = () => setOpen(true);
  const closeModal = () => {
    setOpen(false);
    onClose();
  };
  const controlProps = {
    openModal,
    closeModal,
    isOpen,
  };
  useEffect(() => {
    setOpen(isOpenProp);
  }, [isOpenProp]);
  if (typeof document !== 'undefined') {
    return (
      <Fragment>
        {typeof children === 'function' ? children(controlProps) : children}
        {isOpen &&
          ReactDOM.createPortal(
            <FixedWrapper>
              <Container maxWidth={maxWidth}>
                <OutsideClickHandler onOutsideClick={closeModal}>
                  <Card p={[3, 4]}>
                    {typeof content === 'function'
                      ? content(controlProps)
                      : content}
                  </Card>
                </OutsideClickHandler>
              </Container>
            </FixedWrapper>,
            document?.getElementById('__next')
          )}
      </Fragment>
    );
  }
  return null;
};

Modal.propTypes = {
  content: PropTypes.node,
  children: PropTypes.node,
  maxWidth: PropTypes.number,
};

export default Modal;
