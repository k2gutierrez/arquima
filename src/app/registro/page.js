'use client'
import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import signUp from '@/firebase/auth/signup'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/context/AuthContext'
import Link from 'next/link'
import logo from '../../../public/ArquimaLogo.png'
import ModalG from '@/components/ModalG'

export default function Registro() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [show, setShow] = useState(false)
  const router = useRouter()

  const { changeName, changeCel, changeRol } = useAuthContext();

  const handleShow = () => setShow(true)
  const handleHide = () => setShow(false)

  const handleSignup = async (event) => {
    event.preventDefault();
    if (token == 'arquima') {
      const {result, error} = await signUp(email, password);
      if (!error) {
        router.push('/registro/registering')
      } else if (error) {
        console.log(error)
      }
    } else {
      handleShow()
    }
    
  }

  return (
    <>
      <ModalG
        show={show}
        onHide={handleHide}
        message={"Token incorrecto"}
        onClick={handleHide}
        button={"Aceptar"}
      />
      <main className="container-sm">
        <div className='text-center align-items-center my-5 mx-5'>
          <Image className='img-fluid' alt='logo' src={logo} width={450} height={360} />
          <h3 className="my-3">Registro</h3>
          <div className='row justify-content-center'>
            <div className='col-6 justify-content-center'>
              <form onSubmit={handleSignup} className="form">
                <div className="mb-3 mx-5">
                  <label htmlFor="nombre" className="form-label">Nombre</label>
                  <input type="text" onChange={(e) => changeName(e.target.value)} name='nombre' className="form-control" id="nombre" placeholder="Nombre Completo" />
                </div>
                <div className="mb-3 mx-5">
                  <label htmlFor="cel" className="form-label">Celular / Whatsapp</label>
                  <input type="text" onChange={(e) => changeCel(e.target.value)} name='cel' className="form-control" id="cel" placeholder="3312345678" />
                </div>
                <div className="mb-3 mx-5">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input required type="email" onChange={(e) => setEmail(e.target.value)} name='email' className="form-control" id="email" placeholder="name@example.com" />
                </div>
                <div className="mb-5 mx-5">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" onChange={(e) => setPassword(e.target.value)} name='password' className="form-control" id="password" placeholder="password" />
                </div>
                <div className='mb-3 mx-5'>
                  <select className="form-select" onChange={(e) => changeRol(e.target.value)} aria-label="Default select example">
                    <option value="">Rol</option>
                    <option value="vendedor">vendedor</option>
                    <option value="administrativo">administrativo</option>
                  </select>
                </div>
                <div className="mb-3 mx-5">
                  <label htmlFor="token" className="form-label">Token</label>
                  <input type="password" onChange={(e) => setToken(e.target.value)} name='token' className="form-control" id="token" placeholder="Token" />
                </div>
                <button type="submit" className="btn btn-secondary">Registrar</button>
                <Link href="/"><button type="button" className="btn btn-lg px-5" >Volver al Inicio</button></Link>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
    
  )
}
