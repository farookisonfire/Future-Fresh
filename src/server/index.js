const express = require('express');
const PORT = process.env.PORT || 3001;
const chargeRoutes = require('./stripe');
const { json } = require('body-parser');

const app = express();

app.use(express.static(__dirname + "/../../dist/build"));
app.use(json());
app.use('/charge', chargeRoutes);

app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
})
