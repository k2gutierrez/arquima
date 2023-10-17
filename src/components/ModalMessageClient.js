import React, { useState } from 'react'
import logoA from '../../public/ArquimaA.png'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Image from 'next/image';
import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { db } from '@/firebase/config';

function ModalMessageClient(props) {

  const [message, setMessage] = useState("")

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const sendMessage = async () => {
    
    const Ref = doc(db, 'empleados', props.idAsesor)

    if (props.mensaje == null || props.mensaje == undefined) {

      await updateDoc(Ref, {
        mensajes: []
      })

      await updateDoc(Ref, {
        mensajes: arrayUnion(
          {
            id: 0,
            cliente: props.idCliente,
            nombreCliente: props.nombreCliente,
            folio: props.folio,
            pregunta: message,
            respuesta: ""
          }
        )
      })
      
    } else {
      let arrMsg = props.mensaje
      await updateDoc(Ref, {
        mensajes: arrayUnion(
          {
            id: arrMsg.length,
            cliente: props.idCliente,
            nombreCliente: props.nombreCliente,
            folio: props.folio,
            pregunta: message,
            respuesta: ""
          }
        )
      })
    }

    setShow(false);

  }

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Mandar mensaje al Asesor
      </Button>
      <Modal centered={true} show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          <Modal.Title>
              <Image className='img-fluid' alt='logoA' src={logoA} width={150} height={150} />
          </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className='text-start'>
            <form >
              <div className="mb-3">
                <label for="message" className="form-label">Mensaje:</label>
                <input type="text" onChange={(e) => setMessage(e.target.value)} className="form-control" id="message" name='message' />
              </div>
              <button type="button" onClick={sendMessage} className="btn btn-primary">Enviar Mensaje</button>
            </form>
          </div>
          </Modal.Body>
      </Modal>
    </div>
  )
}

export default ModalMessageClient
