import React from 'react';
import PropTypes from 'prop-types';
import styles from './productCard.module.css';

export default function ProductCard({ data }) {
  return (
    <div className={styles.card}>
      <img className={styles.card__img} src={data.thumbnailImage.file.url} alt={data.name} />
      <div className={styles.card__info}>
        <h3 className={styles.card__title}>{data.name}</h3>
        <span className={styles.card__price}>€{data.shopifyProductEu.variants.edges[0].node.price}</span>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  data: PropTypes.shape({
    thumbnailImage: PropTypes.shape({
      file: PropTypes.shape({
        url: PropTypes.string,
      }),
    }),
    name: PropTypes.string,
    shopifyProductEu: PropTypes.shape({
      variants: PropTypes.shape({
        edges: PropTypes.arrayOf(
          PropTypes.shape({
            node: PropTypes.shape({
              price: PropTypes.string,
            }),
          }),
        ),
      }),
    }),
  }).isRequired,
};
