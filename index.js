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
      opened: false,
      exploded: false
    });
  }
board.push(arr);
};

// 爆弾を設置、hasBomをtrueにする(③)
while (count < bomCount) {
// ランダムに１から９の乱数を生成
  x = Math.floor(Math.random() * 10);
  y = Math.floor(Math.random() * 10);
  // console.log("施行"+count+"回目");
  // 爆弾を設置する
  if (board[x][y].hasBom == false){ 
    board[x][y].hasBom = true;
    console.log(x+"/"+y+"に爆弾が設置されました");
    count++;
  }
}

console.log("爆弾設置の結果↓↓↓");
console.log(board);

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
  // リクエストされた場所がクローズならオープンにする
  if(x|y != null){
    board[x][y].opened = true;
      // オープンにした場所に爆弾があればexplodedをtrueにする
      if(board[x][y].hasBom != false){
        board[x][y].exploded = true;
        // 爆弾を１つ減らす
        remain_bom = bomCount-1;
        console.log("残りの爆弾："+remain_bom);   
        // 他のhasBomを誘爆させる
        
        // 1つずつ配列の中を見てhasBomがtrueならexplodedをrueに変える
        // ２次元配列の値を取得する(１)

        // hasBomにアクセスする(2)
        // explodedにアクセスする(3)     

        // place = board.every(hasBom != false)
          // place = board.findAll(obj => obj.hasBom === true)
          // console.log("爆弾は"+place+"にありました");
          //   // console.log("爆弾は"+ep.hasBom+"にありました")
  
      
    };
    res.json(board);
    console.log(board);
  }
});

function Explode_bom(pre,cur){
    if (cur[0].hasBom == true){
        console.log(String(cur[0].x) + String(cur[0].y)+'で爆弾発見');
    }else{
        nextArray = cur;
      }
  };

result = board.reduce(Explode_bom,0)



app.listen(8000);