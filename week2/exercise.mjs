'use strict';

import dayjs from 'dayjs';

function Answer(text, username, date, score=0) { 
    //assumiamo che di dafault lo score sia zero
    //i valori di dafault si mettono alla fine dell'elenco di parametri
    this.text = text;
    this.username = username;
    this.date = dayjs(date);
    this. score = score;

    this.toString = () => {
        return `${this.username} replied '${this.text}' on ${this.date.format('YYYY-MM-DD')} and got a score of ${this.score}`;
    }
}

function Question(text, username, date) {
    //non passiamo la lista di risposte perché quando creo la domanda non esistono ancora le risposte
    this.text = text;
    this.username =username;
    this.date = dayjs(date);
    this.answers = [];

    this.add = (answer) => {
        this.answers.push(answer);
    }

    this.find = (username) => {
        /*const foundAnswers = [];
        for(let ans of this.anwers) {
            if(ans.username ===username)
                foundAnswers.push(ans);            
        }
        return foundAnswers;*/

        //con la functional programming diventa
        return this.answers.filter(ans => ans.username === username);
    }

    this.afterDate = (date) => {
        return this.answers.filter(ans => ans.date.isAfter(dayjs(date)));
    }

    this.listByDate = () => {
        return [...this.answers].sort((a,b) => (a.date.isAfter(b.date) ? 1 : -1));
        //sort() è un metodo in place, per non modificare l'array originale, creiamo una copia con [...array]
    }

    this.listByScore = () => { //decrescente
        return [...this.answers].sort((a,b) => b.score-a.score);
    }
}

const question = new Question('Is JS better than Python?', 'Luigi De Russis', '2024-02-27');

const firstAnswer = new Answer('Yes', 'Luca Mannella', '2024-02-28', -10);
const secondAnswer = new Answer('Not in a million year', 'Guido van Rossum', '2024-03-01', 5);
const thirdAnswer = new Answer('No', 'Albert Einstein', '2024-03-11');
const fourthAnswer = new Answer('I don\'t know', 'Luca Mannella', '2024-03-10');

question.add(firstAnswer);
question.add(secondAnswer);
question.add(thirdAnswer);
question.add(fourthAnswer);

const answersByLuca = question.find('Luca Mannella');

console.log(question);
console.log('\nAnswers by Luca: ' + answersByLuca);
console.log('\nBy date: ' + question.listByDate());
console.log('\nBy score: ' + question.listByScore());
console.log('\nAfter 2024-02-29: ' + question.afterDate('2024-02-29'));
