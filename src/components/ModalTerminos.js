import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function ModalTerminos(props) {

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Aqui pueden ir términos y condiciones o ponemos links que abran una página aparte
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