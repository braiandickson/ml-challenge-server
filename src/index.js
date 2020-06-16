const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const ProductRoutes = require('./routes');
const { PORT } = require('./constants');

require('dotenv').config();

const app = express();

// settings

app.set('port', process.env.PORT || PORT);
app.set('json spaces', 2);

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use('/api/items', ProductRoutes);

// server running
app.listen(app.get('port'), () => {
  console.log(`Server running on port ${PORT}`);
});
