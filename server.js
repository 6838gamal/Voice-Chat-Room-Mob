const express = require('express');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(express.static(path.join(__dirname, 'web')));

app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, 'web', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`SAWTAK running at http://0.0.0.0:${PORT}`);
});
