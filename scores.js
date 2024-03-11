'use strict';

let scores = [20, -5, -1, 100, -3, 30, 50];
let scoresNN = []; //scoresNoNegative

//rimuovo valori negativi

for (let num of scores){
    if (num >= 0)
        scoresNN.push(num);  
}
let NN = scores.length - scoresNN.length; //number of negative values removed

//per rimuovere i due valori più bassi, 
//ordino l'array in maniera crescente e rimuovo il primo valore due volte

scoresNN.sort((a, b) => a - b);
scoresNN.shift();
scoresNN.shift();

//calcolo media

//const sumWithInitial = array.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue,);
let avg = scoresNN.reduce((acc, curr) => acc + curr, 0);
avg /= scoresNN.length;
avg = Math.round (avg);

//inserisco valore della media in fondo all'array per NN+2 volte

for(let i = 0; i < NN+2; i++){
    scoresNN.push(avg);
}

console.log('scores: '+scores);
console.log('scoresNoNegative: '+ scoresNN);