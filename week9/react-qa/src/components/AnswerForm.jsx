import dayjs from 'dayjs';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function AnswerForm(props) {
  const [text, setText] = useState(props.answer? props.answer.text : '');
  const [email, setEmail] = useState(props.answer? props.answer.email : '');
  const [date, setDate] = useState(props.answer? props.answer.date.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'));

  const handleSubmit = (event) => {
    event.preventDefault();
    //Creo una nuova risposta (un oggetto che contiene i valori, la risposta viene creata nel metodo addAnswer() in App.jsx)
    const answer = {text, email, date};
    //TODO: aggiungere validazioni
    
    if(props.mode==='edit') {
      //aggiorno la risposta
      props.updateAnswer({id: props.answer.id , ...[answer]});
    } else {
      //aggiungo la risposta (allo stato answers di App.jsx)
      props.addAnswer(answer);
    }
  }

  return(
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3'>
        <Form.Label>Text</Form.Label>
        <Form.Control type="text" required={true} minLength={2} value={text} onChange={(event) => setText(event.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>email</Form.Label>
        <Form.Control type="email" required={true} value={email} onChange={(event) => setEmail(event.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" value={date} onChange={(event) => setDate(event.target.value)}></Form.Control>
      </Form.Group>
      {props.mode==='add'&&<Button variant='success' type='Submit'>Add</Button>}
      {props.mode==='edit'&&<Button variant='success' type='Submit'>Update</Button>}
      <Button variant='danger' onClick={props.cancel}>Cancel</Button>
    </Form>
  );
}

export default AnswerForm;