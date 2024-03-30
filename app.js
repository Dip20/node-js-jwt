const express = require('express');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const port = process.env.port || 5000

const app = express();

app.use(bodyParser.json());
app.use(routes);

app.listen(port, () => {
    console.log(`listening port: ${port}`);
});