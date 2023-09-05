'use client'
import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import signUp from '@/firebase/auth/signup'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/context/AuthContext'
import Link from 'next/link'
import logo from '../../../public/ArquimaLogo.png'
import ModalG from '@/components/ModalG'
import Icon from 'react-icons-kit'
import { eyeOff } from 'react-icons-kit/feather/eyeOff'
import { eye } from 'react-icons-kit/feather/eye'


export default function Registro() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('')

  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);

  const router = useRouter()

  const { changeName, changeCel, changeRol, rol, cel, name } = useAuthContext();

  const handleShow = () => setShow(true)
  const handleHide = () => setShow(false)

  const handleToggle = () => {
    if (type==='password'){
       setIcon(eye);
       setType('text')
    } else {
       setIcon(eyeOff)
       setType('password')
    }
  }

  const handleSignup = async (event) => {
    event.preventDefault();
    if (token == 'arquima') {
      if (email == '') {
        setMessage('El email no se registró correctamente, initenta de nuevo!')
        handleShow()
      } else if (password == '') {
        setMessage('El password no se registró correctamente, initenta de nuevo!')
        handleShow()
      } else if (rol == '') {
        setMessage('El rol no se registró correctamente, initenta de nuevo!')
        handleShow()
      } else if (cel == '') {
        setMessage('El celular no se registró correctamente, initenta de nuevo!')
        handleShow()
      } else if (name == '') {
        setMessage('El nombre no se registró correctamente, initenta de nuevo!')
        handleShow()
      } else {
        const {result, error} = await signUp(email, password);
        if (!error) {
          router.push('/registro/registering')
        } else if (error) {
          await setMessage(error)
          handleShow()
        }
      }
    } else {
      await setMessage('Token incorrecto!')
      handleShow()
    }
    
  }

  return (
    <>
      <ModalG
        show={show}
        onHide={handleHide}
        message={message}
        onClick={handleHide}
        button={"Aceptar"}
      />
      <main className="container-sm">
        <div className='text-center align-items-center my-5 mx-5'>
          <Image className='img-fluid' alt='logo' src={logo} width={450} height={360} />
          <h3 className="my-3">Registro</h3>
          <div className='row justify-content-center'>
            <div className='col-lg-5 col-12 justify-content-center'>
              <form onSubmit={handleSignup} className="form">
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre</label>
                  <input required type="text" onChange={(e) => changeName(e.target.value)} name='nombre' className="form-control" id="nombre" placeholder="Nombre Completo" />
                </div>
                <div className="mb-3">
                  <label htmlFor="cel" className="form-label">Celular / Whatsapp</label>
                  <input required type="text" onChange={(e) => changeCel(e.target.value)} name='cel' className="form-control" id="cel" placeholder="3312345678" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input required type="email" onChange={(e) => setEmail(e.target.value)} name='email' className="form-control" id="email" placeholder="name@example.com" />
                </div>
                <p>Password</p>
                <div className="input-group mb-5">
                  
                  <input required type={type} aria-describedby="button-addon2" onChange={(e) => setPassword(e.target.value)} name='password' className="form-control" id="password" placeholder="password" />
                  <button class="btn btn-outline-transparent" type="button" id="button-addon2">
                    <span class="flex justify-around items-center" id='password' onClick={handleToggle}>
                      <Icon class="absolute mr-10" icon={icon} size={25}/>
                    </span>
                  </button>
                  
                </div>
                <div className='mb-3'>
                  <select className="form-select" onChange={(e) => changeRol(e.target.value)} aria-label="Default select example">
                    <option value="">Rol</option>
                    <option value="vendedor">vendedor</option>
                    <option value="administrativo">administrativo</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="token" className="form-label">Token</label>
                  <input required type="password" onChange={(e) => setToken(e.target.value)} name='token' className="form-control" id="token" placeholder="Token" />
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
