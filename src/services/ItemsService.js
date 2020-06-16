const api = require('../config/api');

const searchItems = (query) => api.get(`sites/MLA/search?q=${query}`);

const productDetail = (id) => api.get(`/items/${id}`);

const productDetailDescription = (id) => api.get(`/items/${id}/description`);

module.exports = { searchItems, productDetail, productDetailDescription };
