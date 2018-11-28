const express = require('express');
const app = express();
app.use(express.static('static'));
const width = 30;
const height = 30;
let count = 0;
const bomCount = 10;
let remain_bom;
const board = [];
const directions =[
    [-1,-1],
    [-1,0],
    [-1,2],
    [0,-1],
    [0,2],
    [1,-1],
    [1,0],
    [1,1]
  ];

const fs = require('fs');
const path = require('path');
const htmlPath = path.join(__dirname, './static/index.html');
innerhtml =fs.readFileSync(htmlPath, 'utf8');

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

app.get('/', (req, res) => {
// 爆弾のある位置を返さないように要素を削除する
  for(x=0; x<height; ++x){
    for(y=0; y<width; ++y){
      delete update_arr[x][y].hasBom;
    };
  };
  console.log(update_arr);
  res.json(update_arr);
});


app.get('/board', (req, res) => {
    // reqのxとyに値がある時のみ処理を行う
    x = req.query.x
    y = req.query.y
      // リクエストされた場所がクローズならオープンにする
      if(x|y != null){
          console.log("データを受け取ったよ!");
          point = board[x][y];
          point.opened = true;
          // point["user"]= user;
         
          // 周囲の爆弾をカウントする
          number = 0;
          for(i=0; i<directions.length; ++i){
              // direction配列から数値を取得する
              search_x = directions[i][0];
              search_y = directions[i][1];

              cur_x = parseInt(x)+parseInt(search_x);
              cur_y = parseInt(y)+parseInt(search_y);
            
              if(cur_x >= 0 && cur_y >= 0 && cur_x <= 9 && cur_y <= 9){
                  // 周囲8マスを計算、hasBomのtrueを探す
                  aroundBom = board[cur_x][cur_y];
                  // console.log(JSON.stringify(aroundBom)+'を探してます・・・');
                  count = aroundBom.hasBom
                    if(count==true){
                      // console.log(JSON.stringify(aroundBom)+'で爆弾を見つけました');
                    }
              // numberにtrueの数をカウントアップ
              number += count;
              }
          }
          // console.dir(number+'個の爆弾が見つかりました！');
          point["number"] = number;
          // console.log(point);

          // オープンにした場所に爆弾があればexplodedをtrueにする
          if(board[x][y].hasBom != false){
            board[x][y].exploded = true;
            
            remain_bom = 9;
            // 他のhasBomを誘爆させる
            while(remain_bom>0){
              for(i=0; i<10; ++i){
                for(k=0; k<10; ++k){
                  if(board[i][k].hasBom!=false){
                    board[i][k].exploded=true;
                    remain_bom--;
                  }
                }
              }
            };
          }
      res.json(board);
    }else{
      // console.log("通信中...");
      res.json(board);
    };
  // };
});
// console.log(board);

app.listen(8000);