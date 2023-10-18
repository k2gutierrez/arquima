import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function MessageCardAs(props) {
  return (
    <div className='text-start col-sm-4 col-12 my-2'>
    <Card style={{ width: '25rem' }}>
        <Card.Body>
        <ListGroup>
          <ListGroup.Item><b>Nombre: </b> { props.name }</ListGroup.Item>
          <ListGroup.Item><b>Folio: </b> { props.folio }</ListGroup.Item>
          <ListGroup.Item variant="primary"><b>Pregunta: </b> { props.question }</ListGroup.Item>
          <ListGroup.Item variant="success"><b>Respuesa: </b> { props.answer }</ListGroup.Item>
        </ListGroup>
        <Form>
            <Form.Group className="my-2" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Responder: </Form.Label>
                <Form.Control as="textarea" rows={4} onChange={props.onChange} />
            </Form.Group>
            <Button type='button' onClick={props.onClick} variant="primary">Enviar</Button>
        </Form>
        </Card.Body>
    </Card>
    </div>
  );
}

export default MessageCardAs;