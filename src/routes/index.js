const { Router } = require('express');
const {
  searchItems,
  productDetail,
  productDetailDescription,
} = require('../services/ItemsService');
const { formatResults, formatDetail } = require('../utils/format');

const router = Router();

router.get('/', (req, res) => {
  const { q } = req.query;
  searchItems(q)
    .then((response) => {
      res.json(formatResults(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Promise.all([productDetail(id), productDetailDescription(id)])
    .then((results) => {
      res.json(formatDetail(results[0].data, results[1].data));
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
