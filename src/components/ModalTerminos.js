import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import logoA from '../../public/ArquimaA.png'
import Image from 'next/image';

function ModalTerminos(props) {

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        backdrop="static"
        keyboard={false}
        size='xl'
      >
        <Modal.Header>
          <Modal.Title>
            <Image className='img-fluid' alt='logoA' src={logoA} width={150} height={150} />
            Términos y condiciones
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Aqui van los términos y condiciones
        </Modal.Body>
        <Modal.Footer>
            <Form.Check aria-label="option 1" label="Acepto términos y condiciones" onClick={props.aceptar} />
            { props.terms == true ? (
                <Button variant="primary" onClick={props.onClick} >Aceptar</Button>
                ) : (
                <Button variant="primary" onClick={props.onClick} disabled>Aceptar</Button>
                )
            }
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalTerminos;