const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

//Connect to Database
connectDB();

//Init Middleware
app.use(express.json({extended: false}));

//Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));
const PORT = process.env.PORT || 5000;

//SERVE STATIC ASSETS IN PRODUCTION
if(process.env.NODE_ENV === 'production'){

  app.use(express.static('front-end/build'))
  app.get('*', (req, res) => sendFile(path.resolve(__dirname, '../front-end', 'build', 'index.html')));
}
app.listen( PORT, () => console.log(`Server started on port ${PORT}`));