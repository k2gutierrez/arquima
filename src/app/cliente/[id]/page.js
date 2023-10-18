'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { db } from '@/firebase/config'
import { getDocs, where, collection, query, getDoc, doc, updateDoc } from 'firebase/firestore'
import logo from '../../../../public/ArquimaLogo.png'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'
import cls from 'classnames'
import { Card } from 'react-bootstrap'
import ModalTerminos from '@/components/ModalTerminos'
import ModalMessageClient from '@/components/ModalMessageClient'
import MessageCard from '@/components/MessageCard'
import Agradecimiento from '@/components/Agradecimiento'
import ActaDeEntrega from '@/components/ActaDeEntrega'
import Poliza from '@/components/Poliza'

export default function Page({ params }) {

  const [docuProp, setDocuProp] = useState(null)
  const [docu, setDocu] = useState(null)
  const [docuAsesor, setDocuAsesor] = useState(null)
  const [terms, setTerms] = useState(false)
  const [mensajes, setMensajes] = useState(null)

  const [show, setShow] = useState(false);
  const [menu, setMenu] = useState("info")

  const handleClose = () => setShow(false);

  const router = useRouter()

  useEffect(() => {
    getInfoClient();
    if (docu != null) {
      getInfo(docu.propiedadID);
      getInfoAsesor(docu.asesorID)
      if (docu.terminos == false) { 
        setShow(true);
      }
    }
    
    
  }, [docu])

  async function getInfo (d) {
    const q = doc(db, "propiedades", d)
    const querySnapshot = await getDoc(q);
    const docu = querySnapshot.data()
    setDocuProp(docu)
  }

  async function getInfoAsesor (d) {
    const q = doc(db, "empleados", d)
    const querySnapshot = await getDoc(q);
    const docuA = querySnapshot.data()
    setDocuAsesor(docuA)
    setMensajes(docuA.mensajes)
  }

  async function getInfoClient () {
    const q = query(collection(db, "clientes"), where("folio", "==", params.id));
    const querySnapshot = await getDocs(q);
    await querySnapshot.forEach((doc) => {
      const docu = (doc.id, " => ", doc.data());
      setDocu(docu)
    });
    //if (docu.terminos == false) { 
      //setShow(true);
    //}
  }

  const terminosAceptados = async () => {
    const termRef = doc(db, "clientes", docu.id)
    await updateDoc(termRef, {
      terminos: true
    })
    handleClose()
  }

  return (
    <>
    <ModalTerminos 
      terms={terms}
      show={show}
      onHide={handleClose}
      onClick={terminosAceptados}
      aceptar={() => setTerms(!terms)}
      centered
    />
    
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
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <button className="nav-link" onClick={() => setMenu("info")} >Infomación general</button>
            </li>
            <li class="nav-item">
              <button className="nav-link" onClick={() => setMenu("agradecimiento")} >Agradecimiento</button>
            </li>
            <li class="nav-item">
              <button className="nav-link" onClick={() => setMenu("entrega")} >Acta de entrega</button>
            </li>
            <li class="nav-item">
              <button className="nav-link" onClick={() => setMenu("poliza")} >Póliza</button>
            </li>
          </ul>
        </div>

        { menu == "info" ?
          (<div className='row justify-content-center'>
          <Card border="light" bg='transparent' style={{ width: '22rem' }}> {/*18*/}
            <Card.Header>{ docu.nombre }</Card.Header>
            <Card.Body>
              <Card.Text>
                <div className='text-start'>
                  <p>Folio: { docu.folio }</p>
                  <p>Asesor: { docu.asesor }</p>
                  <p>Trámite: { docu.esquema }</p>
                  <p>Status: { docu.status }</p>
                  <p>Proyecto: { docuProp == null ? ("") :  (docuProp.proyecto) }</p>
                  <p>Fecha de entrega: { docu == null || docu.fecha_entrega == undefined || docu.fecha_entrega == null ? ("TBD") :  (docu.fecha_entrega) }</p>
                  <p>Notaria: {docuProp == null || docuProp.n_notaria == undefined || docuProp.n_notaria == null ? ("TBD") :  (docuProp.n_notaria)}</p>
                  <p>Notario: {docuProp == null || docuProp.nombre_notario == undefined || docuProp.nombre_notario == null ? ("TBD") :  (docuProp.nombre_notario)}</p>
                  <p>Número de escritura: {docuProp == null || docuProp.n_escritura == undefined || docuProp.n_escritura == null ? ("TBD") :  (docuProp.n_escritura)}</p>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>) : (<></>)
        }

        { menu == "agradecimiento" ?
          (
            <Agradecimiento 
              className={cls(styles.containerMain, "")}
              imgClass={cls(styles.imgC, '')}
              textCotoCielo={cls(styles.textCotoCielo, "w-75 mb-3")}
              lte={docuProp.lte}
              mz={docuProp.mz}
              domicilio={docuProp.direccion + " " + docuProp.numero_ext}
              folio={docu.folio}
              precio={docuProp.precio}
              credito={docu.esquema}
            />
          ) : (<></>)
        }

        { menu == "entrega" ?
          (
            <ActaDeEntrega 
              lte={docuProp.lte}
              mz={docuProp.mz}
              domicilio={docuProp.direccion + " " + docuProp.numero_ext}
              folio={docu.folio}
              textCotoCielo={cls(styles.textCotoCielo, "w-75 mb-3")}
              className={cls(styles.containerMain2, "")}
              imgClass={cls(styles.imgC, '')}
              foliotext={styles.folio}
            />
          ) : (<></>)
        }

        { menu == "poliza" ?
          (
            <Poliza 
              lte={docuProp.lte}
              mz={docuProp.mz}
              domicilio={docuProp.direccion}
              folio={docu.folio}
              className={cls(styles.containerMain3, "")}
              imgClass={cls(styles.imgC, '')}
              textCotoCielo={cls(styles.textCotoCielo, "w-75 mb-3")}
            />
          ) : (<></>)
        }

        <div className='row my-5'>
          <div className='col-md-3 col-12'>

          </div>
          <div className='col-md-3 col-12'>

          </div>
          <div className='col-md-5 col-12 text-end'>
            {docuAsesor != null ? (<ModalMessageClient 
              idAsesor={docu.asesorID.toString()}
              mensaje={docuAsesor.mensajes}
              idCliente={docu.id.toString()}
              nombreCliente={docu.nombre + ' ' + docu.apellidoP}
              folio={docu.folio}
            />) : (<></>)}
            
          </div>
          <div className='col-md-1'>
            
          </div>
          
        </div>
        <div className='col-md-6 col-12 text-start' >
           { mensajes != null ? (
           mensajes.map(( v, k) => {
              if (docu.id == v.cliente) {
                return (
                  <MessageCard key={k}
                    answer={v.respuesta}
                    question={v.pregunta}
                  />
                )
              }
            })) : (<></>)
            }
          
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