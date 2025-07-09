const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();
app.use(express.json());
app.use(session({
  secret: 'uma-chave-secreta',
  resave: false,
  saveUninitialized: false
}));
app.use(express.static(path.join(__dirname, '..', 'public')));

function checkAuth(req, res, next) {
  if (req.session && req.session.user) return next();
  return res.redirect('/login.html');
}

app.post('/login', (req, res) => {
  const { user, pass } = req.body || {};
  if (user === 'admin' && pass === '1234') {
    req.session.user = user;
    return res.sendStatus(200);
  }
  res.sendStatus(401);
});

app.get('/dashboard.html', checkAuth, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'dashboard.html'));
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login.html');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
