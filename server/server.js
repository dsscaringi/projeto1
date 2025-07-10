const express = require('express');
const path = require('path');
const session = require('express-session');
const fs = require('fs');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'change-this-secret',
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

app.post('/register', async (req, res) => {
  const { user, email, pass } = req.body || {};
  if (!user || !email || !pass) {
    return res.status(400).send('Dados inválidos');
  }
  const usersFile = path.join(__dirname, 'users.json');
  let users = [];
  if (fs.existsSync(usersFile)) {
    try {
      users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
    } catch (err) {
      users = [];
    }
  }
  if (users.some(u => u.user === user)) {
    return res.status(400).send('Usuário já existe');
  }
  const hash = await bcrypt.hash(pass, 10);
  users.push({ user, email, pass: hash });
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  res.redirect('/login.html');
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
