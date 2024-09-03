import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';

import roomHandler from './socket/roomHandler.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/auth', authRoutes);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
});

io.on("connection", (socket) => {
    console.log("User connected");

    roomHandler(socket);

    socket.on('disconnect', () => {
        console.log("User disconnected");
    });
});

const PORT = process.env.PORT || 6001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/meet-app';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    server.listen(PORT, () => {
        console.log(`Running @ ${PORT}`);
    });
}).catch((err) => {
    console.log("Error: ", err);
});
