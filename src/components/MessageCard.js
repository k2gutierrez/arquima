import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function MessageCard(props) {
  return (
    <Card style={{ width: '25rem' }}>
        <Card.Body>
        <ListGroup>
            <ListGroup.Item variant="primary"><b>Pregunta: </b> { props.question }</ListGroup.Item>
            { props.answer !== "" ?
                (
                    <ListGroup.Item variant="success"><b>Respuesa: </b> { props.answer }</ListGroup.Item>
                ) : (
                    <ListGroup.Item variant="danger"><b>Respuesa: </b> { props.answer }</ListGroup.Item>
                )
            }
        </ListGroup>
        </Card.Body>
    </Card>
  );
}

export default MessageCard;