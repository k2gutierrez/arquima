import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalBaja(props) {

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Baja de cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Razón para dar de baja:</p>
          <textarea class="form-control" onChange={props.onChange} id="exampleFormControlTextarea1" rows="4"></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClick}>
            Cancelar
          </Button>
          { props.mensajeBaja != null ? (
            <Button variant="primary" onClick={props.baja} >Dar de baja</Button>
          ) : (
            <Button variant="primary" onClick={props.baja} disabled >Dar de baja</Button>
          )
          }
          
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalBaja;