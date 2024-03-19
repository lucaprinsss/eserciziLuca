'use strict';
import sqlite from 'sqlite3';

const db = new sqlite.Database('questions.sqlite', (err) => {
    if (err) throw err;
});

let sql = 'SELECT * FROM answer';
let results = [];

db.all(sql, (err, rows) => {
    if (err) throw err;
    for (let row of rows) 
        results.push(row);
});

for (let r of results)
    console.log(r);