import React from 'react';
import TimeMachineWizardLayout from '.';
import renderWithWrapper from '../../../../utils/tests/renderWithWrapper';

const defaultProps = {};

describe('<TimeMachineWizard />', () => {
  let render;
  beforeEach(() => {
    render = () =>
      renderWithWrapper(<TimeMachineWizardLayout {...defaultProps} />);
  });
  test('should render without crashing', () => {
    render();
  });
});
