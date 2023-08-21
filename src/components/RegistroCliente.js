import React from 'react'
import { vendedores } from '@/app/vendedores'

export default function Signform(props) {

  return (
    <>
      <h1 className="my-3">Arquima</h1>
      <h3 className="my-3">Registro de Cliente</h3>
      <form onSubmit={props.onSubmit} className="form">
          
          <div className="mb-3 mx-5">
            <label htmlFor="nombre" className="form-label">Nombre completo</label>
            <input type="text" onChange={props.nombre} name='nombre' className="form-control" id="nombre" placeholder="Nombre Completo" />
          </div>
          
          <div className="mb-3 mx-5">
            <label htmlFor="email" className="form-label">Email</label>
            <input required type="email" onChange={props.email} name='email' className="form-control" id="email" placeholder="name@example.com" />
          </div>

          <div className="mb-3 mx-5">
            <label htmlFor="cel" className="form-label">Celular</label>
            <input required type="text" onChange={props.cel} name='cel' className="form-control" id="cel" placeholder="Celular: 3312345678" />
          </div>

          <div className="mb-3 mx-5">
            <label htmlFor="pago" className="form-label">Pago inicial</label>
            <input type="text" onChange={props.pago} name='pago' className="form-control" id="pago" placeholder="5000" />
          </div>
          
          <div className="mb-3 mx-5">
            <label htmlFor="folio" className="form-label">Folio</label>
            <input type="text" onChange={props.folio} name='folio' className="form-control" id="folio" placeholder="folio" />
          </div>

          <div className='mb-3 mx-5'>
            <select className="form-select" onChange={props.formaCompra} aria-label="Default select example">
              <option value="">Forma de Compra</option>
              {vendedores.map((vend) => {
                return (
                  <option value={vend.id}>{vend.nombre}</option>
                )
              })}
            </select>
          </div>
          
          <button type="submit" className="btn btn-primary">Registrar</button>
      
      </form>
    </>
  )
}
