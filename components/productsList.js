import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from './productCard';
import styles from './ProductsList.module.css';

console.log(styles);
export default function ProductsList({ products }) {
  if (products.length === 0) {
    return <div className={styles['not-found']}>No items found :(</div>;
  }

  return (
    <ul className={styles.list}>
      {products.map(({ node }) => (
        <li key={node.name}>
          <ProductCard data={node} />
        </li>
      ))}
    </ul>
  );
}

ProductsList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
