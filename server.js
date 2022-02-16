const db = require('./db/connection');
const express = require('express');

const PORT = process.env.port || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.connect(err => {
    if (err) throw err;
    console.log('Database connected!');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});