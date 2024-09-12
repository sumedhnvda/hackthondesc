import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.route.js';
import postRoute from './routes/post.route.js';
import testRoute from './routes/test.route.js';
import userRoute from './routes/user.route.js';
import chatRoute from './routes/chat.route.js';
import messageRoute from './routes/message.route.js';

const app = express();

app.use(cors((req, callback) => {
  const corsOptions = {
    origin: true, // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include OPTIONS for preflight
    credentials: true, // Allow credentials (cookies)
  };

  callback(null, corsOptions); // Pass the options to the cors middleware
})); // <-- Missing closing bracket

app.use(express.json());
app.use(cookieParser());

// Your routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/test', testRoute);
app.use('/api/chats', chatRoute);
app.use('/api/messages', messageRoute);

app.listen(8800, () => {
  console.log('Server is running on port 8800!');
});
