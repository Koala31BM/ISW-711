const dns =require('dns');
dns.setServers(['8.8.8.8','1.1.1.1'])


require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();

app.use(express.json());
const routes = require('./routes/routes'); // importar rutas
app.use('/api', routes); // usar rutas


app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})