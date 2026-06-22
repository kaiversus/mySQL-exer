import express from 'express';
import postRoutes from './routes/post.routes.js';
import authRoutes from './routes/auth.routes.js';
import tagRoutes from './routes/tag.routes.js';
import subscriberRoutes from './routes/subscriber.routes.js';
import profileRoutes from './routes/profile.routes.js';
import adminRoutes from './routes/admin.routes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Blog API!' });
});

app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/admins', adminRoutes);
app.use(errorHandler);

export default app;
