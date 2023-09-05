'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { db, storage } from '@/firebase/config'
import { doc, getDocs, getDoc, updateDoc, where, collection, query, arrayUnion, Timestamp } from 'firebase/firestore'
import logo from '../../../../../public/ArquimaA.png'
import logo2 from "../../../../../public/ArquimaLogo.png"
import { useRouter } from 'next/navigation'
import styles from './page.module.css'
import cls from 'classnames'
import { useAuthContext } from '@/context/AuthContext'
import signoutfirebase from '@/firebase/auth/signoutfirebase'
import engrane from '../../../../../public/engranes.gif'
import ModalG from '@/components/ModalG'

function Page({ params }) {

  const [statusInterno, setStatusInterno] = useState('')
  const [obs, setObs] = useState('')
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('')

  const router = useRouter()

  const { currentName } = useAuthContext()

  const handleShow = () => setShow(true)
  const handleHide = () => setShow(false)

  if (router.isFallback) {
    return (
      <>
        <Image className="img-fluid" alt='engrane' src={engrane} width={350} height={210} />
        <p>Loading...</p>
      </>
    )
  }

  const changeStatus = async () => {
    
    try {
      const docRef = doc(db, "propiedades", params.id)
      await updateDoc(docRef, {
        status_interno: statusInterno
      });
      setMessage("Status interno modificado")
      handleShow()
    } catch (e) {
      setMessage(e)
      handleShow()
    }
  }

  const changeObs = async () => {
    
    try {
      const docRef = doc(db, "propiedades", params.id)
      await updateDoc(docRef, {
        observaciones: obs
      });
      setMessage("Observación agregada")
      handleShow()
    } catch (e) {
      setMessage(e)
      handleShow()
    }
  }

  async function signOut () {
    await signoutfirebase()
    router.push("/")
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
        <nav className="navbar bg-body-tertiary sticky-top">
          <div className="container-fluid">
              <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                  <Image alt="logo" src={logo} width={30} height={30} />
                  <span className="navbar-toggler-icon" ></span>
              </button>
              
              <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
                <li className='nav-item'>
                  <a>{currentName}</a>
                </li>
              </ul>
              <button type="button" className="btn btn-secondary ms-3" onClick={signOut} >Log Out</button>
              
              <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                  <div className="offcanvas-header">
                      <Image alt="logo" src={logo2} width={150} height={60} />
                      <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                  </div>
                  <div className="offcanvas-body">
                      <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li className="nav-item">
                            <Link href="/dashboard"><button type='button' className="btn" data-bs-dismiss="offcanvas" >Volver al dashboard</button></Link>
                        </li>
                      </ul>
                      
                  </div>
              </div>
          </div>
        </nav>

        <div className='container-md mt-3 text-center'>
          <div className='row align-items-center mb-5'>
            <div className='col-sm-4 col-6 order-md-1 order-1'>
              <Image className={cls(styles.logo, 'img-fluid')} alt='logo' src={logo} height={160} width={300} />
            </div>
            <div className='col-sm-4 col-12 order-md-2 order-3'>
              <h2>BIENVENIDO</h2>
            </div>
            <div className='col-sm-4 col-6 order-md-3 order-2'>
              <Link href="/dashboard"><button type="button"  className="btn m-2"><h5>Volver a Dashboard</h5></button></Link>
            </div>
          </div>

          <div className='align-items-center mb-5'>
            <h3>Cambiar Status Interno</h3>
            <div class="mb-3">
              <label for="status" class="form-label">Nuevo status:</label>
              <input type="text" onChange={(e) => setStatusInterno(e.target.value)} class="form-control" id="status" />
            </div>
            <button type="button" onClick={changeStatus} class="btn btn-primary">Cambiar Status Interno</button>
          </div>

          <div className='align-items-center mb-5'>
            <h3>Observaciones</h3>
            <div class="mb-3">
              <label for="obs" class="form-label">Cambiar observación:</label>
              <input type="text" onChange={(e) => setObs(e.target.value)} class="form-control" id="obs" />
            </div>
            <button type="button" onClick={changeObs} class="btn btn-primary">Cambiar Status Interno</button>
          </div>

        </div>
        
    </>
  )
}

export default Page