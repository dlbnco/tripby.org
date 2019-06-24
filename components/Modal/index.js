import React, { Fragment, useState } from 'react';
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
  min-height: 100vh;
  position: fixed;
  z-index: 1;
  &:before {
    content: '';
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: rgba(0, 0, 0, 0.48);
  }
`;

FixedWrapper.defaultProps = {
  p: 4,
};

const Modal = ({ children, content, maxWidth }) => {
  const [isOpen, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const controlProps = {
    openModal,
    closeModal,
    isOpen,
  };
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
          document.getElementById('__next')
        )}
    </Fragment>
  );
};

Modal.propTypes = {
  content: PropTypes.node,
  children: PropTypes.node,
  maxWidth: PropTypes.number,
};

export default Modal;
