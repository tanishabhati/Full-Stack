const express = require('express');
const config = require('./config/config');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(config.db.url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to database');
}).catch(err => console.log(err));

require('./routes/Routes')(app)
app.use(express.static('static'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
});

const Record = require('./model/Record');
app.post('/updateRecord', async (req, res) => {
    const date = new Date();
    
    const data = await Record.create({
        scholarId: req.body.data.scholarId,
        hostel: req.body.data.hostelAlloted,
        type: req.body.type,
    })
    res.status(200).json({ message: 'Record updated successfully' });
});

app.get('/test', (req, res) => {
    res.send('Hello World');
});

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});