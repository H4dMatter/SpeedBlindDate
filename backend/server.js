//Packages
const express = require('express');
const app = express ();
const indexRouter = require('./index');
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/speeddating";
const PORT = process.env.PORT || 5000; //looks at environment variable named PORT (on system) and checks on which port process is running
const db = mongoose.connection;



//Database connection
mongoose.connect(url, { useNewUrlParser: true });
db.once('open', () => console.log('Connected to mongoose'));
db.on('error', () => console.log('db.connection error'));

//Uses
app.use('/', indexRouter);
app.use(express.json());
app.use(express.urlencoded());



//Port
app.listen(PORT, () => console.log(`Server started on ${PORT}`));



