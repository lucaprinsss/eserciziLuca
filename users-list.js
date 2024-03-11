'use strict';

let list = 'Luigi De Russis, Luca Mannella, Fulvio Corno, Juan Pablo Saenz Moreno, Luca Pezzolla';

let array = list.split(', '); //tolgo anche lo spazio dopo virgola

let arrayAcronyms = [...array];

for(let nome of array) {
    for (let carattere of nome) {
        if(carattere === carattere.toUpperCase()) {
            let indice = array.indexOf(nome);
            arrayAcronyms[indice] + '' + carattere;
        }     
    }
}



console.log('array: ' + array + '\n');
console.log('acronyms: ' + arrayAcronyms);