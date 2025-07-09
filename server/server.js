const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.post('/login', (req, res) => {
  const { user, pass } = req.body || {};
  if (user === 'admin' && pass === '1234') {
    return res.sendStatus(200);
  }
  res.sendStatus(401);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
