const express = require('express');
const app = express();
const width = 10;
const height = 10;
let count = 0;
const bomCount = 10;
const board = [];

// 0埋めの配列を作成(①)
// for(x=0; x<height; ++x){
//   arr = [];
//   for(y=0; y<width; ++y){
//     arr.push(0);
//   }
// board.push(arr);
// };
// console.log(board);

// 連想配列を作成(②)
for(x=0; x<height; ++x){
  arr = [];
  for(y=0; y<width; ++y){
    arr.push({
      x:x,
      y:y,
      hasBom: false,
      opened: false
    });
  }
board.push(arr);
};

// 配列のhasBom(true)をカウントする
// for(var k in board){
//   for(var i in board){
//     count = board[k][k].hasBom;
//     console.log(count);
//   }
// }

// hasBomをfalse→trueに変更する
while (count < bomCount) {
// ランダムに１から９の乱数を生成
  x = Math.floor(Math.random() * 10);
  y = Math.floor(Math.random() * 10);
  // console.log("施行"+count+"回目");
  
  if (board[x][y].hasBom == false){ 
    board[x][y].hasBom = true;
    console.log(x+"/"+y+"に爆弾が設置されました");
    count++;
  }
}

app.get('/', (req, res) => {
// 爆弾のある位置を返さないように要素を削除する
  update_arr = board;
  for(x=0; x<height; ++x){
    for(y=0; y<width; ++y){
      delete update_arr[x][y].hasBom;
    };
  };
  res.json(update_arr);

});

app.get('/board', (req, res) => {
  query = req.query;
  x = query.x;
  y = query.y;
  if(x|y != null){
  // 加算する場所と加算後の値
    // board[y][x] += 1;
    board[x][y].opened = true;
    res.json(board);
    console.log(board);
  };
});

app.listen(8000);