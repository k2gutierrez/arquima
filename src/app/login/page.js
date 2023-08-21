'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import signIn from '@/firebase/auth/signin'
import { useRouter } from 'next/navigation'
import Signform from '@/components/Signform'

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSignin = async (event) => {
    event.preventDefault()

    const { result, error } = await signIn(email, password);
    if (error) {
      console.log(error)
    }
    console.log(result) 
    
    router.push("/user-validation")
  }

  return (
    <main className="container-sm col-4 text-center">
      <Signform
        title="Sign In"
        onSubmit={handleSignin}
        setEmail={(e) => setEmail(e.target.value)}
        setPassword={(e) => setPassword(e.target.value)}
      />
    </main>
  )
  
}
