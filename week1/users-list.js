'use strict';

let list = 'Luigi De Russis, Luca Mannella, Fulvio Corno, Juan Pablo Saenz Moreno, Luca Pezzolla';

let array = list.split(', '); //tolgo anche lo spazio dopo virgola

let arrayAcronyms = [];

for(let nome of array) {
    let indice = array.indexOf(nome);
    arrayAcronyms[indice] = '';
    for (let carattere of nome) {
        if( (carattere === carattere.toUpperCase()) && (carattere !== ' ')/*ulteriori controlli*/ ) { 
            arrayAcronyms[indice] += carattere;
        }     
    }
}

//stampa non ordinata
//for (let i=0; i<array.length; i++) {
//    console.log(`${arrayAcronyms[i]} - ${array[i]}`);
//}

let ordinamento = [...arrayAcronyms].sort();

for (let acr of ordinamento) {
    let indice = arrayAcronyms.indexOf(acr);
    console.log(`${arrayAcronyms[indice]} - ${array[indice]}`);
}