const express = require('express');
const app = express();
const port = 3000;


app.get('/', (req, res) => res.send('Stripe Payment Service!'));
app.listen(port, () => console.log(`Stripe Payment Service listening on port http://localhost:${port} !`))
