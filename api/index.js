import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
dotenv.config();

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


app.use(cors({credentials:true,origin:'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser());



app.use('/auth', authRoutes);

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

