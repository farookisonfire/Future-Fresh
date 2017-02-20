var express = require('express');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(__dirname + "/../../../dist/build"))

app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
})
