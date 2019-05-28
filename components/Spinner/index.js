import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';
import { Box } from 'rebass';

const emojis = ['💊', '🍄', '🍁', '☕', '🍫', '🍺', '🐸', '🧁', '🍷'];

const Wrapper = styled(Box)`
  ${({ size }) => css`
    width: ${size}px;
    height: ${size}px;
  `};
`;

const EmojiWrapper = styled.div`
  ${({ size }) => css`
    width: ${size}px;
    height: ${size}px;
  `};
  position: relative;
`;

const peekaboo = keyframes`
  0%, 20%, 100% {
    opacity: 0;
    scale: 0.25;
  }
  10% {
    opacity: 100;
    scale: 1;
  }
`;

const Emoji = styled.div`
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: ${({ size }) => size / 2.56}px;
  transform: translate(-50%, -50%);
  animation-play-state: running;
  animation-name: ${peekaboo};
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  ${({ duration }) => css`
    animation-delay: ${({ index }) => index * duration}s;
    animation-duration: ${duration * emojis.length}s;
  `}
`;

const Spinner = ({ size, duration, ...props }) => (
  <Wrapper size={size} {...props}>
    <EmojiWrapper size={size}>
      {emojis.map((emoji, index) => (
        <Emoji duration={duration} index={index} size={size} key={emoji}>
          {emoji}
        </Emoji>
      ))}
    </EmojiWrapper>
  </Wrapper>
);

Spinner.propTypes = {
  size: PropTypes.number,
  bordered: PropTypes.bool,
  duration: PropTypes.number,
};

Spinner.defaultProps = {
  size: 96,
  bordered: true,
  duration: 0.5,
};

export default Spinner;
