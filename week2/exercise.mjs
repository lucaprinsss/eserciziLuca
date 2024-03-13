'use strict';

//CommonJS   modo per importare librerie standard per node
//const dayjs = require('dayjs');  //equivale ad import.dayjs di altri lingaggi


//ES module    ES sta per ECMAScript
//metodo per importare librerie di java. Non tutti moduli node sono compatibili con ES module, devo convertire il modulo manualmente (perché non viene fatto in automatico)
import dayjs from 'dayjs';

let oggiES = dayjs();

console.log(oggiES);
console.log(oggiES.format('YYYY-MM-DD'));

//se runno exercise.js con node, lui non accetta gli ES module e da errore
//devo rinominare il file in .mjs che sta per module JS