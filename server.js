const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;

app.use('/', express.static('public'));

// Read budget data from JSON file
app.get('/budget', (req, res) => {
    fs.readFile('budget-data.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading budget data');
            return;
        }
        const budget = JSON.parse(data).budget;
        res.json(budget);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});