import React from 'react';
import PropTypes from 'prop-types';
import styles from './pageTitle.module.css';

export default function PageTitle({ children }) {
  return (
    <div>
      <h1 className={styles['page-title']}>{children}</h1>
    </div>
  );
}

PageTitle.propTypes = {
  children: PropTypes.node.isRequired,
};
