const express = require('express');
const app = express();
const port = 3000;

const db = [
  { id: 1, title: 'item1' },
  { id: 2, title: 'item2' },
  { id: 3, title: 'item3' },
  { id: 4, title: 'item4' },
];
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// http://localhost:3000
// 이 뒤에 부터 /~~로 해당하는 url을 만들수 있다.
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/db', (req, res) => {
  res.send(db);
});

//특정 id의 값만 요청할때
app.get('/db/:id', (req, res) => {
  const {
    params: { id },
  } = req;
  const data = db.find((el) => el.id === parseInt(id));
  res.send(data);
});

// req.body를 통해 데이터를 추가
// req.body는 body-parser를 사용하기 전에는 디폴트 값으로 undefined가 설정되어 오류가 난다
// npm으로 body-parser를 설치해줘도 되지만 express의 버전업그레이드로 body-parser를 빌트인으로 넣었다.
app.post('/adddb', (req, res) => {
  const title = req.body.title;
  db.push({
    id: db.length + 1,
    title,
  });
  res.send('정상적으로 완료되었습니다.');
});

//update
app.post('/update-db', (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  db[id - 1].title = title;
  console.log(id);
  res.send('정상적으로 완료되었습니다.');
});
//delete
app.post('/delete-db', (req, res) => {
  const id = req.body.id;
  const data = db.filter((el) => el.id !== id);
  // db.splice(id - 1, 1);
  res.send(data);
});

//url이름으로 구분짓지 않고 http메소드를 활용한 rest api를 활용하여 표현력을 높이고 url은 통일할수 있다.
// create: post ,update: put or patch, delete: delete
// app.post('/db') ,  app.put('/db') , app.delete('/db')

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
