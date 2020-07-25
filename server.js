const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/keys').mongoURI;
const items = require('./routes/api/items');
const path = require('path');
const app = express();

// BodyParser Middleware
app.use(bodyParser.json());

// Connect to the database
mongoose.connect(db, { useUnifiedTopology: true }).then(() => console.log('connected')).catch(error => console.log(error))

// use Routes
app.use('/api/items', items);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

// port for local and final deployment
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Server started in port', port);
});