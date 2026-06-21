const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Blog API!' });
});

app.use('/api/posts', require('./routes/post.routes'));
app.use(require('./middlewares/errorHandler'));

module.exports = app;