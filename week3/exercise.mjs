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

    this.getAnswers = () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT answer.id, text, user.email, date, score) FROM answer, user WHERE answer.questionId=? AND answer.authorId=user.id';
            db.all(sql, [this.id], (err, rows) => {
                if (err) 
                    reject(err);
                else {
                    const answers = rows.map(ans => new Answer(ans.id, ans.text, ans.date, ans.score));
                    resolve(answers);
                }         
            });
        });
    }
}

function Answer(id, text, email, date, score=0) { 
    this.id = id;
    this.text = text;
    this.email = email;
    this.date = dayjs(date);
    this.score = score;

    this.toString = () => {
        return `${this.username} replied '${this.text}' on ${this.date.format('YYYY-MM-DD')} and got a score of ${this.score}`;
    }
}