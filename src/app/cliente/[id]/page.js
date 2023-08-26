'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { db } from '@/firebase/config'
import { getDocs, where, collection, query } from 'firebase/firestore'
import logo from '../../../../public/ArquimaLogo.png'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'
import cls from 'classnames'
import { Card } from 'react-bootstrap'

export default function Page({ params }) {

  const [docu, setDocu] = useState(null)
  const router = useRouter()

  let arr = {
    nombre: "Carlitoris",
    folio: 32470,
    asesor: "Javier",
    esquema: "2do crédito infonavit",
    proyecto: "COTO CIELO",
    StatusCliente: "Ahí va",
    Direccion: "isla zante 3464",
    doc1: true,
    doc2: false
  }

  useEffect(() => {
    getInfo();
  }, [])

  async function getInfo () {
    const q = query(collection(db, "propiedades"), where("folio", "==", params.id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const docu = (doc.id, " => ", doc.data());
      console.log(docu)
      setDocu(docu)
    });
  }

  return (
    <>
    {docu !== null ? (

      <div className='container-md mt-3 text-center'>
        <div className='row align-items-center mb-5'>
          <div className='col-sm-4 col-6 order-md-1 order-1'>
            <Image className={cls(styles.logo, 'img-fluid')} alt='logo' src={logo} height={160} width={300} />
          </div>
          <div className='col-sm-4 col-12 order-md-2 order-3'>
            <h2>BIENVENIDO</h2>
          </div>
          <div className='col-sm-4 col-6 order-md-3 order-2'>
            <Link href="/"><button type="button"  className="btn m-2"><h5>Salir</h5></button></Link>
          </div>
        </div>

        <div className='row justify-content-center'>
          <Card border="light" bg='transparent' style={{ width: '22rem' }}> {/*18*/}
            <Card.Header>{ docu.nombre }</Card.Header>
            <Card.Body>
              <Card.Text>
                <div className='text-start'>
                  <p>Folio: { docu.folio }</p>
                  <p>Asesor: { docu.asesor }</p>
                  <p>Trámite: { docu.esquema }</p>
                  <p>Status: { docu.status }</p>
                  <p>Proyecto: { docu.proyecto }</p>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className='row my-5'>
          <div className='col-md-3 col-12'>

          </div>
          <div className='col-md-3 col-12'>

          </div>
          <div className='col-md-5 col-12 text-end'>
          <button type="button" onClick={() => window.alert("Aquí va para poder mandar un mensaje")} className="btn"><a>¿Tienes dudas? Manda mensaje a tu asesor</a></button>
          </div>
          <div className='col-md-1'>
            
          </div>
          
        </div>

      </div>

      ) : (
      <div className='text-center my-5 p-4'>
        <div className='my-3'>
          <Image className='img-fluid'alt='logo' src={logo} height={260} width={400} />
        </div>
        <div className='my-3'>
          <h4>No hay registro del folio</h4>
        </div>
        <div className='my-3'>
          <button type="button" onClick={() => router.push("/cliente")} className="btn btn-secondary m-2">Intentar de nuevo</button>
          <button type="button" onClick={() => router.push("/")} className="btn btn-outline-secondary m-2">Salir</button>
        </div>
      </div>
      )
    }
    </>
  )
}