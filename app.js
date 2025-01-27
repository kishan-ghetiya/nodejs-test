const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./src/routes/auth.route');
const userRoutes = require('./src/routes/user.route');
const { errorHandler } = require('./src/utils/errorHandler');

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

app.use('/api/v1', authRoutes);
app.use('/api/v1', userRoutes);

app.use(errorHandler);

// Start the server directly here
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
