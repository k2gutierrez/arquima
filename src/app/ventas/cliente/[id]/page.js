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
import { Card } from 'react-bootstrap'
import { useAuthContext } from '@/context/AuthContext'
import signoutfirebase from '@/firebase/auth/signoutfirebase'
import { statusOpciones } from '@/tiposStatus'
import { currencyMXN } from '@/formatCurrencyExample'
import BANCOSoltero from '@/components/documentos/BANCOSoltero'
import BANCOCasado from '@/components/documentos/BANCOCasado'
import ContadoSoltero from '@/components/documentos/ContadoSoltero'
import ContadoCasadoBS from '@/components/documentos/ContadoCasadoBS'
import ContadoCasadoBM from '@/components/documentos/ContadoCasadoBM'
import FOVISSSTECasadoBM from '@/components/documentos/FOVISSSTECasadoBM'
import FOVISSSTECasadoBS from '@/components/documentos/FOVISSSTECasadoBS'
import FOVISSSTESoltero from '@/components/documentos/FOVISSSTESoltero'
import INFONAVITCasadoBM from '@/components/documentos/INFONAVITCasadoBM'
import INFONAVITCasadoBS from '@/components/documentos/INFONAVITCasadoBS'
import INFONAVITSoltero from '@/components/documentos/INFONAVITSoltero'
import IPEJALCasadoBM from '@/components/documentos/IPEJALCasadoBM'
import IPEJALCasadoBS from '@/components/documentos/IPEJALCasadoBS'
import IPEJALSoltero from '@/components/documentos/IPEJALSoltero'
import engrane from '../../../../../public/engranes.gif'
import INFONAVITUnamosCreditos2 from '@/components/documentos/INFONAVITUnamosCreditos2'
import INFONAVITUnamosCreditos3 from '@/components/documentos/INFONAVITUnamosCreditos3'
import INFONAVITUnamosCreditos4 from '@/components/documentos/INFONAVITUnamosCreditos4'
import DocGeneral from '@/components/DocGeneral'

