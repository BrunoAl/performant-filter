import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import useSWR from 'swr';
import ProductsFilter from '../components/productsFilter';
import ProductsList from '../components/productsList';
import Pagination from '../components/pagination';
import PageTitle from '../components/PageTitle';

const fetcher = url => fetch(url).then(res => res.json());

const PAGINATION_SIZE = 12;

export default function Home({ filters }) {
  const [selectedMinValue, setSelectedMinValue] = useState('');
  const [selectedMaxValue, setSelectedMaxValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [page, setPage] = useState(1);

  function onChangeSelectedMinValue(value) {
    setPage(1);
    setSelectedMinValue(value);
  }
  function onChangeSelectedMaxValue(value) {
    setPage(1);
    setSelectedMaxValue(value);
  }
  function onChangeSelectedCategory(value) {
    setPage(1);
    setSelectedCategory(value);
  }
  function onChangeSelectedColor(value) {
    setPage(1);
    setSelectedColor(value);
  }

  function onSetPage(page) {
    setPage(page);
  }

  const { data, error } = useSWR(
    `http://localhost:3000/api/products?min=${selectedMinValue}&max=${selectedMaxValue}&category=${encodeURIComponent(
      selectedCategory,
    )}&color=${selectedColor}&page=${page}&paginationSize=${PAGINATION_SIZE}`,
    fetcher,
  );

  if (error) return <h2>failed to load</h2>;
  if (!data) return <h2>Loading...</h2>;

  const { products, numberOfPages } = data;

  if (!filters) return null;

  return (
    <div>
      <Head>
        <title>Filtering Assignment</title>
      </Head>
      <PageTitle>Filtering Assignment</PageTitle>
      <ProductsFilter
        filters={filters}
        onChangeCategory={onChangeSelectedCategory}
        onChangeColor={onChangeSelectedColor}
        onChangeMaxValue={onChangeSelectedMaxValue}
        onChangeMinValue={onChangeSelectedMinValue}
        selectedCategory={selectedCategory}
        selectedColor={selectedColor}
        selectedMinValue={selectedMinValue}
        selectedMaxValue={selectedMaxValue}
      />

      <ProductsList products={products} />

      <Pagination numberOfPages={numberOfPages} selectedPage={page} onSetPage={onSetPage} />
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(`http://localhost:3000/api/products`);
  const { products } = await res.json();

  const filters = products.reduce(
    (prev, next) => {
      return {
        ...prev,
        colors: next.node?.colorFamily?.[0].name ? [...prev.colors, next.node.colorFamily[0].name] : prev.colors,
        categories: next.node?.categoryTags ? [...prev.categories, ...next.node?.categoryTags] : prev.categories,
      };
    },
    { colors: [], categories: [] },
  );

  return {
    props: {
      filters: { colors: [...new Set(filters.colors)], categories: [...new Set(filters.categories)] },
    },
  };
}

Home.propTypes = {
  filters: PropTypes.shape({}),
};
