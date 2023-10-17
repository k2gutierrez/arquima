'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import logo from '../../../public/ArquimaLogo.png'
import logoA from '../../../public/ArquimaA.png'
import { useRouter } from 'next/navigation'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'

export default function Cliente() {

  const [folio, setFolio] = useState("")
  const [show, setShow] = useState(false)
  const router = useRouter()

  const handleStatus = async (event) => {
    event.preventDefault()
    if (folio == '' || folio == null) {
      setFolio("")
      setShow(true)
    } else if (folio.length <= 3) {
      setFolio("")
      handleShow()
    } else {
      router.push(`/cliente/${folio}`)
    }
    
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal centered={true } show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Image className='img-fluid' alt='logoA' src={logoA} width={150} height={150} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='text-center'>
            <p>CURP/folio incorrecto!</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Intentar nuevamente
          </Button>
          <Button variant="outline-secondary" onClick={() => router.push("/")}>
            Salir
          </Button>
        </Modal.Footer>
      </Modal>
      
      <main className="container-sm col-lg-4 col-md-5 col-sm-6 col-10 text-center my-5 pt-2">
        <div className='my-5'>
          <Image className='img-fluid' alt='logo' src={logo} width={600} height={460} />
        </div>
        
        <div>
          <form onSubmit={handleStatus} className="form">
            <div className="mb-4 mx-5">
              <label htmlFor="folio" className="form-label"><h5>Ingresa folio o CURP</h5></label>
              <input type="text" value={folio.toUpperCase()} onChange={(e) => {setFolio(e.target.value)}} name='folio' className="form-control" id="folio" placeholder="folio / CURP" />
            </div>
            <button type="submit" className="btn btn-secondary mb-3">Revisar mi estatus</button>
          </form>
        </div>  
        <button type="button" onClick={() => router.push("/")} className="btn btn-outline-secondary">Salir</button>
      </main>
    </>
  )
  
}
