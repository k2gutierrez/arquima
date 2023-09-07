import Card from 'react-bootstrap/Card';

function DashboardCard(props) {
    let variant = props.variant
  return (
    <>
        <Card
          bg={variant.toLowerCase()}
          text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
          style={{ width: '18rem' }}
          className="mb-2"
        >
          <Card.Header>{props.header}</Card.Header>
          <Card.Body>
            <Card.Title>{props.title} {props.title2}</Card.Title>
          </Card.Body>
        </Card>
    </>
  );
}
{/* 'Primary'
        'Secondary'
        'Success'
        'Danger'
        'Warning'
        'Info'
        'Light'
        'Dark' */}

export default DashboardCard;