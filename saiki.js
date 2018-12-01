function sum(n){
    if(n===0){
        return 0
    }
    return n + sum(n-1)
}
// console.log(sum(10));


function abc(k){
    if (k === 1){
        return 'ABC'
    }
    return 'A' + abc(k-1) + 'B' + abc(k-1)  + 'C'
}

function getStr(k, s, t){
    let str = abc(k) //strにk段目の文字が入る
    // return str.substr(from:s-1, length:t-s+1)
}
// console.log(getStr(k:10, s:2, t:100))

// console.log(abc(10))

function getChar(k, n){
    const len = length(k)
    const center = (len + 1) / 2
    if(n === 1){
        return 'A'
    }
    if(n === center){
        return 'B'
    }
    if(n === len){
        return 'C'
    }
    if(n > center){
        n = n-center
    } else {
        n = n-1
    }
    return getChar(k-1, n)
}
console.log(getChar(2, 3))