'use client'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '@/context/AuthContext'
import setData from '@/firebase/firestore/setData';
import { db } from '@/firebase/config';
import { useRouter } from 'next/navigation';
import logo from '../../../../public/ArquimaLogo.png'
import logoA from '../../../../public/ArquimaA.png'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Image from 'next/image';

export default function Registering() {

    const { user, name, cel, rol } = useAuthContext();
    const router = useRouter();
    const [show, setShow] = useState(false)

    function register () {
        let data = {
            id: user.uid,
            nombre: name,
            email: user.email,
            celular: cel,
            rol: rol
        }
        const { result, error } = setData("empleados", user.uid, data)
    }

    useEffect(() => {
        register();
        handleShow();

    },[])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Modal centered={true} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>
                    <Image className='img-fluid' alt='logoA' src={logoA} width={150} height={150} />
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className='text-center'>
                    <p>Registro Correcto!</p>
                </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => {router.push("/registro")}}>
                    Aceptar
                </Button>
                </Modal.Footer>
            </Modal>
            <div className='container-sm text-center align-items-center mt-5 text-center'>
                <Image className='img-fluid' src={logo} alt='logo' width={681} height={443} />
                <p>Registrando cuenta en base de datos...</p>
            </div>
        </>
    )
}