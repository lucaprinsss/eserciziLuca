import sqlite from 'sqlite3';
import dayjs from 'dayjs';

const db = new sqlite.Database('questions.sqlite', (err) => {
    if (err) throw err;
});

function Question(id, text, email, date) {
    this.id = id;
    this.text = text;
    this.email =email;
    this.date = dayjs(date);

    //ritorna tutte le risposte di una domanda
    this.getAnswers = () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT a.id, a.text, u.email, a.date, a.score FROM answer a, user u WHERE a.authorId=u.id AND a.questionId=?';
            db.all(sql, [this.id], (err, rows) => {
                if (err) 
                    reject(err);
                else {
                    const answers = rows.map(ans => new Answer(ans.id, ans.text, ans.email, ans.date, ans.score));
                    resolve(answers);
                }         
            });
        });
    }

    //aggiungo una Answer , che passo come parametro, nel db. Answer nel codice ha (id, text, email, date, score=0) ma nel db ha |id, text, authorid, date, score, questionId|
    //quindi devo recuperare l'authorId dalla tabella user
    this.addAnswer = (answer) => {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id FROM user WHERE email=?';
            db.get(sql, answer.email, (err, row) => {
                if (err) {
                    reject(err);
                } else if (row !== undefined) {
                    sql = 'INSERT INTO answer(text, authorId, date, score, questionId) VALUES (?,?,DATE(?),?,?)';
                    db.run(sql, [answer.text, row.id, answer.date.toISOString(), answer.score, this.id], function (err) {
                        if (err)
                            reject(err);
                        else
                            resolve(this.lastID);
                    });
                } else 
                    reject('User\'s email not found in db');   
            });
        });

    }

    //ritorna le num risposte migliori, ordinate per score
    this.getTop = (num) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT a.id, a.text, u.email, a.date, a.score FROM answer a, user u WHERE a.authorId=u.id AND a.questionId=? ORDER BY a.score DESC LIMIT ?';
            db.all(sql, [this.id, num], (err, rows) => {
                if (err) 
                    reject(err);
                else {
                    const answers = rows.map(ans => new Answer(ans.id, ans.text, ans.email, ans.date, ans.score));
                    resolve(answers);
                }
            });
        });
    }

    this.toString = () =>{
        return `Domanda con id: ${this.id}, testo: ${this.text}, scritta da ${this.email}, il ${this.date.format('YYYY-MM-DD')}`;
    }
}

function Answer(id, text, email, date, score=0) { 
    this.id = id;
    this.text = text;
    this.email = email;
    this.date = dayjs(date);
    this.score = score;

    this.toString = () => {
        return `${this.email} replied '${this.text}' on ${this.date.format('YYYY-MM-DD')} and got a score of ${this.score}`;
    }
}

function QuestionList () {

    //ritorna la question con l'id passato come parametro
    this.getQuestion = (id) => {
        return new Promise ((resolve, reject) => {
            const sql = 'SELECT q.id, q.text, u.email, q.date FROM question q, user u WHERE q.authorId=u.id AND q.id=?';
            db.get(sql, id, (err, row) => {
                if (err)
                    reject(err);
                else if (row !== undefined) {
                    const question = new Question(row.id, row.text, row.email, row.date);
                    //const question = new Question([...row]); NON SI PUO' FARE PERCHE' ROW E' UN OGGETTO JAVASCRIPT (CHE NON E' ITERABILE)
                    resolve(question);
                } else {
                    resolve ('Id della Question non presente');
                }

            });
        });
    }

    //inserisce una Question nel db. La tabella question ha i campi |id, text, authorId, date| ma nel codice Question ha campi |id, text, email, date|, 
    //qundi devo recupera l'id dell'autore
    this.addQuestion = (question) => {
        return new Promise ((resolve, reject) => {
            let sql = 'SELECT id FROM user WHERE email=?'; 
            db.get(sql, question.email, (err,row) => {
                if (err) {
                    reject(err);
                } else if (row !== undefined){
                    sql = 'INSERT INTO question(text, authorId, date) VALUES (?,?,DATE(?))';
                    db.run(sql, [question.text, row.id, question.date.toISOString()], function (err) {
                        if (err)
                            reject(err);
                        else
                            resolve(this.lastID);
                    });
                } else {
                    reject('Email not found in table user');
                }
            });
        });
    }

    //ritorna un array con tutte le domande effettuate dopo la data passata come parametro (le domande in quella data sono escluse)
    this.afterDate = (date) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT q.id, q.text, u.email, q.date FROM question q, user u WHERE q.authorId=u.id AND q.date > DATE(?) ORDER BY q.date';
            db.all(sql, dayjs(date).toISOString(), (err, rows) => {
                if (err) {
                    reject(err);
                } else if (rows !== undefined) {
                    const results = rows.map(question => new Question(question.id, question.text, question.email, question.date));
                    resolve(results);
                } else
                    reject('There aren\'t questions after the selected date');
            });
        });
    }
}

    

//////////////////////////////////////////////////////////////////////////////////

//  PROVE CON ASYNC/AWAIT   //
/*async function main () {
    let fake = new Question(1, '', '', '');
    const results = await fake.getAnswers();
}
main ();*/
//OPPURE CON PROMISE
//let fake = new Question(3, '', '', '');
//fake.getAnswers().then(results => {console.log(results)});
    // OPPURE CON toString() //
    //fake.getAnswers().then(results => results.forEach(answer => {console.log(answer.toString());}));*/
//fake.addAnswer(new Answer(undefined, 'Of course! And 2+2=FISH', 'luca.mannella@polito.it', '2024-03-21')).then(() => console.log('Aggiunta risposta')).then(() => fake.getAnswers().then(results => results.forEach(answer => console.log(answer.toString()))));
let fakeList = new QuestionList();
//fakeList.getQuestion(1).then(result => {console.log(result)});
//fakeList.addQuestion(new Question(undefined, "Is 1 bigger than 10?", "luigi.derussis@polito.it", dayjs())).then(result => console.log('Id of question entered: ' + result));
//fakeList.afterDate('2024/02/10').then(results => results.forEach(question => console.log(question)));

/*async function main() {
    const question = await fakeList.getQuestion(3);
    console.log(question.toString()); //Stampa question con id 3

    const idAnswer = await question.addAnswer(new Answer(undefined, 'Of course! And 2+2=FISH', 'luca.mannella@polito.it', '2024-03-21'))
    console.log('\nAggiunta risposta con id ' + idAnswer);

    const answers = await question.getAnswers();
    answers.forEach(answer => console.log(answer.toString()));
}
main();*/