import React from 'react'
import Link from 'next/link';

export default function RecoverPassword(props) {

  return (
    <div className=''>
        <h1 className="my-3">Arquima</h1>
        <h3 className="my-3">Recuperar Contraseña</h3>
        <form className="form">
            <div className="mb-3 mx-1">
              <label htmlFor="email" className="form-label">Ingresa tu Email</label>
              <input required type="email" onChange={props.setEmail} name='email' className="form-control" id="email" placeholder="name@example.com" />
            </div>
            
            <div className='row'>
              <div className='col-md-6 col-12'>
                <button type="button" onClick={props.onClick} className="btn btn-secondary">Recuperar Contraseña</button>
              </div>
              <div className='col-md-6 col-12'>
                <Link href="/"><button type="button" className="btn btn-lg" >Volver al Inicio</button></Link>
              </div>
            </div>
            
            
        </form>
    </div>
  )
}
