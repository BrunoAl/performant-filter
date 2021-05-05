import '../styles/globals.css';
import React from 'react';
import PropTypes from 'prop-types';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.node.isRequired,
  pageProps: PropTypes.shape({}),
};
