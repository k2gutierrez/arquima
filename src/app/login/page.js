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

    const { result, error } = await signIn(email, password);
    if (error) {
      await setMessage(error)
      handleShow()
    } else if (result) {
      router.push("/user-validation")
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
      <main className="container-sm col-lg-4 col-12 text-center">
        <Signform
          title="Sign In"
          onSubmit={handleSignin}
          setEmail={(e) => setEmail(e.target.value)}
          setPassword={(e) => setPassword(e.target.value)}
        />
      </main>
    </>
  )
}
