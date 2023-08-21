'use client'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { vendedores } from '../../tiposCompras'

export default function Ventas() {

  const { user, currentRol } = useAuthContext()
  const router = useRouter()
  const [menu, setMenu] = useState('main')
  const [cliente, setcliente] = useState(false)

  useEffect(() => {
    if (user == null) {
      router.push("/")
    } else if (currentRol != "vendedor") {
      router.push("/user-validation")
    }

  }, [user])

  async function mandarAjson2 () {
    data = {
      id: 20,
      nombre: "carlitoris"
    }
    vendedores.push(data)
  }

  return (
    <>
      <nav className="navbar bg-body-tertiary sticky-top">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">Arquima: Ventas</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" ></span>
            </button>
            
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Arquima: Ventas</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                    <a className="nav-link active" onClick={() => setMenu("main")} data-bs-dismiss="offcanvas" >Inicio</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link active" onClick={() => setMenu("registro")} data-bs-dismiss="offcanvas" >Registrar Cliente</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link active" onClick={() => setMenu("clientes")} data-bs-dismiss="offcanvas" >Clientes</a>
                </li>
                </ul>
            </div>
            </div>
        </div>
      </nav>
      <div>Ventas</div>
      <div><p>{user.uid}</p></div>
      <form onSubmit={mandarAjson2} className="form">
          
          
          
          <button type="submit" className="btn btn-primary">guardar formato</button>
      
      </form>

    </>
  )
}
