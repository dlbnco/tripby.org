import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import messages from './messages';

import { defaultLocale } from '../../lib/constants';

addLocaleData([...en]);

const Provider = props => (
  <IntlProvider {...props} messages={messages[props.locale]} />
);

Provider.propTypes = {
  locale: PropTypes.string,
};

Provider.defaultProps = {
  locale: defaultLocale,
};

export default Provider;
