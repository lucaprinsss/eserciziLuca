import 'bootstrap/dist/css/bootstrap.min.css';
import { Answer, Question } from "./QAModels.mjs";
import NavHeader from "./NavHeader";
import { Container } from 'react-bootstrap';
import QuestionDescription from './QuestionDescription';
import Answers from './Answers';
import { useState } from 'react';



const fakeQuestion = new Question(1, "Is JS better than Python?", "luigi.derussis@polito.it", "2024-02-07");
fakeQuestion.init();
const fakeAnswers = fakeQuestion.getAnswers();


function App() {
  const [question, setQuestion] = useState(fakeQuestion);
  const [answers, setAnswers] = useState(fakeAnswers);

  const voteUp = (answerId) => {  //Posso usare questo codice (come template) ogni volta che devo aggiornare un array dentro uno stato
    setAnswers(oldAnswers => {
      return oldAnswers.map(ans => {
        //Devo ritornare un nuovo array di risposte! Ecco perché usiamo map(), perché ritorna una copia dell'array vecchio
        if(ans.id === answerId)
          //Ritorno una nuova, aggiornata, risposta. Perché non posso modificare l'array su cui sto iterando
          return new Answer(ans.id, ans.text, ans.email, ans.date, ans.score+1);
        else 
          return ans;
      });
    })
  };

  return (
    <>
      <NavHeader questionNum={question.id}/>
      <Container fluid className='mt-3'>
        <QuestionDescription question={question} />
        <Answers answers={answers} voteUp={voteUp}></Answers>
      </Container>
    </>
  )
}

export default App
