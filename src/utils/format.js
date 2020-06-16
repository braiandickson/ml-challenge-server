const RESULTS_SIZE = 4;
const Author = {
  name: process.env.AUTHOR_NAME,
  lastname: process.env.AUTHOR_LASTNAME,
};

const formatPrice = (currency, price) => {
  let temp = {};
  temp = {
    currency: currency === 'ARS' ? '$' : '',
    amount: Math.trunc(price),
    decimals: Math.trunc((price % 1) * 100),
  };
  return temp;
};

const formatItems = (item) => {
  const {
    id,
    title,
    price,
    currency_id,
    thumbnail,
    condition,
    shipping,
  } = item;
  return {
    id,
    title,
    price: formatPrice(currency_id, price),
    picture: thumbnail,
    condition: condition === 'new' ? 'Nuevo' : 'Usado',
    free_shipping: shipping.free_shipping,
  };
};

const formatResults = (query) => {
  let newResults = {};
  const { filters, results } = query;
  newResults.author = { ...Author };
  newResults.categories = filters
    ? filters[0].values[0].path_from_root.map(({ name }) => name)
    : [];
  newResults.items = results
    ? results.map(formatItems).slice(0, RESULTS_SIZE)
    : [];
  return newResults;
};

const formatDetail = (detail, detailDescription) => {
  let product = {};
  const {
    id,
    title,
    currency_id,
    price,
    sold_quantity,
    pictures,
    condition,
    shipping,
  } = detail;
  const { plain_text: plainText } = detailDescription;

  product = {
    ...product,
    author: Author,
    id,
    title,
    picture: pictures[0].url,
    sold_quantity,
    condition: condition === 'new' ? 'Nuevo' : 'Usado',
    price: formatPrice(currency_id, price),
    free_shipping: shipping.free_shipping,
    description: plainText,
  };

  return product;
};

module.exports = { formatResults, formatDetail };
