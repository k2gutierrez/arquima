import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link';

export default function Signform(props) {

  const router = useRouter();

  return (
    <div className=''>
        <h1 className="my-3">Arquima</h1>
        <h3 className="my-3">{props.title}</h3>
        <form onSubmit={props.onSubmit} className="form">
            <div className="mb-3 mx-5">
            <label htmlFor="email" className="form-label">Email</label>
            <input required type="email" onChange={props.setEmail} name='email' className="form-control" id="email" placeholder="name@example.com" />
            </div>
            <div className="mb-3 mx-5">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" onChange={props.setPassword} name='password' className="form-control" id="password" placeholder="password" />
            </div>
            <button type="submit" className="btn btn-secondary mx-2">Sign in</button>
            <Link href="/"><button type="button" className="btn btn-lg px-5" >Volver al Inicio</button></Link>
        </form>
    </div>
  )
}
