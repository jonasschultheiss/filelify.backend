const express = require('express');

const routes = require('./src/routes/index');

const port = process.env.PORT || 3000;

const app = express();
app.use('/api/v1', [routes]);

app.listen(port, () => console.log(`listening on port ${port}!`));
