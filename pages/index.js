import React from 'react';
import Home from '../components/Home';
import { withApollo } from '../lib/apollo/init';

const HomePage = () => <Home />;

export default withApollo({ ssr: true })(HomePage);
