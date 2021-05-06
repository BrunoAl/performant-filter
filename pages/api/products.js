import nc from 'next-connect';
import productsData from '../../assets/products.json';

const allProducts = productsData.data.allContentfulProductPage.edges;

function filterProducts(products, query) {
  const { category, color, min, max } = query;

  const filterByCategory = product => {
    if (!category) return product;
    if (!product.node.categoryTags || product.node.categoryTags.length === 0) return null;
    return product.node.categoryTags.find(categoryItem => categoryItem === category);
  };

  const filterByColor = product => {
    if (!color) return product;
    if (!product.node.colorFamily || product.node.colorFamily.length === 0) return null;
    return product.node.colorFamily[0].name === color;
  };

  const filterByPrice = product => {
    if (!min && !max) return product;
    const productPrice = product.node?.shopifyProductEu?.variants?.edges[0]?.node?.price;
    if (!productPrice) return false;
    const priceValue = Number(productPrice);

    if (!min && max) return priceValue <= max;
    if (min && !max) return priceValue >= min;

    return priceValue >= min && priceValue <= max;
  };

  return products.filter(filterByCategory).filter(filterByColor).filter(filterByPrice);
}

function paginateProducts(products, page, size) {
  if (!page || !size) return products;
  return products.slice(size * (page - 1), size * page - 1);
}

const handler = nc().get((req, res) => {
  const { page, paginationSize } = req.query;

  const filteredProducts = filterProducts(allProducts, req.query);

  res.json({
    products: paginateProducts(filteredProducts, page, paginationSize),
    numberOfPages: page && paginationSize ? Math.ceil(filteredProducts.length / paginationSize) : 1,
  });
});

export default handler;
