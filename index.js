const express = require('express');
const app = express();
const board =[
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0]aaaaa
];

app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/board', (req, res) => {
  query = req.query;
  x = query.x;
  y = query.y;
  if(x|y != null){
  // 加算する場所と加算後の値
    board[y][x] += 1;
    // 配列の値を確認
    console.log(board);
    res.json(board);
  };
});

app.listen(8000);