export default function Page({ params }) {

  const [propiedad, setPropiedad] = useState(null)
  const [menu, setMenu] = useState("")
  const [docu, setDocu] = useState(null)
  const [history, setHistory] = useState(null)
  const [update, setUpdate] = useState(false)
  
  const [show, setShow] = useState(false);
  const [mensajeBaja, setMensajeBaja] = useState(null)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const router = useRouter()
  const { currentName } = useAuthContext()

  const [bancoSoltero, setBancoSoltero] = useState(false)
  const [bancoCasado, setBancoCasado] = useState(false)
  const [contadoSoltero, setContadoSoltero] = useState(false)
  const [contadoCasadoBS, setContadoCasadoBS] = useState(false)
  const [contadoCasadoBM, setContadoCasadoBM] = useState(false)
  const [fovisssteSoltero, setFovisssteSoltero] = useState(false)
  const [fovisssteCasadoBS, setFovisssteCasadoBS] = useState(false)
  const [fovisssteCasadoBM, setFovisssteCasadoBM] = useState(false)
  const [ipejalSoltero, setIpejalSoltero] = useState(false)
  const [ipejalCasadoBM, setIpejalCasadoBM] = useState(false)
  const [ipejalCasadoBS, setIpejalCasadoBS] = useState(false)
  const [infonavitSoltero, setInfonavitSoltero] = useState(false)
  const [infonavitCasadoBS, setInfonavitCasadoBS] = useState(false)
  const [infonavitCasadoBM,setInfonavitCasadoBM ] = useState(false)

  useEffect(() => {
    getInfo();
    if (docu != null) {
      getPropiedad()
      const fov = Boolean(docu.esquema == "FOVISSSTE-infonavit-fovissste" || docu.esquema == "FOVISSSTE-tradicional" || docu.esquema == "FOVISSSTE-conyugal" || docu.esquema == "FOVISSSTE-para-todos")

      const banco = Boolean(docu.esquema == 'BANCARIO / caja popular -terreno' || docu.esquema == 'BANCARIO / caja popular -casa')

      const ipejal = Boolean(docu.esquema == "IPEJAL-tradicional" || docu.esquema == "IPEJAL-terreno" || docu.esquema == "IPEJAL-conyugal")

      const infonavit = Boolean(docu.esquema == "INFOVANIT-tradicional" || docu.esquema == "INFOVANIT-conyugal" || docu.esquema == "INFOVANIT-infonavit-fovissste" || docu.esquema == "INFOVANIT-crediterreno" || docu.esquema == "INFOVANIT-segundo-credito" || docu.esquema == "INFOVANIT-cofinativ")

      const bancoSoltero = Boolean(docu.civil == 'SOLTERO' && banco == true)
      setBancoSoltero(bancoSoltero)
      const bancoCasado = Boolean(docu.civil == 'CASADO' && banco == true)
      setBancoCasado(bancoCasado)
      const contadoSoltero = Boolean(docu.civil == 'SOLTERO' && docu.esquema == 'CONTADO')
      setContadoSoltero(contadoSoltero)
      const contadoCasadoBS = Boolean(docu.civil == 'CASADO' && docu.esquema == 'CONTADO' && docu.regimen_patrimonial == "BIENES SEPARADOS")
      setContadoCasadoBS(contadoCasadoBS)
      const contadoCasadoBM = Boolean(docu.civil == 'CASADO' && docu.esquema == 'CONTADO' && docu.regimen_patrimonial == "SOCIEDAD LEGAL / MANCOMUNADO")
      setContadoCasadoBM(contadoCasadoBM)
      const fovisssteSoltero = Boolean(docu.civil == 'SOLTERO' && fov == true)
      setFovisssteSoltero(fovisssteSoltero)
      const fovisssteCasadoBS = Boolean(docu.civil == 'CASADO' && fov == true && docu.regimen_patrimonial == "BIENES SEPARADOS")
      setFovisssteCasadoBS(fovisssteCasadoBS)
      const fovisssteCasadoBM = Boolean(docu.civil == 'CASADO' && fov == true && docu.regimen_patrimonial == "SOCIEDAD LEGAL / MANCOMUNADO")
      setFovisssteCasadoBM(fovisssteCasadoBM)
      const ipejalSoltero = Boolean(docu.civil == 'SOLTERO' && ipejal == true)
      setIpejalSoltero(ipejalSoltero)
      const ipejalCasadoBS = Boolean(docu.civil == 'CASADO' && ipejal == true && docu.regimen_patrimonial == "BIENES SEPARADOS")
      setIpejalCasadoBS(ipejalCasadoBS)
      const ipejalCasadoBM = Boolean(docu.civil == 'CASADO' && ipejal == true && docu.regimen_patrimonial == "SOCIEDAD LEGAL / MANCOMUNADO")
      setIpejalCasadoBM(ipejalCasadoBM)
      const infonavitSoltero = Boolean(docu.civil == 'SOLTERO' && infonavit == true)
      setInfonavitSoltero(infonavitSoltero)
      const infonavitCasadoBS = Boolean(docu.civil == 'CASADO' && infonavit == true && docu.regimen_patrimonial == "BIENES SEPARADOS")
      setInfonavitCasadoBS(infonavitCasadoBS)
      const infonavitCasadoBM = Boolean(docu.civil == 'CASADO' && infonavit == true && docu.regimen_patrimonial == "SOCIEDAD LEGAL / MANCOMUNADO")
      setInfonavitCasadoBM(infonavitCasadoBM)
    }
  }, [docu])

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

  async function getPropiedad () {
    const q = doc(db, "propiedades", docu.propiedadID)
    const querySnapshot = await getDoc(q);
    if (querySnapshot.exists()) {
      setPropiedad(querySnapshot.data())
    } else {
      // docSnap.data() will be undefined in this case
    }

  }

  const downloadFrom = (url, name) => {
    fetch(url).then(response => response.blob()).then(blob => {
      const blobURL = window.URL.createObjectURL(new Blob([blob]))
      const aTag = document.createElement('a')
      aTag.href=blobURL
      aTag.setAttribute('download', `${docu.nombre}_${name}.pdf`)
      document.body.appendChild(aTag)
      aTag.click()
      aTag.remove()
    })
    
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
              { docu.status == 'BAJA' ? (
                <button className="nav-link" onClick={() => setMenu("subirDocus")} disabled >Subir documentos</button>
              ) : (
                <button className="nav-link" onClick={() => setMenu("subirDocus")} >Subir documentos</button>
              )
              }
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={() => setMenu("historial")} >Historial</button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={() => setMenu("formato")} >Formato</button>
            </li>
          </ul>
          
          {menu == "formato" ?
            (
              <DocGeneral 
                className={cls(styles.formatoBg, "container-fluid")}
                nombre={'Carlos Enrique Gutiérrez Chimal'}
                nss={'12345678901'}
                rfc={'gucc871030ca7'}
                identificacion={'INE'}
                nIdentificacion={'123456789012'}
                domicilio={'Isla Zante 3464, col. jardines del sur C.P 44950'}
                cel={3318930280}
                email={'cchimal.gutierrez@gmail.com'}
                tel={3318930280}
                nombre2={'Carlos Enrique Gutiérrez Chimal'}
                nss2={'12345678901'}
                RFC2={'gucc871030ca7'}
                identificacion2={'INE'}
                nIdentificacion2={'123456789012'}
                domicilio2={'Isla Zante 3464, col. jardines del sur C.P 44950'}
                cel2={3318930280}
                email2={'cchimal.gutierrez@gmail.com'}
                tel2={3318930280}
                direccion={'calle los otates'}
                numero_ext={'2892'}
                lte={'21'}
                mz={'F'}
                proyecto={'COTO CIELO'}
                precio={'$500,000.00'}
              />
            )
            :
            (<></>)
          }

          { menu == "inicio" || menu == "" ?
            (
              <div className='row justify-content-center'>

                <div className='m-5 w-75'>
                <Card border="light" bg='transparent' > {/*18*/}
                  <Card.Header>{ docu.nombre }</Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <div className='text-start'>
                        <p>Folio: { docu.folio }</p>
                        <p>Proyecto: { propiedad != null ? (propiedad.proyecto) : ('') }</p>
                        <p>Asesor: { docu.asesor }</p>
                        <p>Trámite: { docu.esquema }</p>
                        <p>Status: { docu.status }</p>
                        <p>Fecha de entrega: { docu == null || docu.fecha_entrega == undefined || docu.fecha_entrega == null ? ("TBD") :  (docu.fecha_entrega) }</p>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
                </div>

                <div className='row mb-5'>
                  { contadoSoltero == true && docu.status != 'BAJA' ? 
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

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Comprobante de no adeudo de agua del vendedor</div><div className='col-6 text-end'>
                            { docu.NoAdeudoPredialV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.NoAdeudoPredialV.url, "No adeudo agua")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Estado de cuenta del vendedor</div><div className='col-6 text-end'>
                            { docu.EstadoCtaV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.EstadoCtaV.url, "EstadoCtaV")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de matrimonio del vendedor</div><div className='col-6 text-end'>
                            { docu.ActaMatrimonioVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActaMatrimonioVendedor.url, "acta matrimonio vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>INE del conyuge del vendedor</div><div className='col-6 text-end'>
                            { docu.IneConyugeVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.IneConyugeVendedor.url, "INE del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>RFC del conyuge del vendedor</div><div className='col-6 text-end'>
                            { docu.RfcConyugeVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RfcConyugeVendedor.url, "RFC del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento del conyuge del vendedor</div><div className='col-6 text-end'>
                            { docu.ActNacConyugeVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActNacConyugeVendedor.url, "acta de nacimiento del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>CURP del conyuge del vendedor</div><div className='col-6 text-end'>
                            { docu.CURPConyugeVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.CURPConyugeVendedor.url, "CURP del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                        
                        </ul>
                      </div>
                    ) : (<></>)
                  }
                  { contadoCasadoBS == true && docu.status != 'BAJA' ? 
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

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de matrimonio del cliente</div><div className='col-6 text-end'>
                            { docu.ActaMatrimonioCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActaMatrimonioCliente.url, "Acta de matrimonio")}} className='btn btn-primary' >Descargar</button>) : 
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

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Comprobante de no adeudo de agua del vendedor</div><div className='col-6 text-end'>
                            { docu.NoAdeudoPredialV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.NoAdeudoPredialV.url, "No adeudo agua")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Estado de cuenta del vendedor</div><div className='col-6 text-end'>
                            { docu.EstadoCtaV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.EstadoCtaV.url, "EstadoCtaV")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de matrimonio del vendedor</div><div className='col-6 text-end'>
                            { docu.ActaMatrimonioVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActaMatrimonioVendedor.url, "acta matrimonio vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>INE del conyuge del vendedor</div><div className='col-6 text-end'>
                            { docu.IneConyugeVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.IneConyugeVendedor.url, "INE del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>RFC del conyuge del vendedor</div><div className='col-6 text-end'>
                            { docu.RfcConyugeVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RfcConyugeVendedor.url, "RFC del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento del conyuge del vendedor</div><div className='col-6 text-end'>
                            { docu.ActNacConyugeVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActNacConyugeVendedor.url, "acta de nacimiento del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>CURP del conyuge del vendedor</div><div className='col-6 text-end'>
                            { docu.CURPConyugeVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.CURPConyugeVendedor.url, "CURP del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                        
                        </ul>
                      </div>
                    ) : (<></>)
                  }
                  { contadoCasadoBM == true && docu.status != 'BAJA' ? 
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

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de matrimonio del cliente</div><div className='col-6 text-end'>
                            { docu.ActaMatrimonioCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActaMatrimonioCliente.url, "Acta de matrimonio")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>INE del conyuge del cliente</div><div className='col-6 text-end'>
                            { docu.IneConyugeCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.IneConyugeCliente.url, "INE conyugue cliente")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>RFC del conyuge del cliente</div><div className='col-6 text-end'>
                            { docu.RfcConyugeCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RfcConyugeCliente.url, "RFC conyugue cliente")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento del conyuge del cliente</div><div className='col-6 text-end'>
                            { docu.ActNacConyugeCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActNacConyugeCliente.url, "Acta de nacimiento del conyugue cliente")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>CURP del conyuge del cliente</div><div className='col-6 text-end'>
                            { docu.CurpConyugeCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.CurpConyugeCliente.url, "CURP del conyugue cliente")}} className='btn btn-primary' >Descargar</button>) : 
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

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Comprobante de no adeudo de agua del vendedor</div><div className='col-6 text-end'>
                            { docu.NoAdeudoPredialV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.NoAdeudoPredialV.url, "No adeudo agua")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Estado de cuenta del vendedor</div><div className='col-6 text-end'>
                            { docu.EstadoCtaV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.EstadoCtaV.url, "EstadoCtaV")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de matrimonio del vendedor</div><div className='col-6 text-end'>
                            { docu.ActaMatrimonioVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActaMatrimonioVendedor.url, "acta matrimonio vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>INE del conyuge del vendedor</div><div className='col-6 text-end'>
                            { docu.IneConyugeVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.IneConyugeVendedor.url, "INE del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>RFC del conyuge del vendedor</div><div className='col-6 text-end'>
                            { docu.RfcConyugeVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RfcConyugeVendedor.url, "RFC del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento del conyuge del vendedor</div><div className='col-6 text-end'>
                            { docu.ActNacConyugeVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActNacConyugeVendedor.url, "acta de nacimiento del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>CURP del conyuge del vendedor</div><div className='col-6 text-end'>
                            { docu.CURPConyugeVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.CURPConyugeVendedor.url, "CURP del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                        
                        </ul>
                      </div>
                    ) : (<></>)
                  }
                  { fovisssteCasadoBM == true && docu.status != 'BAJA' ? 
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
                            
                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Formato General</div><div className='col-6 text-end'>
                            { docu.FormatoG != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.FormatoG.url, "formato general")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Talon de pago 1</div><div className='col-6 text-end'>
                            { docu.TalonesPagoCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.TalonesPagoCliente.url, "talon de pago")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Talon de pago 2</div><div className='col-6 text-end'>
                            { docu.TalonesPagoCliente2 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.TalonesPagoCliente2.url, "talon de pago2")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Talon de pago 3</div><div className='col-6 text-end'>
                            { docu.TalonesPagoCliente3 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.TalonesPagoCliente3.url, "talon de pago3")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Expediente electrónico</div><div className='col-6 text-end'>
                            { docu.ExpedienteElectronicoCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ExpedienteElectronicoCliente.url, "expediente electronico")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de matrimonio del cliente</div><div className='col-6 text-end'>
                            { docu.ActaMatrimonioCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActaMatrimonioCliente.url, "Acta de matrimonio")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>INE del conyuge del cliente</div><div className='col-6 text-end'>
                            { docu.IneConyugeCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.IneConyugeCliente.url, "INE conyugue cliente")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>RFC del conyuge del cliente</div><div className='col-6 text-end'>
                            { docu.RfcConyugeCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RfcConyugeCliente.url, "RFC conyugue cliente")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento del conyuge del cliente</div><div className='col-6 text-end'>
                            { docu.ActNacConyugeCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActNacConyugeCliente.url, "Acta de nacimiento del conyugue cliente")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>CURP del conyuge del cliente</div><div className='col-6 text-end'>
                            { docu.CurpConyugeCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.CurpConyugeCliente.url, "CURP del conyugue cliente")}} className='btn btn-primary' >Descargar</button>) : 
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

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta Constitutiva del vendedor</div><div className='col-6 text-end'>
                            { docu.ActaConstitutivaV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActaConstitutivaV.url, "acta constitutiva")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Memoria descriptiva</div><div className='col-6 text-end'>
                            { docu.MemoriaDescriptivaV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.MemoriaDescriptivaV.url, "memoria descriptiva")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Plano arquitectónico</div><div className='col-6 text-end'>
                            { docu.PlanoArqV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.PlanoArqV.url, "plano arquitectonico")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Estudio de habitabilidad</div><div className='col-6 text-end'>
                            { docu.HabitabilidadV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.HabitabilidadV.url, "habitabilidad")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Recibo de luz 1</div><div className='col-6 text-end'>
                            { docu.RecibosLuzV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RecibosLuzV.url, "recibo de luz")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Recibo de luz 2</div><div className='col-6 text-end'>
                            { docu.RecibosLuzV2 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RecibosLuzV2.url, "recibo de luz2")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Recibo de luz 3</div><div className='col-6 text-end'>
                            { docu.RecibosLuzV3 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RecibosLuzV3.url, "recibo de luz3")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de matrimonio del vendedor</div><div className='col-6 text-end'>
                            { docu.ActaMatrimonioVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActaMatrimonioVendedor.url, "acta matrimonio vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>INE del conyuge del vendedor</div><div className='col-6 text-end'>
                            { docu.IneConyugeVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.IneConyugeVendedor.url, "INE del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>RFC del conyuge del vendedor</div><div className='col-6 text-end'>
                            { docu.RfcConyugeVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RfcConyugeVendedor.url, "RFC del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento del conyuge del vendedor</div><div className='col-6 text-end'>
                            { docu.ActNacConyugeVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActNacConyugeVendedor.url, "acta de nacimiento del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>CURP del conyuge del vendedor</div><div className='col-6 text-end'>
                            { docu.CURPConyugeVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.CURPConyugeVendedor.url, "CURP del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                        
                        </ul>
                      </div>
                    ) : (<></>)
                  }
                  { fovisssteCasadoBS == true && docu.status != 'BAJA' ? 
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
                            
                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Formato General</div><div className='col-6 text-end'>
                            { docu.FormatoG != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.FormatoG.url, "formato general")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Talon de pago 1</div><div className='col-6 text-end'>
                            { docu.TalonesPagoCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.TalonesPagoCliente.url, "talon de pago")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Talon de pago 2</div><div className='col-6 text-end'>
                            { docu.TalonesPagoCliente2 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.TalonesPagoCliente2.url, "talon de pago2")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Talon de pago 3</div><div className='col-6 text-end'>
                            { docu.TalonesPagoCliente3 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.TalonesPagoCliente3.url, "talon de pago3")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Expediente electrónico</div><div className='col-6 text-end'>
                            { docu.ExpedienteElectronicoCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ExpedienteElectronicoCliente.url, "expediente electronico")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de matrimonio del cliente</div><div className='col-6 text-end'>
                            { docu.ActaMatrimonioCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActaMatrimonioCliente.url, "Acta de matrimonio")}} className='btn btn-primary' >Descargar</button>) : 
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

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta Constitutiva del vendedor</div><div className='col-6 text-end'>
                            { docu.ActaConstitutivaV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActaConstitutivaV.url, "acta constitutiva")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Memoria descriptiva</div><div className='col-6 text-end'>
                            { docu.MemoriaDescriptivaV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.MemoriaDescriptivaV.url, "memoria descriptiva")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Plano arquitectónico</div><div className='col-6 text-end'>
                            { docu.PlanoArqV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.PlanoArqV.url, "plano arquitectonico")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Estudio de habitabilidad</div><div className='col-6 text-end'>
                            { docu.HabitabilidadV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.HabitabilidadV.url, "habitabilidad")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Recibo de luz 1</div><div className='col-6 text-end'>
                            { docu.RecibosLuzV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RecibosLuzV.url, "recibo de luz")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Recibo de luz 2</div><div className='col-6 text-end'>
                            { docu.RecibosLuzV2 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RecibosLuzV2.url, "recibo de luz2")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Recibo de luz 3</div><div className='col-6 text-end'>
                            { docu.RecibosLuzV3 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RecibosLuzV3.url, "recibo de luz3")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de matrimonio del vendedor</div><div className='col-6 text-end'>
                            { docu.ActaMatrimonioVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActaMatrimonioVendedor.url, "acta matrimonio vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>INE del conyuge del vendedor</div><div className='col-6 text-end'>
                            { docu.IneConyugeVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.IneConyugeVendedor.url, "INE del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>RFC del conyuge del vendedor</div><div className='col-6 text-end'>
                            { docu.RfcConyugeVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RfcConyugeVendedor.url, "RFC del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento del conyuge del vendedor</div><div className='col-6 text-end'>
                            { docu.ActNacConyugeVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActNacConyugeVendedor.url, "acta de nacimiento del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>CURP del conyuge del vendedor</div><div className='col-6 text-end'>
                            { docu.CURPConyugeVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.CURPConyugeVendedor.url, "CURP del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                        
                        </ul>
                      </div>
                    ) : (<></>)
                  }
                  { fovisssteSoltero == true && docu.status != 'BAJA' ? 
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
                            
                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Formato General</div><div className='col-6 text-end'>
                            { docu.FormatoG != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.FormatoG.url, "formato general")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Talon de pago 1</div><div className='col-6 text-end'>
                            { docu.TalonesPagoCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.TalonesPagoCliente.url, "talon de pago")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Talon de pago 2</div><div className='col-6 text-end'>
                            { docu.TalonesPagoCliente2 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.TalonesPagoCliente2.url, "talon de pago2")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Talon de pago 3</div><div className='col-6 text-end'>
                            { docu.TalonesPagoCliente3 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.TalonesPagoCliente3.url, "talon de pago3")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Expediente electrónico</div><div className='col-6 text-end'>
                            { docu.ExpedienteElectronicoCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ExpedienteElectronicoCliente.url, "expediente electronico")}} className='btn btn-primary' >Descargar</button>) : 
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

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta Constitutiva del vendedor</div><div className='col-6 text-end'>
                            { docu.ActaConstitutivaV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActaConstitutivaV.url, "acta constitutiva")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Memoria descriptiva</div><div className='col-6 text-end'>
                            { docu.MemoriaDescriptivaV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.MemoriaDescriptivaV.url, "memoria descriptiva")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Plano arquitectónico</div><div className='col-6 text-end'>
                            { docu.PlanoArqV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.PlanoArqV.url, "plano arquitectonico")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Estudio de habitabilidad</div><div className='col-6 text-end'>
                            { docu.HabitabilidadV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.HabitabilidadV.url, "habitabilidad")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Recibo de luz 1</div><div className='col-6 text-end'>
                            { docu.RecibosLuzV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RecibosLuzV.url, "recibo de luz")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Recibo de luz 2</div><div className='col-6 text-end'>
                            { docu.RecibosLuzV2 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RecibosLuzV2.url, "recibo de luz2")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Recibo de luz 3</div><div className='col-6 text-end'>
                            { docu.RecibosLuzV3 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RecibosLuzV3.url, "recibo de luz3")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de matrimonio del vendedor</div><div className='col-6 text-end'>
                            { docu.ActaMatrimonioVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActaMatrimonioVendedor.url, "acta matrimonio vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>INE del conyuge del vendedor</div><div className='col-6 text-end'>
                            { docu.IneConyugeVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.IneConyugeVendedor.url, "INE del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>RFC del conyuge del vendedor</div><div className='col-6 text-end'>
                            { docu.RfcConyugeVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RfcConyugeVendedor.url, "RFC del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento del conyuge del vendedor</div><div className='col-6 text-end'>
                            { docu.ActNacConyugeVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActNacConyugeVendedor.url, "acta de nacimiento del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>CURP del conyuge del vendedor</div><div className='col-6 text-end'>
                            { docu.CURPConyugeVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.CURPConyugeVendedor.url, "CURP del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                        
                        </ul>
                      </div>
                    ) : (<></>)
                  }
                  { infonavitCasadoBM == true && docu.status != 'BAJA' ? 
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
                            
                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Formato General</div><div className='col-6 text-end'>
                            { docu.FormatoG != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.FormatoG.url, "formato general")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Taller saber para decidir</div><div className='col-6 text-end'>
                            { docu.TallerSaberCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.TallerSaberCliente.url, "taller saber para decidir")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Precalificación</div><div className='col-6 text-end'>
                            { docu.PrecalificacionCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.PrecalificacionCliente.url, "precalificacion infonavit")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Solicitud de crédito</div><div className='col-6 text-end'>
                            { docu.SolicitudCreditoCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.SolicitudCreditoCliente.url, "solicitud de credito")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>SIC</div><div className='col-6 text-end'>
                            { docu.SIC != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.SIC.url, "SIC")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de matrimonio del cliente</div><div className='col-6 text-end'>
                            { docu.ActaMatrimonioCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActaMatrimonioCliente.url, "Acta de matrimonio")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>INE del conyuge del cliente</div><div className='col-6 text-end'>
                            { docu.IneConyugeCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.IneConyugeCliente.url, "INE conyugue cliente")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>RFC del conyuge del cliente</div><div className='col-6 text-end'>
                            { docu.RfcConyugeCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RfcConyugeCliente.url, "RFC conyugue cliente")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento del conyuge del cliente</div><div className='col-6 text-end'>
                            { docu.ActNacConyugeCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActNacConyugeCliente.url, "Acta de nacimiento del conyugue cliente")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>CURP del conyuge del cliente</div><div className='col-6 text-end'>
                            { docu.CurpConyugeCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.CurpConyugeCliente.url, "CURP del conyugue cliente")}} className='btn btn-primary' >Descargar</button>) : 
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

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta Constitutiva del vendedor</div><div className='col-6 text-end'>
                            { docu.ActaConstitutivaV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActaConstitutivaV.url, "acta constitutiva")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Memoria descriptiva</div><div className='col-6 text-end'>
                            { docu.MemoriaDescriptivaV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.MemoriaDescriptivaV.url, "memoria descriptiva")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Plano arquitectónico</div><div className='col-6 text-end'>
                            { docu.PlanoArqV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.PlanoArqV.url, "plano arquitectonico")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Estudio de habitabilidad</div><div className='col-6 text-end'>
                            { docu.HabitabilidadV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.HabitabilidadV.url, "habitabilidad")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Recibo de luz 1</div><div className='col-6 text-end'>
                            { docu.RecibosLuzV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RecibosLuzV.url, "recibo de luz")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Recibo de luz 2</div><div className='col-6 text-end'>
                            { docu.RecibosLuzV2 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RecibosLuzV2.url, "recibo de luz2")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Recibo de luz 3</div><div className='col-6 text-end'>
                            { docu.RecibosLuzV3 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RecibosLuzV3.url, "recibo de luz3")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de matrimonio del vendedor</div><div className='col-6 text-end'>
                            { docu.ActaMatrimonioVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActaMatrimonioVendedor.url, "acta matrimonio vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>INE del conyuge del vendedor</div><div className='col-6 text-end'>
                            { docu.IneConyugeVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.IneConyugeVendedor.url, "INE del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>RFC del conyuge del vendedor</div><div className='col-6 text-end'>
                            { docu.RfcConyugeVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RfcConyugeVendedor.url, "RFC del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento del conyuge del vendedor</div><div className='col-6 text-end'>
                            { docu.ActNacConyugeVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActNacConyugeVendedor.url, "acta de nacimiento del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>CURP del conyuge del vendedor</div><div className='col-6 text-end'>
                            { docu.CURPConyugeVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.CURPConyugeVendedor.url, "CURP del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                        
                        </ul>
                      </div>
                    ) : (<></>)
                  }
                  { infonavitCasadoBS == true && docu.status != 'BAJA' ? 
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
                            
                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Formato General</div><div className='col-6 text-end'>
                            { docu.FormatoG != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.FormatoG.url, "formato general")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Taller saber para decidir</div><div className='col-6 text-end'>
                            { docu.TallerSaberCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.TallerSaberCliente.url, "taller saber para decidir")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Precalificación</div><div className='col-6 text-end'>
                            { docu.PrecalificacionCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.PrecalificacionCliente.url, "precalificacion infonavit")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Solicitud de crédito</div><div className='col-6 text-end'>
                            { docu.SolicitudCreditoCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.SolicitudCreditoCliente.url, "solicitud de credito")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>SIC</div><div className='col-6 text-end'>
                            { docu.SIC != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.SIC.url, "SIC")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de matrimonio del cliente</div><div className='col-6 text-end'>
                            { docu.ActaMatrimonioCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActaMatrimonioCliente.url, "Acta de matrimonio")}} className='btn btn-primary' >Descargar</button>) : 
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

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta Constitutiva del vendedor</div><div className='col-6 text-end'>
                            { docu.ActaConstitutivaV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActaConstitutivaV.url, "acta constitutiva")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Memoria descriptiva</div><div className='col-6 text-end'>
                            { docu.MemoriaDescriptivaV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.MemoriaDescriptivaV.url, "memoria descriptiva")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Plano arquitectónico</div><div className='col-6 text-end'>
                            { docu.PlanoArqV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.PlanoArqV.url, "plano arquitectonico")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Estudio de habitabilidad</div><div className='col-6 text-end'>
                            { docu.HabitabilidadV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.HabitabilidadV.url, "habitabilidad")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Recibo de luz 1</div><div className='col-6 text-end'>
                            { docu.RecibosLuzV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RecibosLuzV.url, "recibo de luz")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Recibo de luz 2</div><div className='col-6 text-end'>
                            { docu.RecibosLuzV2 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RecibosLuzV2.url, "recibo de luz2")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Recibo de luz 3</div><div className='col-6 text-end'>
                            { docu.RecibosLuzV3 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RecibosLuzV3.url, "recibo de luz3")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de matrimonio del vendedor</div><div className='col-6 text-end'>
                            { docu.ActaMatrimonioVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActaMatrimonioVendedor.url, "acta matrimonio vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>INE del conyuge del vendedor</div><div className='col-6 text-end'>
                            { docu.IneConyugeVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.IneConyugeVendedor.url, "INE del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>RFC del conyuge del vendedor</div><div className='col-6 text-end'>
                            { docu.RfcConyugeVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RfcConyugeVendedor.url, "RFC del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento del conyuge del vendedor</div><div className='col-6 text-end'>
                            { docu.ActNacConyugeVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActNacConyugeVendedor.url, "acta de nacimiento del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>CURP del conyuge del vendedor</div><div className='col-6 text-end'>
                            { docu.CURPConyugeVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.CURPConyugeVendedor.url, "CURP del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                        
                        </ul>
                      </div>
                    ) : (<></>)
                  }
                  { infonavitSoltero == true && docu.status != 'BAJA' ? 
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
                            
                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Formato General</div><div className='col-6 text-end'>
                            { docu.FormatoG != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.FormatoG.url, "formato general")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Taller saber para decidir</div><div className='col-6 text-end'>
                            { docu.TallerSaberCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.TallerSaberCliente.url, "taller saber para decidir")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Precalificación</div><div className='col-6 text-end'>
                            { docu.PrecalificacionCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.PrecalificacionCliente.url, "precalificacion infonavit")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Solicitud de crédito</div><div className='col-6 text-end'>
                            { docu.SolicitudCreditoCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.SolicitudCreditoCliente.url, "solicitud de credito")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>SIC</div><div className='col-6 text-end'>
                            { docu.SIC != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.SIC.url, "SIC")}} className='btn btn-primary' >Descargar</button>) : 
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

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta Constitutiva del vendedor</div><div className='col-6 text-end'>
                            { docu.ActaConstitutivaV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActaConstitutivaV.url, "acta constitutiva")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Memoria descriptiva</div><div className='col-6 text-end'>
                            { docu.MemoriaDescriptivaV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.MemoriaDescriptivaV.url, "memoria descriptiva")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Plano arquitectónico</div><div className='col-6 text-end'>
                            { docu.PlanoArqV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.PlanoArqV.url, "plano arquitectonico")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Estudio de habitabilidad</div><div className='col-6 text-end'>
                            { docu.HabitabilidadV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.HabitabilidadV.url, "habitabilidad")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Recibo de luz 1</div><div className='col-6 text-end'>
                            { docu.RecibosLuzV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RecibosLuzV.url, "recibo de luz")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Recibo de luz 2</div><div className='col-6 text-end'>
                            { docu.RecibosLuzV2 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RecibosLuzV2.url, "recibo de luz2")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Recibo de luz 3</div><div className='col-6 text-end'>
                            { docu.RecibosLuzV3 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RecibosLuzV3.url, "recibo de luz3")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de matrimonio del vendedor</div><div className='col-6 text-end'>
                            { docu.ActaMatrimonioVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActaMatrimonioVendedor.url, "acta matrimonio vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>INE del conyuge del vendedor</div><div className='col-6 text-end'>
                            { docu.IneConyugeVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.IneConyugeVendedor.url, "INE del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>RFC del conyuge del vendedor</div><div className='col-6 text-end'>
                            { docu.RfcConyugeVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RfcConyugeVendedor.url, "RFC del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento del conyuge del vendedor</div><div className='col-6 text-end'>
                            { docu.ActNacConyugeVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActNacConyugeVendedor.url, "acta de nacimiento del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>CURP del conyuge del vendedor</div><div className='col-6 text-end'>
                            { docu.CURPConyugeVendedor != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.CURPConyugeVendedor.url, "CURP del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                        
                        </ul>
                      </div>
                    ) : (<></>)
                  }
                  { ipejalCasadoBM == true && docu.status != 'BAJA' ? 
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
                          
                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento</div><div className='col-6 text-end'>
                            { docu.ActNac != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActNac.url, "ACTANAC")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de matrimonio del cliente</div><div className='col-6 text-end'>
                            { docu.ActaMatrimonioCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActaMatrimonioCliente.url, "Acta de matrimonio")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>INE del conyuge del cliente</div><div className='col-6 text-end'>
                            { docu.IneConyugeCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.IneConyugeCliente.url, "INE conyugue cliente")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento del conyuge del cliente</div><div className='col-6 text-end'>
                            { docu.ActNacConyugeCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActNacConyugeCliente.url, "Acta de nacimiento del conyugue cliente")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>CURP del conyuge del cliente</div><div className='col-6 text-end'>
                            { docu.CurpConyugeCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.CurpConyugeCliente.url, "CURP del conyugue cliente")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Predial</div><div className='col-6 text-end'>
                            { docu.Predial != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.Predial.url, "Predial")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>No adeudo predial</div><div className='col-6 text-end'>
                            { docu.NoAdeudoPredial != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.NoAdeudoPredial.url, "no adeudo predial")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Comprobante de agua</div><div className='col-6 text-end'>
                            { docu.Agua != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.Agua.url, "Agua")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Comprobante de no adeudo de agua</div><div className='col-6 text-end'>
                            { docu.NoAdeudoAgua != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.NoAdeudoAgua.url, "no adeudo agua")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Escritura</div><div className='col-6 text-end'>
                            { docu.Escritura != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.Escritura.url, "Escritura")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Gravamen</div><div className='col-6 text-end'>
                            { docu.Gravamen != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.Gravamen.url, "Gravamen")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Talón de nómina</div><div className='col-6 text-end'>
                            { docu.Nomina != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.Nomina.url, "talon de nomina")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Cuotas condominales</div><div className='col-6 text-end'>
                            { docu.CuotasCondominales != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.CuotasCondominales.url, "cuotas condominales")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>No adeudo de cuotas condominales</div><div className='col-6 text-end'>
                            { docu.NoAdeudoCuotasCondominales != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.NoAdeudoCuotasCondominales.url, "no adeudo decuotas condominales")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Licencia de alineamiento y número oficial</div><div className='col-6 text-end'>
                            { docu.LicenciaAlineamiento != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.LicenciaAlineamiento.url, "licencia de alineamiento y numero oficial")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Carta de adeudo</div><div className='col-6 text-end'>
                            { docu.CartaAdeudo != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.CartaAdeudo.url, "carta de adeudo")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Estado de cuenta</div><div className='col-6 text-end'>
                            { docu.EstadoCtaV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.EstadoCtaV.url, "EstadoCta")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Precalificación de infonavit</div><div className='col-6 text-end'>
                            { docu.PrecalificacionINFONAVIT != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.PrecalificacionINFONAVIT.url, "precalificacion infonavit")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Constancia de derechos</div><div className='col-6 text-end'>
                            { docu.ConstanciaDerechos != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ConstanciaDerechos.url, "constancia de derechos")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                        
                        </ul>
                      </div>
                    ) : (<></>)
                  }
                  { ipejalCasadoBS == true && docu.status != 'BAJA' ? 
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
                          
                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento</div><div className='col-6 text-end'>
                            { docu.ActNac != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActNac.url, "ACTANAC")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de matrimonio del cliente</div><div className='col-6 text-end'>
                            { docu.ActaMatrimonioCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActaMatrimonioCliente.url, "Acta de matrimonio")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Predial</div><div className='col-6 text-end'>
                            { docu.Predial != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.Predial.url, "Predial")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>No adeudo predial</div><div className='col-6 text-end'>
                            { docu.NoAdeudoPredial != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.NoAdeudoPredial.url, "no adeudo predial")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Comprobante de agua</div><div className='col-6 text-end'>
                            { docu.Agua != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.Agua.url, "Agua")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Comprobante de no adeudo de agua</div><div className='col-6 text-end'>
                            { docu.NoAdeudoAgua != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.NoAdeudoAgua.url, "no adeudo agua")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Escritura</div><div className='col-6 text-end'>
                            { docu.Escritura != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.Escritura.url, "Escritura")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Gravamen</div><div className='col-6 text-end'>
                            { docu.Gravamen != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.Gravamen.url, "Gravamen")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Talón de nómina</div><div className='col-6 text-end'>
                            { docu.Nomina != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.Nomina.url, "talon de nomina")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Cuotas condominales</div><div className='col-6 text-end'>
                            { docu.CuotasCondominales != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.CuotasCondominales.url, "cuotas condominales")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>No adeudo de cuotas condominales</div><div className='col-6 text-end'>
                            { docu.NoAdeudoCuotasCondominales != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.NoAdeudoCuotasCondominales.url, "no adeudo decuotas condominales")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Licencia de alineamiento y número oficial</div><div className='col-6 text-end'>
                            { docu.LicenciaAlineamiento != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.LicenciaAlineamiento.url, "licencia de alineamiento y numero oficial")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Carta de adeudo</div><div className='col-6 text-end'>
                            { docu.CartaAdeudo != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.CartaAdeudo.url, "carta de adeudo")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Estado de cuenta</div><div className='col-6 text-end'>
                            { docu.EstadoCtaV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.EstadoCtaV.url, "EstadoCta")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Precalificación de infonavit</div><div className='col-6 text-end'>
                            { docu.PrecalificacionINFONAVIT != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.PrecalificacionINFONAVIT.url, "precalificacion infonavit")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Constancia de derechos</div><div className='col-6 text-end'>
                            { docu.ConstanciaDerechos != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ConstanciaDerechos.url, "constancia de derechos")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                        
                        </ul>
                      </div>
                    ) : (<></>)
                  }
                  { ipejalSoltero == true && docu.status != 'BAJA' ? 
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
                          
                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento</div><div className='col-6 text-end'>
                            { docu.ActNac != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActNac.url, "ACTANAC")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Predial</div><div className='col-6 text-end'>
                            { docu.Predial != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.Predial.url, "Predial")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>No adeudo predial</div><div className='col-6 text-end'>
                            { docu.NoAdeudoPredial != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.NoAdeudoPredial.url, "no adeudo predial")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Comprobante de agua</div><div className='col-6 text-end'>
                            { docu.Agua != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.Agua.url, "Agua")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Comprobante de no adeudo de agua</div><div className='col-6 text-end'>
                            { docu.NoAdeudoAgua != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.NoAdeudoAgua.url, "no adeudo agua")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Escritura</div><div className='col-6 text-end'>
                            { docu.Escritura != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.Escritura.url, "Escritura")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Gravamen</div><div className='col-6 text-end'>
                            { docu.Gravamen != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.Gravamen.url, "Gravamen")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Talón de nómina</div><div className='col-6 text-end'>
                            { docu.Nomina != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.Nomina.url, "talon de nomina")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Cuotas condominales</div><div className='col-6 text-end'>
                            { docu.CuotasCondominales != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.CuotasCondominales.url, "cuotas condominales")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>No adeudo de cuotas condominales</div><div className='col-6 text-end'>
                            { docu.NoAdeudoCuotasCondominales != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.NoAdeudoCuotasCondominales.url, "no adeudo decuotas condominales")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Licencia de alineamiento y número oficial</div><div className='col-6 text-end'>
                            { docu.LicenciaAlineamiento != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.LicenciaAlineamiento.url, "licencia de alineamiento y numero oficial")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Carta de adeudo</div><div className='col-6 text-end'>
                            { docu.CartaAdeudo != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.CartaAdeudo.url, "carta de adeudo")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Estado de cuenta</div><div className='col-6 text-end'>
                            { docu.EstadoCtaV != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.EstadoCtaV.url, "EstadoCta")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Precalificación de infonavit</div><div className='col-6 text-end'>
                            { docu.PrecalificacionINFONAVIT != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.PrecalificacionINFONAVIT.url, "precalificacion infonavit")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Constancia de derechos</div><div className='col-6 text-end'>
                            { docu.ConstanciaDerechos != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ConstanciaDerechos.url, "constancia de derechos")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                        
                        </ul>
                      </div>
                    ) : (<></>)
                  }
                  { bancoCasado == true && docu.status != 'BAJA' ?
                    (
                      <div className='row justify-content-center'>
                        <ul className="list-group w-75">
                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>INE</div><div className='col-6 text-end'>
                            { docu.INE != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.INE.url, "INE")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>RFC</div><div className='col-6 text-end'>
                            { docu.RFC != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RFC.url, "RFC")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Comprobante de domicilio 1</div><div className='col-6 text-end'>
                            { docu.CompDom != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.CompDom.url, "comprobante de domicilio 1")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Comprobante de domicilio 2</div><div className='col-6 text-end'>
                            { docu.CompDom2 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.CompDom2.url, "comprobante de domicilio 2")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                          
                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento</div><div className='col-6 text-end'>
                            { docu.ActNac != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActNac.url, "ACTANAC")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de matrimonio del cliente</div><div className='col-6 text-end'>
                            { docu.ActaMatrimonioCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActaMatrimonioCliente.url, "Acta de matrimonio")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento del conyuge</div><div className='col-6 text-end'>
                            { docu.ActNacConyuge != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActNacConyuge.url, "Acta de nacimiento conyuge")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento de coacreditado</div><div className='col-6 text-end'>
                            { docu.ActNacCoAcreditado != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActNacCoAcreditado.url, "Acta de nacimiento coacreditado")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Recibo de nómina 1</div><div className='col-6 text-end'>
                            { docu.Nomina1 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.Nomina1.url, "recibo de nomina 1")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Recibo de nómina 2</div><div className='col-6 text-end'>
                            { docu.Nomina2 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.Nomina2.url, "recibo de nomina 2")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Recibo de nómina 3</div><div className='col-6 text-end'>
                            { docu.Nomina3 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.Nomina3.url, "recibo de nomina 3")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Estado de cuenta 1</div><div className='col-6 text-end'>
                            { docu.EdoCuenta1 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.EdoCuenta1.url, "EstadoCta 1")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Estado de cuenta 2</div><div className='col-6 text-end'>
                            { docu.EdoCuenta2 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.EdoCuenta2.url, "EstadoCta 2")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Estado de cuenta 3</div><div className='col-6 text-end'>
                            { docu.EdoCuenta3 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.EdoCuenta3.url, "EstadoCta 1")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Estado de cuenta 4</div><div className='col-6 text-end'>
                            { docu.EdoCuenta4 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.EdoCuenta4.url, "EstadoCta 1")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Estado de cuenta 5</div><div className='col-6 text-end'>
                            { docu.EdoCuenta5 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.EdoCuenta5.url, "EstadoCta 5")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Estado de cuenta 6</div><div className='col-6 text-end'>
                            { docu.EdoCuenta6 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.EdoCuenta1.url, "EstadoCta 6")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                        
                        </ul>
                      </div>
                    ) : (<></>)
                  }
                  { bancoSoltero == true && docu.status != 'BAJA' ?
                    (
                      <div className='row justify-content-center'>
                        <ul className="list-group w-75">
                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>INE</div><div className='col-6 text-end'>
                            { docu.INE != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.INE.url, "INE")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>RFC</div><div className='col-6 text-end'>
                            { docu.RFC != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RFC.url, "RFC")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Comprobante de domicilio 1</div><div className='col-6 text-end'>
                            { docu.CompDom != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.CompDom.url, "comprobante de domicilio 1")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Comprobante de domicilio 2</div><div className='col-6 text-end'>
                            { docu.CompDom2 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.CompDom2.url, "comprobante de domicilio 2")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                          
                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento</div><div className='col-6 text-end'>
                            { docu.ActNac != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActNac.url, "ACTANAC")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento de coacreditado</div><div className='col-6 text-end'>
                            { docu.ActNacCoAcreditado != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActNacCoAcreditado.url, "Acta de nacimiento coacreditado")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Recibo de nómina 1</div><div className='col-6 text-end'>
                            { docu.Nomina1 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.Nomina1.url, "recibo de nomina 1")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Recibo de nómina 2</div><div className='col-6 text-end'>
                            { docu.Nomina2 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.Nomina2.url, "recibo de nomina 2")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Recibo de nómina 3</div><div className='col-6 text-end'>
                            { docu.Nomina3 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.Nomina3.url, "recibo de nomina 3")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Estado de cuenta 1</div><div className='col-6 text-end'>
                            { docu.EdoCuenta1 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.EdoCuenta1.url, "EstadoCta 1")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Estado de cuenta 2</div><div className='col-6 text-end'>
                            { docu.EdoCuenta2 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.EdoCuenta2.url, "EstadoCta 2")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Estado de cuenta 3</div><div className='col-6 text-end'>
                            { docu.EdoCuenta3 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.EdoCuenta3.url, "EstadoCta 1")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Estado de cuenta 4</div><div className='col-6 text-end'>
                            { docu.EdoCuenta4 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.EdoCuenta4.url, "EstadoCta 1")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Estado de cuenta 5</div><div className='col-6 text-end'>
                            { docu.EdoCuenta5 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.EdoCuenta5.url, "EstadoCta 5")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Estado de cuenta 6</div><div className='col-6 text-end'>
                            { docu.EdoCuenta6 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.EdoCuenta1.url, "EstadoCta 6")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                        
                        </ul>
                      </div>
                    ) : (<></>)
                  }
                  { docu.regimen_patrimonial == 'INFONAVIT-unamos-creditos' && docu.n_creditos == '4' ? (

                    <div className='row justify-content-center'>
                      <ul className="list-group w-75">

                        {/* Cliente 1 */}

                        <li className="list-group-item">Cliente 1: {docu.nombre}</li>
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
                          
                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Formato General</div><div className='col-6 text-end'>
                          { docu.FormatoG != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.FormatoG.url, "formato general")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>

                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Taller saber para decidir</div><div className='col-6 text-end'>
                          { docu.TallerSaberCliente != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.TallerSaberCliente.url, "taller saber para decidir")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>

                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Precalificación</div><div className='col-6 text-end'>
                          { docu.PrecalificacionCliente != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.PrecalificacionCliente.url, "precalificacion infonavit")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>

                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Solicitud de crédito</div><div className='col-6 text-end'>
                          { docu.SolicitudCreditoCliente != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.SolicitudCreditoCliente.url, "solicitud de credito")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>

                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>SIC</div><div className='col-6 text-end'>
                          { docu.SIC != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.SIC.url, "SIC")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>
                          
                          { docu.civil == 'SOLTERO' ? (<></>) : (
                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de matrimonio del cliente</div><div className='col-6 text-end'>
                            { docu.ActaMatrimonioCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActaMatrimonioCliente.url, "Acta de matrimonio")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                            )
                          }
                          { docu.regimen_patrimonial == "BIENES SEPARADOS" ? (<></>) : (
                            <>
                              <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>INE del conyuge del cliente</div><div className='col-6 text-end'>
                              { docu.IneConyugeCliente != undefined ?
                                (<button type='button' onClick={() => {downloadFrom(docu.IneConyugeCliente.url, "INE conyugue cliente")}} className='btn btn-primary' >Descargar</button>) : 
                                (<button className='btn btn-danger' disabled >Pendiente</button>)
                              }
                              </div></div></li>

                              <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>RFC del conyuge del cliente</div><div className='col-6 text-end'>
                              { docu.RfcConyugeCliente != undefined ?
                                (<button type='button' onClick={() => {downloadFrom(docu.RfcConyugeCliente.url, "RFC conyugue cliente")}} className='btn btn-primary' >Descargar</button>) : 
                                (<button className='btn btn-danger' disabled >Pendiente</button>)
                              }
                              </div></div></li>

                              <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento del conyuge del cliente</div><div className='col-6 text-end'>
                              { docu.ActNacConyugeCliente != undefined ?
                                (<button type='button' onClick={() => {downloadFrom(docu.ActNacConyugeCliente.url, "Acta de nacimiento del conyugue cliente")}} className='btn btn-primary' >Descargar</button>) : 
                                (<button className='btn btn-danger' disabled >Pendiente</button>)
                              }
                              </div></div></li>

                              <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>CURP del conyuge del cliente</div><div className='col-6 text-end'>
                              { docu.CurpConyugeCliente != undefined ?
                                (<button type='button' onClick={() => {downloadFrom(docu.CurpConyugeCliente.url, "CURP del conyugue cliente")}} className='btn btn-primary' >Descargar</button>) : 
                                (<button className='btn btn-danger' disabled >Pendiente</button>)
                              }
                              </div></div></li>
                            </>
                            )
                          }

                          {/* Cliente 2 */}

                          <li className="list-group-item">Cliente 2: {docu.nombre2}</li>
                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>INE</div><div className='col-6 text-end'>
                            { docu.INE2 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.INE2.url, "INE2")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>CURP</div><div className='col-6 text-end'>
                            { docu.CURP2 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.CURP2.url, "CURP2")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>RFC</div><div className='col-6 text-end'>
                            { docu.RFC2 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RFC2.url, "RFC2")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Comprobante de domicilio</div><div className='col-6 text-end'>
                            { docu.CompDom2 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.CompDom2.url, "COMPDOM2")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento</div><div className='col-6 text-end'>
                            { docu.ActNac2 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActNac2.url, "ACTANAC2")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                            
                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Formato General</div><div className='col-6 text-end'>
                            { docu.FormatoG2 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.FormatoG2.url, "formato general2")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Taller saber para decidir</div><div className='col-6 text-end'>
                            { docu.TallerSaberCliente2 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.TallerSaberCliente2.url, "taller saber para decidir2")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Precalificación</div><div className='col-6 text-end'>
                            { docu.PrecalificacionCliente2 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.PrecalificacionCliente2.url, "precalificacion infonavit2")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Solicitud de crédito</div><div className='col-6 text-end'>
                            { docu.SolicitudCreditoCliente2 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.SolicitudCreditoCliente2.url, "solicitud de credito2")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>SIC</div><div className='col-6 text-end'>
                            { docu.SIC2 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.SIC2.url, "SIC2")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                            
                            { docu.civil2 == 'SOLTERO' ? (<></>) : (
                              <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de matrimonio del cliente</div><div className='col-6 text-end'>
                              { docu.ActaMatrimonioCliente2 != undefined ?
                                (<button type='button' onClick={() => {downloadFrom(docu.ActaMatrimonioCliente2.url, "Acta de matrimonio2")}} className='btn btn-primary' >Descargar</button>) : 
                                (<button className='btn btn-danger' disabled >Pendiente</button>)
                              }
                              </div></div></li>
                              )
                            }
                            { docu.regimen_patrimonial2 == "BIENES SEPARADOS" ? (<></>) : (
                              <>
                                <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>INE del conyuge del cliente</div><div className='col-6 text-end'>
                                { docu.IneConyugeCliente2 != undefined ?
                                  (<button type='button' onClick={() => {downloadFrom(docu.IneConyugeCliente2.url, "INE conyugue cliente2")}} className='btn btn-primary' >Descargar</button>) : 
                                  (<button className='btn btn-danger' disabled >Pendiente</button>)
                                }
                                </div></div></li>

                                <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>RFC del conyuge del cliente</div><div className='col-6 text-end'>
                                { docu.RfcConyugeCliente2 != undefined ?
                                  (<button type='button' onClick={() => {downloadFrom(docu.RfcConyugeCliente2.url, "RFC conyugue cliente2")}} className='btn btn-primary' >Descargar</button>) : 
                                  (<button className='btn btn-danger' disabled >Pendiente</button>)
                                }
                                </div></div></li>

                                <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento del conyuge del cliente</div><div className='col-6 text-end'>
                                { docu.ActNacConyugeCliente2 != undefined ?
                                  (<button type='button' onClick={() => {downloadFrom(docu.ActNacConyugeCliente2.url, "Acta de nacimiento del conyugue cliente2")}} className='btn btn-primary' >Descargar</button>) : 
                                  (<button className='btn btn-danger' disabled >Pendiente</button>)
                                }
                                </div></div></li>

                                <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>CURP del conyuge del cliente</div><div className='col-6 text-end'>
                                { docu.CurpConyugeCliente2 != undefined ?
                                  (<button type='button' onClick={() => {downloadFrom(docu.CurpConyugeCliente2.url, "CURP del conyugue cliente2")}} className='btn btn-primary' >Descargar</button>) : 
                                  (<button className='btn btn-danger' disabled >Pendiente</button>)
                                }
                                </div></div></li>
                              </>
                              )
                            }
                          
                            {/* Cliente 3 */}

                            <li className="list-group-item">Cliente 3: {docu.nombre3}</li>
                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>INE</div><div className='col-6 text-end'>
                              { docu.INE3 != undefined ?
                                (<button type='button' onClick={() => {downloadFrom(docu.INE3.url, "INE3")}} className='btn btn-primary' >Descargar</button>) : 
                                (<button className='btn btn-danger' disabled >Pendiente</button>)
                              }
                              </div></div></li>
                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>CURP</div><div className='col-6 text-end'>
                              { docu.CURP3 != undefined ?
                                (<button type='button' onClick={() => {downloadFrom(docu.CURP3.url, "CURP3")}} className='btn btn-primary' >Descargar</button>) : 
                                (<button className='btn btn-danger' disabled >Pendiente</button>)
                              }
                              </div></div></li>
                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>RFC</div><div className='col-6 text-end'>
                              { docu.RFC3 != undefined ?
                                (<button type='button' onClick={() => {downloadFrom(docu.RFC3.url, "RFC3")}} className='btn btn-primary' >Descargar</button>) : 
                                (<button className='btn btn-danger' disabled >Pendiente</button>)
                              }
                              </div></div></li>
                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Comprobante de domicilio</div><div className='col-6 text-end'>
                              { docu.CompDom3 != undefined ?
                                (<button type='button' onClick={() => {downloadFrom(docu.CompDom3.url, "COMPDOM3")}} className='btn btn-primary' >Descargar</button>) : 
                                (<button className='btn btn-danger' disabled >Pendiente</button>)
                              }
                              </div></div></li>
                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento</div><div className='col-6 text-end'>
                              { docu.ActNac3 != undefined ?
                                (<button type='button' onClick={() => {downloadFrom(docu.ActNac3.url, "ACTANAC3")}} className='btn btn-primary' >Descargar</button>) : 
                                (<button className='btn btn-danger' disabled >Pendiente</button>)
                              }
                              </div></div></li>
                              
                              <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Formato General</div><div className='col-6 text-end'>
                              { docu.FormatoG3 != undefined ?
                                (<button type='button' onClick={() => {downloadFrom(docu.FormatoG3.url, "formato general3")}} className='btn btn-primary' >Descargar</button>) : 
                                (<button className='btn btn-danger' disabled >Pendiente</button>)
                              }
                              </div></div></li>

                              <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Taller saber para decidir</div><div className='col-6 text-end'>
                              { docu.TallerSaberCliente3 != undefined ?
                                (<button type='button' onClick={() => {downloadFrom(docu.TallerSaberCliente3.url, "taller saber para decidir3")}} className='btn btn-primary' >Descargar</button>) : 
                                (<button className='btn btn-danger' disabled >Pendiente</button>)
                              }
                              </div></div></li>

                              <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Precalificación</div><div className='col-6 text-end'>
                              { docu.PrecalificacionCliente3 != undefined ?
                                (<button type='button' onClick={() => {downloadFrom(docu.PrecalificacionCliente3.url, "precalificacion infonavit3")}} className='btn btn-primary' >Descargar</button>) : 
                                (<button className='btn btn-danger' disabled >Pendiente</button>)
                              }
                              </div></div></li>

                              <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Solicitud de crédito</div><div className='col-6 text-end'>
                              { docu.SolicitudCreditoCliente3 != undefined ?
                                (<button type='button' onClick={() => {downloadFrom(docu.SolicitudCreditoCliente3.url, "solicitud de credito3")}} className='btn btn-primary' >Descargar</button>) : 
                                (<button className='btn btn-danger' disabled >Pendiente</button>)
                              }
                              </div></div></li>

                              <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>SIC</div><div className='col-6 text-end'>
                              { docu.SIC3 != undefined ?
                                (<button type='button' onClick={() => {downloadFrom(docu.SIC3.url, "SIC3")}} className='btn btn-primary' >Descargar</button>) : 
                                (<button className='btn btn-danger' disabled >Pendiente</button>)
                              }
                              </div></div></li>
                              
                              { docu.civil3 == 'SOLTERO' ? (<></>) : (
                                <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de matrimonio del cliente</div><div className='col-6 text-end'>
                                { docu.ActaMatrimonioCliente3 != undefined ?
                                  (<button type='button' onClick={() => {downloadFrom(docu.ActaMatrimonioCliente3.url, "Acta de matrimonio3")}} className='btn btn-primary' >Descargar</button>) : 
                                  (<button className='btn btn-danger' disabled >Pendiente</button>)
                                }
                                </div></div></li>
                                )
                              }
                              { docu.regimen_patrimonial3 == "BIENES SEPARADOS" ? (<></>) : (
                                <>
                                  <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>INE del conyuge del cliente</div><div className='col-6 text-end'>
                                  { docu.IneConyugeCliente3 != undefined ?
                                    (<button type='button' onClick={() => {downloadFrom(docu.IneConyugeCliente3.url, "INE conyugue cliente3")}} className='btn btn-primary' >Descargar</button>) : 
                                    (<button className='btn btn-danger' disabled >Pendiente</button>)
                                  }
                                  </div></div></li>

                                  <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>RFC del conyuge del cliente</div><div className='col-6 text-end'>
                                  { docu.RfcConyugeCliente3 != undefined ?
                                    (<button type='button' onClick={() => {downloadFrom(docu.RfcConyugeCliente3.url, "RFC conyugue cliente3")}} className='btn btn-primary' >Descargar</button>) : 
                                    (<button className='btn btn-danger' disabled >Pendiente</button>)
                                  }
                                  </div></div></li>

                                  <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento del conyuge del cliente</div><div className='col-6 text-end'>
                                  { docu.ActNacConyugeCliente3 != undefined ?
                                    (<button type='button' onClick={() => {downloadFrom(docu.ActNacConyugeCliente3.url, "Acta de nacimiento del conyugue cliente3")}} className='btn btn-primary' >Descargar</button>) : 
                                    (<button className='btn btn-danger' disabled >Pendiente</button>)
                                  }
                                  </div></div></li>

                                  <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>CURP del conyuge del cliente</div><div className='col-6 text-end'>
                                  { docu.CurpConyugeCliente3 != undefined ?
                                    (<button type='button' onClick={() => {downloadFrom(docu.CurpConyugeCliente3.url, "CURP del conyugue cliente3")}} className='btn btn-primary' >Descargar</button>) : 
                                    (<button className='btn btn-danger' disabled >Pendiente</button>)
                                  }
                                  </div></div></li>
                                </>
                                )
                              }

                              {/* Cliente 4 */}

                              <li className="list-group-item">Cliente 4: {docu.nombre4}</li>
                              <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>INE</div><div className='col-6 text-end'>
                                { docu.INE4 != undefined ?
                                  (<button type='button' onClick={() => {downloadFrom(docu.INE4.url, "INE4")}} className='btn btn-primary' >Descargar</button>) : 
                                  (<button className='btn btn-danger' disabled >Pendiente</button>)
                                }
                                </div></div></li>
                              <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>CURP</div><div className='col-6 text-end'>
                                { docu.CURP4 != undefined ?
                                  (<button type='button' onClick={() => {downloadFrom(docu.CURP4.url, "CURP4")}} className='btn btn-primary' >Descargar</button>) : 
                                  (<button className='btn btn-danger' disabled >Pendiente</button>)
                                }
                                </div></div></li>
                              <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>RFC</div><div className='col-6 text-end'>
                                { docu.RFC4 != undefined ?
                                  (<button type='button' onClick={() => {downloadFrom(docu.RFC4.url, "RFC4")}} className='btn btn-primary' >Descargar</button>) : 
                                  (<button className='btn btn-danger' disabled >Pendiente</button>)
                                }
                                </div></div></li>
                              <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Comprobante de domicilio</div><div className='col-6 text-end'>
                                { docu.CompDom4 != undefined ?
                                  (<button type='button' onClick={() => {downloadFrom(docu.CompDom4.url, "COMPDOM4")}} className='btn btn-primary' >Descargar</button>) : 
                                  (<button className='btn btn-danger' disabled >Pendiente</button>)
                                }
                                </div></div></li>
                              <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento</div><div className='col-6 text-end'>
                                { docu.ActNac4 != undefined ?
                                  (<button type='button' onClick={() => {downloadFrom(docu.ActNac4.url, "ACTANAC4")}} className='btn btn-primary' >Descargar</button>) : 
                                  (<button className='btn btn-danger' disabled >Pendiente</button>)
                                }
                                </div></div></li>
                                
                                <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Formato General</div><div className='col-6 text-end'>
                                { docu.FormatoG4 != undefined ?
                                  (<button type='button' onClick={() => {downloadFrom(docu.FormatoG4.url, "formato general4")}} className='btn btn-primary' >Descargar</button>) : 
                                  (<button className='btn btn-danger' disabled >Pendiente</button>)
                                }
                                </div></div></li>

                                <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Taller saber para decidir</div><div className='col-6 text-end'>
                                { docu.TallerSaberCliente4 != undefined ?
                                  (<button type='button' onClick={() => {downloadFrom(docu.TallerSaberCliente4.url, "taller saber para decidir4")}} className='btn btn-primary' >Descargar</button>) : 
                                  (<button className='btn btn-danger' disabled >Pendiente</button>)
                                }
                                </div></div></li>

                                <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Precalificación</div><div className='col-6 text-end'>
                                { docu.PrecalificacionCliente4 != undefined ?
                                  (<button type='button' onClick={() => {downloadFrom(docu.PrecalificacionCliente4.url, "precalificacion infonavit4")}} className='btn btn-primary' >Descargar</button>) : 
                                  (<button className='btn btn-danger' disabled >Pendiente</button>)
                                }
                                </div></div></li>

                                <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Solicitud de crédito</div><div className='col-6 text-end'>
                                { docu.SolicitudCreditoCliente4 != undefined ?
                                  (<button type='button' onClick={() => {downloadFrom(docu.SolicitudCreditoCliente4.url, "solicitud de credito4")}} className='btn btn-primary' >Descargar</button>) : 
                                  (<button className='btn btn-danger' disabled >Pendiente</button>)
                                }
                                </div></div></li>

                                <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>SIC</div><div className='col-6 text-end'>
                                { docu.SIC4 != undefined ?
                                  (<button type='button' onClick={() => {downloadFrom(docu.SIC4.url, "SIC4")}} className='btn btn-primary' >Descargar</button>) : 
                                  (<button className='btn btn-danger' disabled >Pendiente</button>)
                                }
                                </div></div></li>
                                
                                { docu.civil4 == 'SOLTERO' ? (<></>) : (
                                  <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de matrimonio del cliente</div><div className='col-6 text-end'>
                                  { docu.ActaMatrimonioCliente4 != undefined ?
                                    (<button type='button' onClick={() => {downloadFrom(docu.ActaMatrimonioCliente4.url, "Acta de matrimonio4")}} className='btn btn-primary' >Descargar</button>) : 
                                    (<button className='btn btn-danger' disabled >Pendiente</button>)
                                  }
                                  </div></div></li>
                                  )
                                }
                                { docu.regimen_patrimonial4 == "BIENES SEPARADOS" ? (<></>) : (
                                  <>
                                    <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>INE del conyuge del cliente</div><div className='col-6 text-end'>
                                    { docu.IneConyugeCliente4 != undefined ?
                                      (<button type='button' onClick={() => {downloadFrom(docu.IneConyugeCliente4.url, "INE conyugue cliente4")}} className='btn btn-primary' >Descargar</button>) : 
                                      (<button className='btn btn-danger' disabled >Pendiente</button>)
                                    }
                                    </div></div></li>

                                    <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>RFC del conyuge del cliente</div><div className='col-6 text-end'>
                                    { docu.RfcConyugeCliente4 != undefined ?
                                      (<button type='button' onClick={() => {downloadFrom(docu.RfcConyugeCliente4.url, "RFC conyugue cliente4")}} className='btn btn-primary' >Descargar</button>) : 
                                      (<button className='btn btn-danger' disabled >Pendiente</button>)
                                    }
                                    </div></div></li>

                                    <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento del conyuge del cliente</div><div className='col-6 text-end'>
                                    { docu.ActNacConyugeCliente4 != undefined ?
                                      (<button type='button' onClick={() => {downloadFrom(docu.ActNacConyugeCliente4.url, "Acta de nacimiento del conyugue cliente4")}} className='btn btn-primary' >Descargar</button>) : 
                                      (<button className='btn btn-danger' disabled >Pendiente</button>)
                                    }
                                    </div></div></li>

                                    <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>CURP del conyuge del cliente</div><div className='col-6 text-end'>
                                    { docu.CurpConyugeCliente4 != undefined ?
                                      (<button type='button' onClick={() => {downloadFrom(docu.CurpConyugeCliente4.url, "CURP del conyugue cliente4")}} className='btn btn-primary' >Descargar</button>) : 
                                      (<button className='btn btn-danger' disabled >Pendiente</button>)
                                    }
                                    </div></div></li>
                                  </>
                                  )
                                }

                          {/* Documentos del Vendedor */}

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

                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta Constitutiva del vendedor</div><div className='col-6 text-end'>
                          { docu.ActaConstitutivaV != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.ActaConstitutivaV.url, "acta constitutiva")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>

                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Memoria descriptiva</div><div className='col-6 text-end'>
                          { docu.MemoriaDescriptivaV != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.MemoriaDescriptivaV.url, "memoria descriptiva")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>

                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Plano arquitectónico</div><div className='col-6 text-end'>
                          { docu.PlanoArqV != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.PlanoArqV.url, "plano arquitectonico")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>

                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Estudio de habitabilidad</div><div className='col-6 text-end'>
                          { docu.HabitabilidadV != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.HabitabilidadV.url, "habitabilidad")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>

                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Recibo de luz 1</div><div className='col-6 text-end'>
                          { docu.RecibosLuzV != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.RecibosLuzV.url, "recibo de luz")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>

                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Recibo de luz 2</div><div className='col-6 text-end'>
                          { docu.RecibosLuzV2 != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.RecibosLuzV2.url, "recibo de luz2")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>

                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Recibo de luz 3</div><div className='col-6 text-end'>
                          { docu.RecibosLuzV3 != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.RecibosLuzV3.url, "recibo de luz3")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>

                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de matrimonio del vendedor</div><div className='col-6 text-end'>
                          { docu.ActaMatrimonioVendedor != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.ActaMatrimonioVendedor.url, "acta matrimonio vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>

                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>INE del conyuge del vendedor</div><div className='col-6 text-end'>
                          { docu.IneConyugeVendedor != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.IneConyugeVendedor.url, "INE del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>

                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>RFC del conyuge del vendedor</div><div className='col-6 text-end'>
                          { docu.RfcConyugeVendedor != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.RfcConyugeVendedor.url, "RFC del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>

                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento del conyuge del vendedor</div><div className='col-6 text-end'>
                          { docu.ActNacConyugeVendedor != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.ActNacConyugeVendedor.url, "acta de nacimiento del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>

                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>CURP del conyuge del vendedor</div><div className='col-6 text-end'>
                          { docu.CURPConyugeVendedor != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.CURPConyugeVendedor.url, "CURP del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>

                      </ul>
                    </div>

                    ) : (<></>)
                  }

                  { docu.regimen_patrimonial == 'INFONAVIT-unamos-creditos' && docu.n_creditos == '3' ? (

                  <div className='row justify-content-center'>
                    <ul className="list-group w-75">

                      {/* Cliente 1 */}

                      <li className="list-group-item">Cliente 1: {docu.nombre}</li>
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
                        
                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Formato General</div><div className='col-6 text-end'>
                        { docu.FormatoG != undefined ?
                          (<button type='button' onClick={() => {downloadFrom(docu.FormatoG.url, "formato general")}} className='btn btn-primary' >Descargar</button>) : 
                          (<button className='btn btn-danger' disabled >Pendiente</button>)
                        }
                        </div></div></li>

                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Taller saber para decidir</div><div className='col-6 text-end'>
                        { docu.TallerSaberCliente != undefined ?
                          (<button type='button' onClick={() => {downloadFrom(docu.TallerSaberCliente.url, "taller saber para decidir")}} className='btn btn-primary' >Descargar</button>) : 
                          (<button className='btn btn-danger' disabled >Pendiente</button>)
                        }
                        </div></div></li>

                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Precalificación</div><div className='col-6 text-end'>
                        { docu.PrecalificacionCliente != undefined ?
                          (<button type='button' onClick={() => {downloadFrom(docu.PrecalificacionCliente.url, "precalificacion infonavit")}} className='btn btn-primary' >Descargar</button>) : 
                          (<button className='btn btn-danger' disabled >Pendiente</button>)
                        }
                        </div></div></li>

                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Solicitud de crédito</div><div className='col-6 text-end'>
                        { docu.SolicitudCreditoCliente != undefined ?
                          (<button type='button' onClick={() => {downloadFrom(docu.SolicitudCreditoCliente.url, "solicitud de credito")}} className='btn btn-primary' >Descargar</button>) : 
                          (<button className='btn btn-danger' disabled >Pendiente</button>)
                        }
                        </div></div></li>

                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>SIC</div><div className='col-6 text-end'>
                        { docu.SIC != undefined ?
                          (<button type='button' onClick={() => {downloadFrom(docu.SIC.url, "SIC")}} className='btn btn-primary' >Descargar</button>) : 
                          (<button className='btn btn-danger' disabled >Pendiente</button>)
                        }
                        </div></div></li>
                        
                        { docu.civil == 'SOLTERO' ? (<></>) : (
                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de matrimonio del cliente</div><div className='col-6 text-end'>
                          { docu.ActaMatrimonioCliente != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.ActaMatrimonioCliente.url, "Acta de matrimonio")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>
                          )
                        }
                        { docu.regimen_patrimonial == "BIENES SEPARADOS" ? (<></>) : (
                          <>
                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>INE del conyuge del cliente</div><div className='col-6 text-end'>
                            { docu.IneConyugeCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.IneConyugeCliente.url, "INE conyugue cliente")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>RFC del conyuge del cliente</div><div className='col-6 text-end'>
                            { docu.RfcConyugeCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RfcConyugeCliente.url, "RFC conyugue cliente")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento del conyuge del cliente</div><div className='col-6 text-end'>
                            { docu.ActNacConyugeCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActNacConyugeCliente.url, "Acta de nacimiento del conyugue cliente")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>CURP del conyuge del cliente</div><div className='col-6 text-end'>
                            { docu.CurpConyugeCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.CurpConyugeCliente.url, "CURP del conyugue cliente")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                          </>
                          )
                        }

                        {/* Cliente 2 */}

                        <li className="list-group-item">Cliente 2: {docu.nombre2}</li>
                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>INE</div><div className='col-6 text-end'>
                          { docu.INE2 != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.INE2.url, "INE2")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>
                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>CURP</div><div className='col-6 text-end'>
                          { docu.CURP2 != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.CURP2.url, "CURP2")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>
                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>RFC</div><div className='col-6 text-end'>
                          { docu.RFC2 != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.RFC2.url, "RFC2")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>
                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Comprobante de domicilio</div><div className='col-6 text-end'>
                          { docu.CompDom2 != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.CompDom2.url, "COMPDOM2")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>
                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento</div><div className='col-6 text-end'>
                          { docu.ActNac2 != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.ActNac2.url, "ACTANAC2")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>
                          
                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Formato General</div><div className='col-6 text-end'>
                          { docu.FormatoG2 != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.FormatoG2.url, "formato general2")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>

                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Taller saber para decidir</div><div className='col-6 text-end'>
                          { docu.TallerSaberCliente2 != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.TallerSaberCliente2.url, "taller saber para decidir2")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>

                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Precalificación</div><div className='col-6 text-end'>
                          { docu.PrecalificacionCliente2 != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.PrecalificacionCliente2.url, "precalificacion infonavit2")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>

                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Solicitud de crédito</div><div className='col-6 text-end'>
                          { docu.SolicitudCreditoCliente2 != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.SolicitudCreditoCliente2.url, "solicitud de credito2")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>

                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>SIC</div><div className='col-6 text-end'>
                          { docu.SIC2 != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.SIC2.url, "SIC2")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>
                          
                          { docu.civil2 == 'SOLTERO' ? (<></>) : (
                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de matrimonio del cliente</div><div className='col-6 text-end'>
                            { docu.ActaMatrimonioCliente2 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActaMatrimonioCliente2.url, "Acta de matrimonio2")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                            )
                          }
                          { docu.regimen_patrimonial2 == "BIENES SEPARADOS" ? (<></>) : (
                            <>
                              <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>INE del conyuge del cliente</div><div className='col-6 text-end'>
                              { docu.IneConyugeCliente2 != undefined ?
                                (<button type='button' onClick={() => {downloadFrom(docu.IneConyugeCliente2.url, "INE conyugue cliente2")}} className='btn btn-primary' >Descargar</button>) : 
                                (<button className='btn btn-danger' disabled >Pendiente</button>)
                              }
                              </div></div></li>

                              <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>RFC del conyuge del cliente</div><div className='col-6 text-end'>
                              { docu.RfcConyugeCliente2 != undefined ?
                                (<button type='button' onClick={() => {downloadFrom(docu.RfcConyugeCliente2.url, "RFC conyugue cliente2")}} className='btn btn-primary' >Descargar</button>) : 
                                (<button className='btn btn-danger' disabled >Pendiente</button>)
                              }
                              </div></div></li>

                              <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento del conyuge del cliente</div><div className='col-6 text-end'>
                              { docu.ActNacConyugeCliente2 != undefined ?
                                (<button type='button' onClick={() => {downloadFrom(docu.ActNacConyugeCliente2.url, "Acta de nacimiento del conyugue cliente2")}} className='btn btn-primary' >Descargar</button>) : 
                                (<button className='btn btn-danger' disabled >Pendiente</button>)
                              }
                              </div></div></li>

                              <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>CURP del conyuge del cliente</div><div className='col-6 text-end'>
                              { docu.CurpConyugeCliente2 != undefined ?
                                (<button type='button' onClick={() => {downloadFrom(docu.CurpConyugeCliente2.url, "CURP del conyugue cliente2")}} className='btn btn-primary' >Descargar</button>) : 
                                (<button className='btn btn-danger' disabled >Pendiente</button>)
                              }
                              </div></div></li>
                            </>
                            )
                          }
                        
                          {/* Cliente 3 */}

                          <li className="list-group-item">Cliente 3: {docu.nombre3}</li>
                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>INE</div><div className='col-6 text-end'>
                            { docu.INE3 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.INE3.url, "INE3")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>CURP</div><div className='col-6 text-end'>
                            { docu.CURP3 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.CURP3.url, "CURP3")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>RFC</div><div className='col-6 text-end'>
                            { docu.RFC3 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RFC3.url, "RFC3")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Comprobante de domicilio</div><div className='col-6 text-end'>
                            { docu.CompDom3 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.CompDom3.url, "COMPDOM3")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento</div><div className='col-6 text-end'>
                            { docu.ActNac3 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActNac3.url, "ACTANAC3")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                            
                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Formato General</div><div className='col-6 text-end'>
                            { docu.FormatoG3 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.FormatoG3.url, "formato general3")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Taller saber para decidir</div><div className='col-6 text-end'>
                            { docu.TallerSaberCliente3 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.TallerSaberCliente3.url, "taller saber para decidir3")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Precalificación</div><div className='col-6 text-end'>
                            { docu.PrecalificacionCliente3 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.PrecalificacionCliente3.url, "precalificacion infonavit3")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Solicitud de crédito</div><div className='col-6 text-end'>
                            { docu.SolicitudCreditoCliente3 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.SolicitudCreditoCliente3.url, "solicitud de credito3")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>SIC</div><div className='col-6 text-end'>
                            { docu.SIC3 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.SIC3.url, "SIC3")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                            
                            { docu.civil3 == 'SOLTERO' ? (<></>) : (
                              <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de matrimonio del cliente</div><div className='col-6 text-end'>
                              { docu.ActaMatrimonioCliente3 != undefined ?
                                (<button type='button' onClick={() => {downloadFrom(docu.ActaMatrimonioCliente3.url, "Acta de matrimonio3")}} className='btn btn-primary' >Descargar</button>) : 
                                (<button className='btn btn-danger' disabled >Pendiente</button>)
                              }
                              </div></div></li>
                              )
                            }
                            { docu.regimen_patrimonial3 == "BIENES SEPARADOS" ? (<></>) : (
                              <>
                                <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>INE del conyuge del cliente</div><div className='col-6 text-end'>
                                { docu.IneConyugeCliente3 != undefined ?
                                  (<button type='button' onClick={() => {downloadFrom(docu.IneConyugeCliente3.url, "INE conyugue cliente3")}} className='btn btn-primary' >Descargar</button>) : 
                                  (<button className='btn btn-danger' disabled >Pendiente</button>)
                                }
                                </div></div></li>

                                <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>RFC del conyuge del cliente</div><div className='col-6 text-end'>
                                { docu.RfcConyugeCliente3 != undefined ?
                                  (<button type='button' onClick={() => {downloadFrom(docu.RfcConyugeCliente3.url, "RFC conyugue cliente3")}} className='btn btn-primary' >Descargar</button>) : 
                                  (<button className='btn btn-danger' disabled >Pendiente</button>)
                                }
                                </div></div></li>

                                <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento del conyuge del cliente</div><div className='col-6 text-end'>
                                { docu.ActNacConyugeCliente3 != undefined ?
                                  (<button type='button' onClick={() => {downloadFrom(docu.ActNacConyugeCliente3.url, "Acta de nacimiento del conyugue cliente3")}} className='btn btn-primary' >Descargar</button>) : 
                                  (<button className='btn btn-danger' disabled >Pendiente</button>)
                                }
                                </div></div></li>

                                <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>CURP del conyuge del cliente</div><div className='col-6 text-end'>
                                { docu.CurpConyugeCliente3 != undefined ?
                                  (<button type='button' onClick={() => {downloadFrom(docu.CurpConyugeCliente3.url, "CURP del conyugue cliente3")}} className='btn btn-primary' >Descargar</button>) : 
                                  (<button className='btn btn-danger' disabled >Pendiente</button>)
                                }
                                </div></div></li>
                              </>
                              )
                            }

                        {/* Documentos del Vendedor */}

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

                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta Constitutiva del vendedor</div><div className='col-6 text-end'>
                        { docu.ActaConstitutivaV != undefined ?
                          (<button type='button' onClick={() => {downloadFrom(docu.ActaConstitutivaV.url, "acta constitutiva")}} className='btn btn-primary' >Descargar</button>) : 
                          (<button className='btn btn-danger' disabled >Pendiente</button>)
                        }
                        </div></div></li>

                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Memoria descriptiva</div><div className='col-6 text-end'>
                        { docu.MemoriaDescriptivaV != undefined ?
                          (<button type='button' onClick={() => {downloadFrom(docu.MemoriaDescriptivaV.url, "memoria descriptiva")}} className='btn btn-primary' >Descargar</button>) : 
                          (<button className='btn btn-danger' disabled >Pendiente</button>)
                        }
                        </div></div></li>

                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Plano arquitectónico</div><div className='col-6 text-end'>
                        { docu.PlanoArqV != undefined ?
                          (<button type='button' onClick={() => {downloadFrom(docu.PlanoArqV.url, "plano arquitectonico")}} className='btn btn-primary' >Descargar</button>) : 
                          (<button className='btn btn-danger' disabled >Pendiente</button>)
                        }
                        </div></div></li>

                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Estudio de habitabilidad</div><div className='col-6 text-end'>
                        { docu.HabitabilidadV != undefined ?
                          (<button type='button' onClick={() => {downloadFrom(docu.HabitabilidadV.url, "habitabilidad")}} className='btn btn-primary' >Descargar</button>) : 
                          (<button className='btn btn-danger' disabled >Pendiente</button>)
                        }
                        </div></div></li>

                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Recibo de luz 1</div><div className='col-6 text-end'>
                        { docu.RecibosLuzV != undefined ?
                          (<button type='button' onClick={() => {downloadFrom(docu.RecibosLuzV.url, "recibo de luz")}} className='btn btn-primary' >Descargar</button>) : 
                          (<button className='btn btn-danger' disabled >Pendiente</button>)
                        }
                        </div></div></li>

                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Recibo de luz 2</div><div className='col-6 text-end'>
                        { docu.RecibosLuzV2 != undefined ?
                          (<button type='button' onClick={() => {downloadFrom(docu.RecibosLuzV2.url, "recibo de luz2")}} className='btn btn-primary' >Descargar</button>) : 
                          (<button className='btn btn-danger' disabled >Pendiente</button>)
                        }
                        </div></div></li>

                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Recibo de luz 3</div><div className='col-6 text-end'>
                        { docu.RecibosLuzV3 != undefined ?
                          (<button type='button' onClick={() => {downloadFrom(docu.RecibosLuzV3.url, "recibo de luz3")}} className='btn btn-primary' >Descargar</button>) : 
                          (<button className='btn btn-danger' disabled >Pendiente</button>)
                        }
                        </div></div></li>

                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de matrimonio del vendedor</div><div className='col-6 text-end'>
                        { docu.ActaMatrimonioVendedor != undefined ?
                          (<button type='button' onClick={() => {downloadFrom(docu.ActaMatrimonioVendedor.url, "acta matrimonio vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                          (<button className='btn btn-danger' disabled >Pendiente</button>)
                        }
                        </div></div></li>

                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>INE del conyuge del vendedor</div><div className='col-6 text-end'>
                        { docu.IneConyugeVendedor != undefined ?
                          (<button type='button' onClick={() => {downloadFrom(docu.IneConyugeVendedor.url, "INE del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                          (<button className='btn btn-danger' disabled >Pendiente</button>)
                        }
                        </div></div></li>

                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>RFC del conyuge del vendedor</div><div className='col-6 text-end'>
                        { docu.RfcConyugeVendedor != undefined ?
                          (<button type='button' onClick={() => {downloadFrom(docu.RfcConyugeVendedor.url, "RFC del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                          (<button className='btn btn-danger' disabled >Pendiente</button>)
                        }
                        </div></div></li>

                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento del conyuge del vendedor</div><div className='col-6 text-end'>
                        { docu.ActNacConyugeVendedor != undefined ?
                          (<button type='button' onClick={() => {downloadFrom(docu.ActNacConyugeVendedor.url, "acta de nacimiento del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                          (<button className='btn btn-danger' disabled >Pendiente</button>)
                        }
                        </div></div></li>

                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>CURP del conyuge del vendedor</div><div className='col-6 text-end'>
                        { docu.CURPConyugeVendedor != undefined ?
                          (<button type='button' onClick={() => {downloadFrom(docu.CURPConyugeVendedor.url, "CURP del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                          (<button className='btn btn-danger' disabled >Pendiente</button>)
                        }
                        </div></div></li>

                    </ul>
                  </div>

                  ) : (<></>)
                  }


                  { docu.regimen_patrimonial == 'INFONAVIT-unamos-creditos' && docu.n_creditos == '2' ? (

                  <div className='row justify-content-center'>
                    <ul className="list-group w-75">

                      {/* Cliente 1 */}

                      <li className="list-group-item">Cliente 1: {docu.nombre}</li>
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
                        
                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Formato General</div><div className='col-6 text-end'>
                        { docu.FormatoG != undefined ?
                          (<button type='button' onClick={() => {downloadFrom(docu.FormatoG.url, "formato general")}} className='btn btn-primary' >Descargar</button>) : 
                          (<button className='btn btn-danger' disabled >Pendiente</button>)
                        }
                        </div></div></li>

                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Taller saber para decidir</div><div className='col-6 text-end'>
                        { docu.TallerSaberCliente != undefined ?
                          (<button type='button' onClick={() => {downloadFrom(docu.TallerSaberCliente.url, "taller saber para decidir")}} className='btn btn-primary' >Descargar</button>) : 
                          (<button className='btn btn-danger' disabled >Pendiente</button>)
                        }
                        </div></div></li>

                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Precalificación</div><div className='col-6 text-end'>
                        { docu.PrecalificacionCliente != undefined ?
                          (<button type='button' onClick={() => {downloadFrom(docu.PrecalificacionCliente.url, "precalificacion infonavit")}} className='btn btn-primary' >Descargar</button>) : 
                          (<button className='btn btn-danger' disabled >Pendiente</button>)
                        }
                        </div></div></li>

                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Solicitud de crédito</div><div className='col-6 text-end'>
                        { docu.SolicitudCreditoCliente != undefined ?
                          (<button type='button' onClick={() => {downloadFrom(docu.SolicitudCreditoCliente.url, "solicitud de credito")}} className='btn btn-primary' >Descargar</button>) : 
                          (<button className='btn btn-danger' disabled >Pendiente</button>)
                        }
                        </div></div></li>

                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>SIC</div><div className='col-6 text-end'>
                        { docu.SIC != undefined ?
                          (<button type='button' onClick={() => {downloadFrom(docu.SIC.url, "SIC")}} className='btn btn-primary' >Descargar</button>) : 
                          (<button className='btn btn-danger' disabled >Pendiente</button>)
                        }
                        </div></div></li>
                        
                        { docu.civil == 'SOLTERO' ? (<></>) : (
                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de matrimonio del cliente</div><div className='col-6 text-end'>
                          { docu.ActaMatrimonioCliente != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.ActaMatrimonioCliente.url, "Acta de matrimonio")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>
                          )
                        }
                        { docu.regimen_patrimonial == "BIENES SEPARADOS" ? (<></>) : (
                          <>
                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>INE del conyuge del cliente</div><div className='col-6 text-end'>
                            { docu.IneConyugeCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.IneConyugeCliente.url, "INE conyugue cliente")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>RFC del conyuge del cliente</div><div className='col-6 text-end'>
                            { docu.RfcConyugeCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.RfcConyugeCliente.url, "RFC conyugue cliente")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento del conyuge del cliente</div><div className='col-6 text-end'>
                            { docu.ActNacConyugeCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActNacConyugeCliente.url, "Acta de nacimiento del conyugue cliente")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>

                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>CURP del conyuge del cliente</div><div className='col-6 text-end'>
                            { docu.CurpConyugeCliente != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.CurpConyugeCliente.url, "CURP del conyugue cliente")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                          </>
                          )
                        }

                        {/* Cliente 2 */}

                        <li className="list-group-item">Cliente 2: {docu.nombre2}</li>
                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>INE</div><div className='col-6 text-end'>
                          { docu.INE2 != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.INE2.url, "INE2")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>
                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>CURP</div><div className='col-6 text-end'>
                          { docu.CURP2 != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.CURP2.url, "CURP2")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>
                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>RFC</div><div className='col-6 text-end'>
                          { docu.RFC2 != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.RFC2.url, "RFC2")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>
                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Comprobante de domicilio</div><div className='col-6 text-end'>
                          { docu.CompDom2 != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.CompDom2.url, "COMPDOM2")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>
                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento</div><div className='col-6 text-end'>
                          { docu.ActNac2 != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.ActNac2.url, "ACTANAC2")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>
                          
                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Formato General</div><div className='col-6 text-end'>
                          { docu.FormatoG2 != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.FormatoG2.url, "formato general2")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>

                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Taller saber para decidir</div><div className='col-6 text-end'>
                          { docu.TallerSaberCliente2 != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.TallerSaberCliente2.url, "taller saber para decidir2")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>

                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Precalificación</div><div className='col-6 text-end'>
                          { docu.PrecalificacionCliente2 != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.PrecalificacionCliente2.url, "precalificacion infonavit2")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>

                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Solicitud de crédito</div><div className='col-6 text-end'>
                          { docu.SolicitudCreditoCliente2 != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.SolicitudCreditoCliente2.url, "solicitud de credito2")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>

                          <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>SIC</div><div className='col-6 text-end'>
                          { docu.SIC2 != undefined ?
                            (<button type='button' onClick={() => {downloadFrom(docu.SIC2.url, "SIC2")}} className='btn btn-primary' >Descargar</button>) : 
                            (<button className='btn btn-danger' disabled >Pendiente</button>)
                          }
                          </div></div></li>
                          
                          { docu.civil2 == 'SOLTERO' ? (<></>) : (
                            <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de matrimonio del cliente</div><div className='col-6 text-end'>
                            { docu.ActaMatrimonioCliente2 != undefined ?
                              (<button type='button' onClick={() => {downloadFrom(docu.ActaMatrimonioCliente2.url, "Acta de matrimonio2")}} className='btn btn-primary' >Descargar</button>) : 
                              (<button className='btn btn-danger' disabled >Pendiente</button>)
                            }
                            </div></div></li>
                            )
                          }
                          { docu.regimen_patrimonial2 == "BIENES SEPARADOS" ? (<></>) : (
                            <>
                              <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>INE del conyuge del cliente</div><div className='col-6 text-end'>
                              { docu.IneConyugeCliente2 != undefined ?
                                (<button type='button' onClick={() => {downloadFrom(docu.IneConyugeCliente2.url, "INE conyugue cliente2")}} className='btn btn-primary' >Descargar</button>) : 
                                (<button className='btn btn-danger' disabled >Pendiente</button>)
                              }
                              </div></div></li>

                              <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>RFC del conyuge del cliente</div><div className='col-6 text-end'>
                              { docu.RfcConyugeCliente2 != undefined ?
                                (<button type='button' onClick={() => {downloadFrom(docu.RfcConyugeCliente2.url, "RFC conyugue cliente2")}} className='btn btn-primary' >Descargar</button>) : 
                                (<button className='btn btn-danger' disabled >Pendiente</button>)
                              }
                              </div></div></li>

                              <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento del conyuge del cliente</div><div className='col-6 text-end'>
                              { docu.ActNacConyugeCliente2 != undefined ?
                                (<button type='button' onClick={() => {downloadFrom(docu.ActNacConyugeCliente2.url, "Acta de nacimiento del conyugue cliente2")}} className='btn btn-primary' >Descargar</button>) : 
                                (<button className='btn btn-danger' disabled >Pendiente</button>)
                              }
                              </div></div></li>

                              <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>CURP del conyuge del cliente</div><div className='col-6 text-end'>
                              { docu.CurpConyugeCliente2 != undefined ?
                                (<button type='button' onClick={() => {downloadFrom(docu.CurpConyugeCliente2.url, "CURP del conyugue cliente2")}} className='btn btn-primary' >Descargar</button>) : 
                                (<button className='btn btn-danger' disabled >Pendiente</button>)
                              }
                              </div></div></li>
                            </>
                            )
                          }

                        {/* Documentos del Vendedor */}

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

                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta Constitutiva del vendedor</div><div className='col-6 text-end'>
                        { docu.ActaConstitutivaV != undefined ?
                          (<button type='button' onClick={() => {downloadFrom(docu.ActaConstitutivaV.url, "acta constitutiva")}} className='btn btn-primary' >Descargar</button>) : 
                          (<button className='btn btn-danger' disabled >Pendiente</button>)
                        }
                        </div></div></li>

                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Memoria descriptiva</div><div className='col-6 text-end'>
                        { docu.MemoriaDescriptivaV != undefined ?
                          (<button type='button' onClick={() => {downloadFrom(docu.MemoriaDescriptivaV.url, "memoria descriptiva")}} className='btn btn-primary' >Descargar</button>) : 
                          (<button className='btn btn-danger' disabled >Pendiente</button>)
                        }
                        </div></div></li>

                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Plano arquitectónico</div><div className='col-6 text-end'>
                        { docu.PlanoArqV != undefined ?
                          (<button type='button' onClick={() => {downloadFrom(docu.PlanoArqV.url, "plano arquitectonico")}} className='btn btn-primary' >Descargar</button>) : 
                          (<button className='btn btn-danger' disabled >Pendiente</button>)
                        }
                        </div></div></li>

                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Estudio de habitabilidad</div><div className='col-6 text-end'>
                        { docu.HabitabilidadV != undefined ?
                          (<button type='button' onClick={() => {downloadFrom(docu.HabitabilidadV.url, "habitabilidad")}} className='btn btn-primary' >Descargar</button>) : 
                          (<button className='btn btn-danger' disabled >Pendiente</button>)
                        }
                        </div></div></li>

                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Recibo de luz 1</div><div className='col-6 text-end'>
                        { docu.RecibosLuzV != undefined ?
                          (<button type='button' onClick={() => {downloadFrom(docu.RecibosLuzV.url, "recibo de luz")}} className='btn btn-primary' >Descargar</button>) : 
                          (<button className='btn btn-danger' disabled >Pendiente</button>)
                        }
                        </div></div></li>

                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Recibo de luz 2</div><div className='col-6 text-end'>
                        { docu.RecibosLuzV2 != undefined ?
                          (<button type='button' onClick={() => {downloadFrom(docu.RecibosLuzV2.url, "recibo de luz2")}} className='btn btn-primary' >Descargar</button>) : 
                          (<button className='btn btn-danger' disabled >Pendiente</button>)
                        }
                        </div></div></li>

                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Recibo de luz 3</div><div className='col-6 text-end'>
                        { docu.RecibosLuzV3 != undefined ?
                          (<button type='button' onClick={() => {downloadFrom(docu.RecibosLuzV3.url, "recibo de luz3")}} className='btn btn-primary' >Descargar</button>) : 
                          (<button className='btn btn-danger' disabled >Pendiente</button>)
                        }
                        </div></div></li>

                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de matrimonio del vendedor</div><div className='col-6 text-end'>
                        { docu.ActaMatrimonioVendedor != undefined ?
                          (<button type='button' onClick={() => {downloadFrom(docu.ActaMatrimonioVendedor.url, "acta matrimonio vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                          (<button className='btn btn-danger' disabled >Pendiente</button>)
                        }
                        </div></div></li>

                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>INE del conyuge del vendedor</div><div className='col-6 text-end'>
                        { docu.IneConyugeVendedor != undefined ?
                          (<button type='button' onClick={() => {downloadFrom(docu.IneConyugeVendedor.url, "INE del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                          (<button className='btn btn-danger' disabled >Pendiente</button>)
                        }
                        </div></div></li>

                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>RFC del conyuge del vendedor</div><div className='col-6 text-end'>
                        { docu.RfcConyugeVendedor != undefined ?
                          (<button type='button' onClick={() => {downloadFrom(docu.RfcConyugeVendedor.url, "RFC del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                          (<button className='btn btn-danger' disabled >Pendiente</button>)
                        }
                        </div></div></li>

                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>Acta de nacimiento del conyuge del vendedor</div><div className='col-6 text-end'>
                        { docu.ActNacConyugeVendedor != undefined ?
                          (<button type='button' onClick={() => {downloadFrom(docu.ActNacConyugeVendedor.url, "acta de nacimiento del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
                          (<button className='btn btn-danger' disabled >Pendiente</button>)
                        }
                        </div></div></li>

                        <li className="list-group-item"><div className='row align-items-center'><div className='col-6 text-start'>CURP del conyuge del vendedor</div><div className='col-6 text-end'>
                        { docu.CURPConyugeVendedor != undefined ?
                          (<button type='button' onClick={() => {downloadFrom(docu.CURPConyugeVendedor.url, "CURP del conyuge del vendedor")}} className='btn btn-primary' >Descargar</button>) : 
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

          { menu == "subirDocus"  && docu.status != 'BAJA' ?
            (
              <>
                { contadoSoltero == true ? (
                  <ContadoSoltero
                    id={docu.id}
                    currentUser={currentName} 
                />
                ) : (<></>)
                }
                { contadoCasadoBS == true ? (
                  <ContadoCasadoBS
                    id={docu.id}
                    currentUser={currentName} 
                />
                ) : (<></>)
                }
                { contadoCasadoBM == true ? (
                  <ContadoCasadoBM
                    id={docu.id}
                    currentUser={currentName} 
                />
                ) : (<></>)
                }
                { bancoSoltero == true ? (
                  <BANCOSoltero
                    id={docu.id}
                    currentUser={currentName} 
                />
                ) : (<></>)
                }
                { bancoCasado == true ? (
                  <BANCOCasado
                    id={docu.id}
                    currentUser={currentName} 
                />
                ) : (<></>)
                }
                { fovisssteSoltero == true ? (
                  <FOVISSSTESoltero
                    id={docu.id}
                    currentUser={currentName} 
                />
                ) : (<></>)
                }
                { fovisssteCasadoBS == true ? (
                  <FOVISSSTECasadoBS
                    id={docu.id}
                    currentUser={currentName} 
                />
                ) : (<></>)
                }
                { fovisssteCasadoBM == true ? (
                  <FOVISSSTECasadoBM
                    id={docu.id}
                    currentUser={currentName} 
                />
                ) : (<></>)
                }
                { ipejalSoltero == true ? (
                  <IPEJALSoltero
                    id={docu.id}
                    currentUser={currentName} 
                />
                ) : (<></>)
                }
                { ipejalCasadoBS == true ? (
                  <IPEJALCasadoBS
                    id={docu.id}
                    currentUser={currentName} 
                />
                ) : (<></>)
                }
                { ipejalCasadoBM == true ? (
                  <IPEJALCasadoBM
                    id={docu.id}
                    currentUser={currentName} 
                />
                ) : (<></>)
                }
                { infonavitSoltero == true ? (
                  <INFONAVITSoltero
                    id={docu.id}
                    currentUser={currentName} 
                />
                ) : (<></>)
                }
                { infonavitCasadoBS == true ? (
                  <INFONAVITCasadoBS
                    id={docu.id}
                    currentUser={currentName} 
                />
                ) : (<></>)
                }
                { infonavitCasadoBM == true ? (
                  <INFONAVITCasadoBM
                    id={docu.id}
                    currentUser={currentName} 
                />
                ) : (<></>)
                }
                { docu.regimen_patrimonial == 'INFONAVIT-unamos-creditos' && docu.n_creditos == '2' ? (
                  <INFONAVITUnamosCreditos2 
                    id={docu.id}
                    currentUser={currentName} 
                    civil={docu.civil}
                    regimen_patrimonial={docu.regimen_patrimonial}
                    civil2={docu.civil2 == undefined || docu.civil2 == null ? ('') : (docu.civil2)}
                    regimen_patrimonial2={docu.regimen_patrimonial2 == undefined || docu.regimen_patrimonial2 == null ? ('') : (docu.regimen_patrimonial2)}
                  />
                ) : (<></>)
                }
                { docu.regimen_patrimonial == 'INFONAVIT-unamos-creditos' && docu.n_creditos == '3' ? (
                  <INFONAVITUnamosCreditos3 
                    id={docu.id}
                    currentUser={currentName}
                    civil={docu.civil}
                    regimen_patrimonial={docu.regimen_patrimonial}
                    civil2={docu.civil2 == undefined || docu.civil2 == null ? ('') : (docu.civil2)}
                    regimen_patrimonial2={docu.regimen_patrimonial2 == undefined || docu.regimen_patrimonial2 == null ? ('') : (docu.regimen_patrimonial2)}
                    civil3={docu.civil3 == undefined || docu.civil3 == null ? ('') : (docu.civil3)}
                    regimen_patrimonial3={docu.regimen_patrimonial3 == undefined || docu.regimen_patrimonial3 == null ? ('') : (docu.regimen_patrimonial3)}
                  />
                ) : (<></>)
                }
                { docu.regimen_patrimonial == 'INFONAVIT-unamos-creditos' && docu.n_creditos == '4' ? (
                  <INFONAVITUnamosCreditos4
                    id={docu.id}
                    currentUser={currentName} 
                    civil={docu.civil}
                    regimen_patrimonial={docu.regimen_patrimonial}
                    civil2={docu.civil2 == undefined || docu.civil2 == null ? ('') : (docu.civil2)}
                    regimen_patrimonial2={docu.regimen_patrimonial2 == undefined || docu.regimen_patrimonial2 == null ? ('') : (docu.regimen_patrimonial2)}
                    civil3={docu.civil3 == undefined || docu.civil3 == null ? ('') : (docu.civil3)}
                    regimen_patrimonial3={docu.regimen_patrimonial3 == undefined || docu.regimen_patrimonial3 == null ? ('') : (docu.regimen_patrimonial3)}
                    civil4={docu.civil4 == undefined || docu.civil4 == null ? ('') : (docu.civil4)}
                    regimen_patrimonial4={docu.regimen_patrimonial4 == undefined || docu.regimen_patrimonial4 == null ? ('') : (docu.regimen_patrimonial4)}
                  />
                ) : (<></>)
                }
              </>

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
            <Image className="img-fluid" alt='engrane' src={engrane} width={350} height={210} />
            <p>Loading...</p>
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