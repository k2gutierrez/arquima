'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import signIn from '@/firebase/auth/signin'
import { useRouter } from 'next/navigation'
import Signform from '@/components/Signform'
import ModalG from '@/components/ModalG'

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleShow = () => setShow(true)
  const handleHide = () => setShow(false)

  const handleSignin = async (event) => {
    event.preventDefault()
    let {result, error} = signIn(email, password);
    if (error) {
      setMessage("Usuario o contraseña incorrectos")
      handleShow
    } if (!error) {
      router.push("/user-validation")
    }
    
  }
  console.log("emal: ", email)
  console.log("password: ", password)

  return (
    <>
      <ModalG
          show={show}
          onHide={handleHide}
          message={message}
          onClick={handleHide}
          button={"Aceptar"}
      />
      <main className="container-sm col-lg-4 col-12 text-center">
        <Signform
          title="Sign In"
          onClick={handleSignin}
          setEmail={(e) => setEmail(e.target.value)}
          setPassword={(e) => setPassword(e.target.value)}
        />
      </main>
    </>
  )
}
