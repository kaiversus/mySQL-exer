const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Blog API!' });
});

app.use('/api/posts', require('./routes/post.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/tags', require('./routes/tag.routes'));
app.use('/api/subscribers', require('./routes/subscriber.routes'));
app.use('/api/profile', require('./routes/profile.routes'));
app.use(require('./middlewares/errorHandler'));

module.exports = app;