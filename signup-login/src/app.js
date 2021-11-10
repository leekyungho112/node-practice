const express = require('express');
const argon2 = require('argon2');
const app = express();

const database = [
  {
    id: 1,
    username: 'lee',
    password: '1234',
  },
];
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/test', (req, res) => {
  res.send('test');
});
app.get('/users', (req, res) => {
  res.send(database);
});
app.post('/signup', async (req, res) => {
  const { username, password, age, email } = req.body;
  const hash = await argon2.hash(password);
  database.push({
    id: database.length + 1,
    username,
    password: hash,
    age,
    email,
  });
  res.send('ok!');
});
app.post('/login', async (req, res) => {
  //클라이언트에서 요청이 들어온 유저네임과 패스워드
  const { username, password } = req.body;

  const user = database.filter((user) => {
    return user.username === username;
  });
  if (user.length === 0) {
    res.status(403).send('ID가 없습니다');
    return;
  }
  if (!(await argon2.verify(user[0].password, password))) {
    res.status(403).send('잘못된 패스워드입니다');
    return;
  }
  res.send('로그인ok!');
});

app.listen(3000, () => {
  console.log('server on!');
});
