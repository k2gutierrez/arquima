import React from 'react'
import logoA from '../../public/ArquimaA.png'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Image from 'next/image';

function ModalG(props) {
  return (
    <Modal centered={true} show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
        <Modal.Title>
            <Image className='img-fluid' alt='logoA' src={logoA} width={150} height={150} />
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='text-center'>
            <p>{props.message}</p>
        </div>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={props.onClick}>
            {props.button}
        </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default ModalG