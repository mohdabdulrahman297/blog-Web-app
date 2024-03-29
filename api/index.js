import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary'
import authRoutes from './routes/auth.js'
import postRoute from './routes/newPost.js'
import getPostsRoute from './routes/getPosts.js'
import deletePostRoute from './routes/deletePost.js'
import updatePostRoute from './routes/updatePost.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();

const __dirname = path.resolve();

const app = express();

const salt = bcrypt.genSaltSync(10);
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });


app.get('/test', (req,res) => {
res.json ('test done');
});


app.use(cors());
app.use(express.json());
app.use(cookieParser());



cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})



app.use('/auth', authRoutes);

app.use('/newpost', postRoute);

app.use('/getPosts', getPostsRoute);

app.use('/deletePost', deletePostRoute);

app.use('/updatePost', updatePostRoute);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

  app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, {}, (err,info) => {
      if (err) throw err;
      res.json(info);
    });
  });

  app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
  });

app.listen(4000, () => {
    console.log('Server is running on port 4000!');
  });

