const express = require('express');
const app = express();
const width = 10;
const height = 10;
const bomCount = 10;
var board = [];
i=0;

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

// hasBomをfalseからtrueに変更する処理
while (i==bomCount) {
  board[x][y].hasBom = true;
  i += 1;
  console.log("作動しています");
}

app.get('/', (req, res) => {
// 爆弾のある位置を返さないように要素を削除する
  // update_arr = board;
  // for(x=0; x<height; ++x){
  //   for(y=0; y<width; ++y){
  //     delete update_arr[x][y].hasBom;
  //   };
  // };
  // res.json(update_arr);

});

app.get('/board', (req, res) => {
  query = req.query;
  x = query.x;
  y = query.y;
  if(x|y != null){
  // 加算する場所と加算後の値
    // board[y][x] += 1;
    board[x][y].hasBom = true;
    res.json(board);
    console.log(board);
  };
});

app.listen(8000);