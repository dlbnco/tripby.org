import React from 'react';
import TimeMachineWizardLayout from '.';
import '@testing-library/jest-dom/extend-expect';
import renderWithWrapper from '../../../../utils/tests/renderWithWrapper';
import TimeMachineContext from '../../context';

const start = jest.fn();

const defaultProps = { start };

const WithContext = props => (
  <TimeMachineContext.Provider value={{ ...defaultProps, ...props }}>
    <TimeMachineWizardLayout />
  </TimeMachineContext.Provider>
);

describe('<TimeMachineWizard />', () => {
  let render;
  beforeEach(() => {
    render = props => renderWithWrapper(<WithContext {...props} />);
  });
  test('should render without crashing', () => {
    render();
  });
  test('should display the active state when active', () => {
    const { container } = render({ isActive: true });
    const element = container.querySelector(
      '[data-test="time-machine-active-state"]'
    );
    expect(element).toBeInTheDocument();
  });
});
