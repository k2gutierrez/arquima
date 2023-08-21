'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { db, storage } from '@/firebase/config'
import { doc, getDocs, updateDoc, where, collection, query, arrayUnion, Timestamp } from 'firebase/firestore'
import logo from '../../../../../public/ArquimaA.png'
import logo2 from "../../../../../public/ArquimaLogo.png"
import { useRouter } from 'next/navigation'
import styles from './page.module.css'
import cls from 'classnames'
import { Card } from 'react-bootstrap'
import Contado from '@/components/documentos/Contado'
import { useAuthContext } from '@/context/AuthContext'
import signoutfirebase from '@/firebase/auth/signoutfirebase'
import { statusOpciones } from '@/tiposStatus'
import { currencyMXN } from '@/formatCurrencyExample'

export default function Page({ params }) {

  const [menu, setMenu] = useState("")
  const [docu, setDocu] = useState(null)
  const [history, setHistory] = useState(null)
  const [update, setUpdate] = useState(false)
  const router = useRouter()
  const { currentName } = useAuthContext()

  useEffect(() => {
    getInfo();
  }, [])

  useEffect(() => {
    if (menu == "inicio") {
      getInfo();
    } else if (menu == "historial") {
      getInfo();
    }
  }, [menu, update])

  useEffect(() => {
    if (docu != null) {
      const hist = docu.historial
      setHistory(hist) 
    }
  }, [docu])

  async function signOut () {
    await signoutfirebase()
    router.push("/")
  }

  async function getInfo () {
    const q = query(collection(db, "clientes"), where("id", "==", params.id));
    const querySnapshot = await getDocs(q);
    await querySnapshot.forEach((doc) => {
      const docu = (doc.id, " => ", doc.data());
      setDocu(docu)
    });

  }

  const downloadFrom = (url, name) => {
    fetch(url).then(response => response.blob()).then(blob => {
      const blobURL = window.URL.createObjectURL(new Blob([blob]))
      const aTag = document.createElement('a')
      aTag.href=blobURL
      aTag.setAttribute('download', `${docu.nombre}_${name}.pdf `)
      document.body.appendChild(aTag)
      aTag.click()
      aTag.remove()
    })
    
  }

  async function bajaCliente () {
    try {

      const Ref = doc(db, 'propiedades', docu.propiedadID)
      await updateDoc(Ref, {
        status_inmueble: "LIBRE",
        status_credito: "LIBRE",
        asesor: "",
        nombre: "nombre",
        esquema: ""
      })

      const cRef = doc(db, "clientes", params.id)
      const clientRef = await updateDoc(cRef, {
        folio: "",
        propiedadID: "",
        status: "BAJA",
        pago: currencyMXN(""),
        historial: arrayUnion({
          registrado: currentName,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Baja de cliente"
        })
      });

      setUpdate(!update)

    } catch (e) {
      window.alert(e)
    }
  }

  async function updateStatus (e) {
    e.preventDefault()
    const val = e.target.value
    try {

      const Ref = doc(db, 'propiedades', docu.propiedadID)
      await updateDoc(Ref, {
        status_inmueble: val,
        status_credito: val
      })

      const cRef = doc(db, "clientes", params.id)
      const clientRef = await updateDoc(cRef, {
        status: val,
        historial: arrayUnion({
          registrado: currentName,
          fecha: Timestamp.fromDate(new Date()),
          comentario: `Se actualizo el status a ${val}`
        })
      });

      setUpdate(!update)

    } catch (e) {
      window.alert(e)
    }
  }

  return (
    <>
      {docu !== null ? (
        <>
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

          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button className="nav-link" onClick={() => setMenu("inicio")} >Infomación general</button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={() => setMenu("subirDocus")} >Subir documentos</button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={() => setMenu("historial")} >Historial</button>
            </li>
          </ul>

          { menu == "inicio" || menu == "" ?
            (
              <div className='row justify-content-center'>
                {docu.status != 'BAJA' ? (<div className='row justify-content-center'>
                  <div className='col-8 w-50 my-3 align-self-center'>
                    <select className="form-select" onChange={updateStatus} aria-label="Default select example">
                      <option selected>Cambiar status del cliente</option>
                      {statusOpciones.map((t) => {
                        return (
                          <option value={ t }>{ t }</option>
                        )
                      })
                      }
                      
                    </select>
                  </div>

                  <div className='col-4 my-3 align-self-center'>
                    <button type='button' onClick={bajaCliente} className='btn btn-outline-danger'>Dar de baja</button>
                  </div>
                </div>) : (<></>)}

                <div className='m-5 w-75'>
                <Card border="light" bg='transparent' > {/*18*/}
                  <Card.Header>{ docu.nombre }</Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <div className='text-start'>
                        <p>Folio: { docu.folio }</p>
                        <p>Proyecto: { docu.proyecto }</p>
                        <p>Asesor: { docu.asesor }</p>
                        <p>Trámite: { docu.esquema }</p>
                        <p>Status: { docu.status }</p>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
                </div>

                <div className='row mb-5'>
                  { docu.esquema == 'contado' ?
                    (
                      <div className='row justify-content-center'>
                        <ul className="list-group w-75">
                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Ine</div><div className='col-6 text-end'>
                            { docu.INE != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.INE.url, "INE")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>CURP</div><div className='col-6 text-end'>
                            { docu.CURP != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.CURP.url, "CURP")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>RFC</div><div className='col-6 text-end'>
                            { docu.RFC != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RFC.url, "RFC")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Comprobante de domicilio</div><div className='col-6 text-end'>
                            { docu.CompDom != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.CompDom.url, "COMPDOM")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento</div><div className='col-6 text-end'>
                            { docu.ActNac != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActNac.url, "ACTANAC")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                            
                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Carta General</div><div className='col-6 text-end'>
                            { docu.CartaG != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.CartaG.url, "CARTA")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>INE del vendedor</div><div className='col-6 text-end'>
                            { docu.INEV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.INEV.url, "INEV")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>CURP del vendedor</div><div className='col-6 text-end'>
                            { docu.CURPV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.CURPV.url, "CURPV")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>RFC del vendedor</div><div className='col-6 text-end'>
                            { docu.RFCV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RFCV.url, "RFCV")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Comprobante de domicilio del vendedor</div><div className='col-6 text-end'>
                            { docu.CompDomV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.CompDomV.url, "CompDomV")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento del vendedor</div><div className='col-6 text-end'>
                            { docu.ActNacV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActNacV.url, "ActNacV")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Escrituras del vendedor</div><div className='col-6 text-end'>
                            { docu.EscrituraV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.EscrituraV.url, "EscrituraV")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Predial del vendedor</div><div className='col-6 text-end'>
                            { docu.PredialV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.PredialV.url, "PredialV")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Comprobante de agua del vendedor</div><div className='col-6 text-end'>
                            { docu.AguaV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.AguaV.url, "AguaV")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Estado de cuenta del vendedor</div><div className='col-6 text-end'>
                            { docu.EstadoCtaV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.EstadoCtaV.url, "EstadoCtaV")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                        
                        </ul>
                      </div>
                    ) : (<></>)
                  }
                </div>
              </div>
            ) : (<></>)
          }

          { menu == "subirDocus" ?
            (
              <Contado
                id={docu.id}
                currentUser={currentName} 
              />
            ) : (<></>)
          }

          { menu == "historial" ?
            (
              <div className='m-5 p-2'>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Fecha</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    history.map((i, k) => {
                      const fe = i.fecha.toDate().toString()
                      return (
                        
                          <tr key={k}>
                            <td>{fe}</td>
                            <td>{i.registrado}</td>
                            <td>{i.comentario}</td>
                          </tr>
                        
                        )
                      })
                    }
                </tbody>
                </table>
              </div>
            ) : (<></>)
          }

        </div>
        </>

        ) : (
        <div className='text-center my-5 p-4'>
          <div className='my-3'>
            <Image className='img-fluid'alt='logo' src={logo} height={260} width={400} />
          </div>
          <div className='my-3'>
            <h4>Cargando</h4>
          </div>
          <div className='my-3'>
            <button type="button" onClick={() => router.push("/dashboard")} className="btn btn-secondary mt-2}">Volver</button>
          </div>
        </div>
        )
      }
    </>
  )
}