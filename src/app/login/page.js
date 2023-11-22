'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import signIn from '@/firebase/auth/signin'
import { useRouter } from 'next/navigation'
import Signform from '@/components/Signform'
import ModalG from '@/components/ModalG'
import RecoverPassword from '@/components/RecoverPassword'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

export default function Login() {

  const [menu, setMenu] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleShow = () => setShow(true)
  const handleHide = () => setShow(false)
  const handleMenu = () => setMenu(!menu)

  const handleSignin = async (event) => {
    event.preventDefault()
    let {result, error} = await signIn(email, password);
    if (error) {
      await setMessage("Usuario o contraseña incorrectos")
      setShow(true)
    } if (!error) {
      router.push("/user-validation")
    }
  }

  const handleRecover = async (event) => {
    event.preventDefault()
    const auth = getAuth()
    try {
      await sendPasswordResetEmail(auth, email)
      await setMessage('Se ha enviado un email a tu correo, sigue las instrucciones para hacer reset a tu contraseña')
      setShow(true)
    } catch (error) {
      await setMessage('Algo salió mal, revisa que el correo esté correcto!')
      setShow(true)
    }
  }

  return (
    <div>
      <ModalG
          show={show}
          onHide={handleHide}
          message={message}
          onClick={handleHide}
          button={"Aceptar"}
      />
      <main className="container-sm col-lg-4 col-12 text-center">
        { menu == true ? (
          <Signform
            title="Sign In"
            onClick={handleSignin}
            setEmail={(e) => setEmail(e.target.value)}
            setPassword={(e) => setPassword(e.target.value)}
          />
        ) : (
          <RecoverPassword 
            setEmail={(e) => setEmail(e.target.value)}
            onClick={handleRecover}
          />
        )
        }
        <div>
          { menu == true ? (
            <p>¿No recuerdas tu contraseña? <button type="button" onClick={handleMenu} className="btn btn-link btn-lg transparent">da click aquí</button></p>
          ) : (
            <p>Ir a Log In <button type="button" onClick={handleMenu} className="btn btn-link btn-lg transparent">da click aquí</button></p>
          )
          }
          
        </div>
      </main>
    </div>
  )
}
