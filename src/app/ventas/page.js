'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import signoutfirebase from '@/firebase/auth/signoutfirebase'
import logo from "../../../public/ArquimaA.png"
import logo2 from "../../../public/ArquimaLogo.png"
import { collection, doc, setDoc, Timestamp, query, where, updateDoc ,getDoc, getDocs, QuerySnapshot } from "firebase/firestore";
import { compras } from '../../tiposCompras'
import { statusOpciones } from '@/tiposStatus'
import { db } from '@/firebase/config'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import cellEditFactory, { type } from 'react-bootstrap-table2-editor'
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter'
import ModalG from '@/components/ModalG'
import { currencyMXN } from '@/formatCurrencyExample'
import Docesquema from '@/components/DocEsquema'
import engrane from '../../../public/engranes.gif'
import { getAuth, updatePassword } from 'firebase/auth'


export default function Ventas() {
  const [menu, setMenu] = useState('clientes')
  const { user, currentRol, currentName } = useAuthContext()
  const router = useRouter()
  const [show, setShow] = useState(false)
  const [messagem, setMessagem] = useState('')
  const [update, setUpdate] = useState(false)
  const [token, setToken] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const [nombre, setNombre] = useState('')
  const [nombre2, setNombre2] = useState('')
  const [nombre3, setNombre3] = useState('')
  const [nombre4, setNombre4] = useState('')

  const [email, setEmail] = useState('')
  const [email2, setEmail2] = useState('')
  const [email3, setEmail3] = useState('')
  const [email4, setEmail4] = useState('')

  const [cel, setCel] = useState('')
  const [cel2, setCel2] = useState('')
  const [cel3, setCel3] = useState('')
  const [cel4, setCel4] = useState('')

  const [NSS, setNSS] = useState('')
  const [NSS2, setNSS2] = useState('')
  const [NSS3, setNSS3] = useState('')
  const [NSS4, setNSS4] = useState('')

  const [pago, setPago] = useState('')
  const [folio, setFolio] = useState('')

  const [propiedadID, setPropiedadID] = useState("")

  const [compra, setCompra] = useState('')

  const [tipoDocEsquema, setTipoDocEsquema] = useState('')
  const [docEsquema, setDocEsquema] = useState('')

  const [civil, setCivil] = useState('SOLTERO')
  const [civil2, setCivil2] = useState('SOLTERO')
  const [civil3, setCivil3] = useState('SOLTERO')
  const [civil4, setCivil4] = useState('SOLTERO')

  const [tipoMatrimonio, setTipoMatrimonio] = useState('NA')
  const [tipoMatrimonio2, setTipoMatrimonio2] = useState('NA')
  const [tipoMatrimonio3, setTipoMatrimonio3] = useState('NA')
  const [tipoMatrimonio4, setTipoMatrimonio4] = useState('NA')

  const [propiedadesL, setPropiedadesL] = useState(null)
  const [clientes, setClientes] = useState(null)
  const [esquemaLength, setEsquemaLength] = useState(20)

  const [apellidoP, setApellidoP] = useState('')
  const [apellidoP2, setApellidoP2] = useState('')
  const [apellidoP3, setApellidoP3] = useState('')
  const [apellidoP4, setApellidoP4] = useState('')

  const [apellidoM, setApellidoM] = useState('')
  const [apellidoM2, setApellidoM2] = useState('')
  const [apellidoM3, setApellidoM3] = useState('')
  const [apellidoM4, setApellidoM4] = useState('')
  
  const [n_creditos, setN_creditos] = useState('2')


  // Arranque inicial y con cada update para llamar a los clientes, o sino te saca del panel
  useEffect(() => {
    if (user == null) {
      router.push("/")
    } else if (currentRol !== "vendedor") {
      router.push("/user-validation")
    } else if (currentRol === "vendedor") {
      getClients();
      getProperties();
    }
  }, [user, update, currentRol])

  // Use efecto con la función getPropiedadFolio para revisar cambios en el estado y declarar el ID de la propiedad para el registro del cliente
  useEffect(() => {
    if (propiedadID == '') {
      getPropiedadFolio()
    } else {
      getPropiedadFolio()
    }
  }, [propiedadID])


  // Función para obtener el folio de la propiedad seleccionada para el registro del cliente se pone en un useEffect que siga los cambios de propiedadID
  async function getPropiedadFolio () {
    if (propiedadID != '') {
      const docRef = doc(db, "propiedades", propiedadID)
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let docu = docSnap.data()
        setFolio(docu.folio)
      }
    }
  }

  // Use efecto con el tipo de compra para el registro del cliente, este manda llamar opciones al momento de registro
  useEffect(() => {
    switch (compra) {
      case "CONTADO":
        setTipoDocEsquema("CURP_DATA")
        setEsquemaLength(18)
        break
      case "FOVISSSTE-infonavit-fovissste":
        setTipoDocEsquema("CURP_DATA")
        setEsquemaLength(18)
        break
      case "FOVISSSTE-tradicional":
        setTipoDocEsquema("CURP_DATA")
        setEsquemaLength(18)
        break
      case "FOVISSSTE-conyugal":
        setTipoDocEsquema("CURP_DATA")
        setEsquemaLength(18)
        break
      case "FOVISSSTE-para-todos":
        setTipoDocEsquema("CURP_DATA")
        setEsquemaLength(18)
        break
      case "INFONAVIT-tradicional":
        setTipoDocEsquema("NSS")
        setEsquemaLength(11)
        break
      case "INFONAVIT-unamos-creditos":
        setTipoDocEsquema("NSS")
        setEsquemaLength(11)
        break
      case "INFONAVIT-conyugal":
        setTipoDocEsquema("NSS")
        setEsquemaLength(11)
        break
      case "INFONAVIT-infonavit-fovissste":
        setTipoDocEsquema("NSS")
        setEsquemaLength(11)
        break
      case "INFONAVIT-crediterreno":
        setTipoDocEsquema("NSS")
        setEsquemaLength(11)
        break
      case "INFONAVIT-segundo-credito":
        setTipoDocEsquema("NSS")
        setEsquemaLength(11)
        break
      case "INFONAVIT-cofinavit":
        setTipoDocEsquema("NSS")
        setEsquemaLength(11)
        break
      case "IPEJAL-tradicional":
        setTipoDocEsquema("N_Afiliado")
        break
      case "IPEJAL-terreno":
        setTipoDocEsquema("N_Afiliado")
        break
      case "IPEJAL-conyugal":
        setTipoDocEsquema("N_Afiliado")
        break
      case "BANCARIO / caja popular -terreno":
        setTipoDocEsquema("CURP_DATA")
        setEsquemaLength(18)
        break
      case "BANCARIO / caja popular -casa":
        setTipoDocEsquema("CURP_DATA")
        setEsquemaLength(18)
        break
      default:
        break
    }
  }, [compra])

  // función para cambiar contraseña
  const passwordChange = async () => {
    if (token != 'arquima') {
      return
    }
    const auth = getAuth()
    const user = auth.currentUser;
    await updatePassword(user, newPassword)
    setMessagem("Contraseña cambiada correctamente")
    handleShow()
  }

  // Función para obtener a los clientes
  async function getClients() {
    const q = query(collection(db, "clientes"), where("asesorID", "==", user.uid));
    const querysnapshot = await getDocs(q);
    const docSnapshots = []
    querysnapshot.forEach((doc) => {
      docSnapshots.push(doc.data())
    });
    setClientes(docSnapshots)
  }

  // Función para obtener las propiedades libres
  async function getProperties() {
    const q = query(collection(db, "propiedades"), where("status", "==", "LIBRE"));
    const querysnapshot = await getDocs(q);
    const docsPropsLibres = []
    await querysnapshot.forEach((doc) => {
      docsPropsLibres.push(doc.data())
    })
    let data = await docsPropsLibres.sort(function(a, b) {
      let fa = a.folio.toString().toUpperCase()
      let fb = b.folio.toString().toUpperCase()
      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    })
    setPropiedadesL(data)
  }

  // Función para registrar clientes
  async function registerClient () {
    if (compra === "INFONAVIT-unamos-creditos" && n_creditos == '2') {
      try {
        const data = {
          nombre: nombre,
          apellidoP: apellidoP,
          apellidoM: apellidoM,
          email: email,
          cel: cel,
          pago: currencyMXN(pago),
          status: "ARMADO DE EXPEDIENTE",
          esquema: compra,
          [tipoDocEsquema]: docEsquema,
          civil: civil,
          regimen_patrimonial: tipoMatrimonio,
          nombre2: nombre2,
          apellidoP2: apellidoP2,
          apellidoM2: apellidoM2,
          email2: email2,
          cel2: cel2,
          civil2: civil2,
          regimen_patrimonial2: tipoMatrimonio2,
          n_creditos: n_creditos,
          folio: folio,
          propiedadID: propiedadID,
          asesor: currentName,
          asesorID: user.uid,
          terminos: false,
          fecha_entrega: "TBD",
          historial: [
            {
              registrado: currentName,
              fecha: Timestamp.fromDate(new Date()),
              comentario: "Registrado como cliente"
            }
          ]
        }
        const usersRef = collection(db, "clientes")
        const userRef = new doc(usersRef)
        const id = userRef.id
        const userData = {id: id, ...data}
        const docRef = await setDoc(userRef, userData);
  
        const Ref = doc(db, 'propiedades', propiedadID)
        await updateDoc(Ref, {
          status: "ARMADO DE EXPEDIENTE",
          status_interno: "ARMADO DE EXPEDIENTE",
          asesor: currentName,
          nombre: nombre,
          esquema: compra
        })
  
        setMessagem("Registro exitoso") //poner un modal bonito para indicar que el registro fue exitoso!
        handleShow()
        setUpdate(!update)
        setMenu('clientes')
      } catch (e) {
        setMessagem(e)
        handleShow()
      }

    } else if (compra === "INFONAVIT-unamos-creditos" && n_creditos == '3') {
      try {
        const data = {
          nombre: nombre,
          apellidoP: apellidoP,
          apellidoM: apellidoM,
          email: email,
          cel: cel,
          pago: currencyMXN(pago),
          status: "ARMADO DE EXPEDIENTE",
          esquema: compra,
          [tipoDocEsquema]: docEsquema,
          civil: civil,
          regimen_patrimonial: tipoMatrimonio,
          nombre2: nombre2,
          apellidoP2: apellidoP2,
          apellidoM2: apellidoM2,
          email2: email2,
          cel2: cel2,
          civil2: civil2,
          regimen_patrimonial2: tipoMatrimonio2,
          nombre3: nombre3,
          apellidoP3: apellidoP3,
          apellidoM3: apellidoM3,
          email3: email3,
          cel3: cel3,
          civil3: civil3,
          regimen_patrimonial3: tipoMatrimonio3,
          n_creditos: n_creditos,
          folio: folio,
          propiedadID: propiedadID,
          asesor: currentName,
          asesorID: user.uid,
          terminos: false,
          fecha_entrega: "TBD",
          historial: [
            {
              registrado: currentName,
              fecha: Timestamp.fromDate(new Date()),
              comentario: "Registrado como cliente"
            }
          ]
        }
        const usersRef = collection(db, "clientes")
        const userRef = new doc(usersRef)
        const id = userRef.id
        const userData = {id: id, ...data}
        const docRef = await setDoc(userRef, userData);
  
        const Ref = doc(db, 'propiedades', propiedadID)
        await updateDoc(Ref, {
          status: "ARMADO DE EXPEDIENTE",
          status_interno: "ARMADO DE EXPEDIENTE",
          asesor: currentName,
          nombre: nombre,
          esquema: compra
        })
  
        setMessagem("Registro exitoso") //poner un modal bonito para indicar que el registro fue exitoso!
        handleShow()
        setUpdate(!update)
        setMenu('clientes')
      } catch (e) {
        setMessagem(e)
        handleShow()
      }

    } else if (compra === "INFONAVIT-unamos-creditos" && n_creditos == '4') {
      try {
        const data = {
          nombre: nombre,
          apellidoP: apellidoP,
          apellidoM: apellidoM,
          email: email,
          cel: cel,
          pago: currencyMXN(pago),
          status: "ARMADO DE EXPEDIENTE",
          esquema: compra,
          [tipoDocEsquema]: docEsquema,
          civil: civil,
          regimen_patrimonial: tipoMatrimonio,
          nombre2: nombre2,
          apellidoP2: apellidoP2,
          apellidoM2: apellidoM2,
          email2: email2,
          cel2: cel2,
          civil2: civil2,
          regimen_patrimonial2: tipoMatrimonio2,
          nombre3: nombre3,
          apellidoP3: apellidoP3,
          apellidoM3: apellidoM3,
          email3: email3,
          cel3: cel3,
          civil3: civil3,
          regimen_patrimonial3: tipoMatrimonio3,
          nombre4: nombre4,
          apellidoP4: apellidoP4,
          apellidoM4: apellidoM4,
          email4: email4,
          cel4: cel4,
          civil4: civil4,
          regimen_patrimonial4: tipoMatrimonio4,
          n_creditos: n_creditos,
          folio: folio,
          propiedadID: propiedadID,
          asesor: currentName,
          asesorID: user.uid,
          terminos: false,
          fecha_entrega: "TBD",
          historial: [
            {
              registrado: currentName,
              fecha: Timestamp.fromDate(new Date()),
              comentario: "Registrado como cliente"
            }
          ]
        }
        const usersRef = collection(db, "clientes")
        const userRef = new doc(usersRef)
        const id = userRef.id
        const userData = {id: id, ...data}
        const docRef = await setDoc(userRef, userData);
  
        const Ref = doc(db, 'propiedades', propiedadID)
        await updateDoc(Ref, {
          status: "ARMADO DE EXPEDIENTE",
          status_interno: "ARMADO DE EXPEDIENTE",
          asesor: currentName,
          nombre: nombre,
          esquema: compra
        })
  
        setMessagem("Registro exitoso") //poner un modal bonito para indicar que el registro fue exitoso!
        handleShow()
        setUpdate(!update)
        setMenu('clientes')
      } catch (e) {
        setMessagem(e)
        handleShow()
      }

    } else if (compra !== "INFONAVIT-unamos-creditos") {

      try {
        const data = {
          nombre: nombre,
          apellidoP: apellidoP,
          apellidoM: apellidoM,
          email: email,
          cel: cel,
          pago: currencyMXN(pago),
          status: "ARMADO DE EXPEDIENTE",
          esquema: compra,
          [tipoDocEsquema]: docEsquema,
          civil: civil,
          regimen_patrimonial: tipoMatrimonio,
          folio: folio,
          propiedadID: propiedadID,
          asesor: currentName,
          asesorID: user.uid,
          terminos: false,
          fecha_entrega: "TBD",
          historial: [
            {
              registrado: currentName,
              fecha: Timestamp.fromDate(new Date()),
              comentario: "Registrado como cliente"
            }
          ]
        }
        const usersRef = collection(db, "clientes")
        const userRef = new doc(usersRef)
        const id = userRef.id
        const userData = {id: id, ...data}
        const docRef = await setDoc(userRef, userData);
  
        const Ref = doc(db, 'propiedades', propiedadID)
        await updateDoc(Ref, {
          status: "ARMADO DE EXPEDIENTE",
          status_interno: "ARMADO DE EXPEDIENTE",
          asesor: currentName,
          nombre: nombre,
          esquema: compra
        })
  
        setMessagem("Registro exitoso") //poner un modal bonito para indicar que el registro fue exitoso!
        handleShow()
        setUpdate(!update)
        setMenu('clientes')
      } catch (e) {
        setMessagem(e)
        handleShow()
      }

    }
    
  }

  const columns2 = [
    {
      dataField: "folio",
      text: "Folio",
      sort: true,
      filter: textFilter()
    },
    {
      dataField: "nombre",
      text: "Nombre",
      sort: true,
      editable: false,
      filter: textFilter()
    },
    {
      dataField: "esquema",
      text: "Esquema",
      sort: true,
      filter: textFilter()
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      filter: textFilter()
      /*validator: (newValue, row, column) => {
        if (isNaN(newValue)) {
          return {
            valid: false,
            message: "Please enter numeric value",
          };
        }
        return true;
      },*/
    },
    {
      dataField: "cel",
      text: "Cel",
      sort: true,
      filter: textFilter()
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
      filter: textFilter()
    },
    {
      dataField: "propiedadID",
      text: "IDpropiedad",
      sort: true,
      filter: textFilter()
    }
  ]

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const rowEventClient = {
    onDoubleClick: (e, row, rowIndex) => {
      router.push(`/ventas/cliente/${row.id}`)
    }
  };

  return (
    <>
      <ModalG
        onClick={handleClose}
        show={show}
        onHide={handleClose}
        message={messagem}
        button={"aceptar"} 
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
            <button type="button" className="btn btn-secondary ms-3" onClick={signoutfirebase} >Log Out</button>
            
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div className="offcanvas-header">
                    <Image alt="logo" src={logo2} width={150} height={60} />
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                      <li className="nav-item">
                          <Link href=""><button type='button' onClick={() => setMenu('registrarC')} className="btn" data-bs-dismiss="offcanvas" >Registrar Clientes</button></Link>
                      </li>
                      <li className="nav-item">
                        <Link href=""><button type="button" onClick={() => setMenu('clientes')} className="btn" data-bs-dismiss="offcanvas" >Lista de clientes</button></Link>
                      </li>
                      <li className="nav-item">
                        <Link href=""><button type="button" onClick={() => setMenu('password')} className="btn" data-bs-dismiss="offcanvas" >Cambiar contraseña</button></Link>
                      </li>
                      <li className="nav-item" >
                        
                      </li>
                    </ul>
                    
                </div>
            </div>
        </div>
      </nav>
      <div className='container-fluid text-center'>
        {menu == "registrarC" ? 
        (
          <div className='row justify-content-center text-center'>
          
            <div className='col-md-6 col-12 mt-4'>
              
              <Image className='img-fluid' alt='logo' src={logo2} width={450} height={360} />
              <h3 className="my-3">Registro de Cliente</h3>
              <form className="form">
                  {/* revisar si está igual en dashboard, admin y ventas */}
                  <div className="mb-3 mx-5">
                    <label htmlFor="nombre" className="form-label">Nombre(s)</label>
                    <input required type="text" onChange={(e) => setNombre(e.target.value.toUpperCase())} value={nombre} name='nombre' className="form-control" id="nombre" placeholder="Nombre(s)" />
                  </div>

                  <div className="mb-3 mx-5">
                    <label htmlFor="apellidoP" className="form-label">Apellido Paterno</label>
                    <input required type="text" onChange={(e) => setApellidoP(e.target.value.toUpperCase())} value={apellidoP} name='apellidoP' className="form-control" id="apellidoP" placeholder="Apellido Paterno" />
                  </div>

                  <div className="mb-3 mx-5">
                    <label htmlFor="apellidoM" className="form-label">Apellido Materno</label>
                    <input required type="text" onChange={(e) => setApellidoM(e.target.value.toUpperCase())} value={apellidoM} name='apellidoM' className="form-control" id="apellidoM" placeholder="Apellido Materno" />
                  </div>
                  
                  <div className="mb-3 mx-5">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input required type="email" onChange={(e) => setEmail(e.target.value)} value={email} name='email' className="form-control" id="email" placeholder="name@example.com" />
                  </div>

                  <div className="mb-3 mx-5">
                    <label htmlFor="cel" className="form-label">Celular - 10 digitos</label>
                    <input required type="text" maxLength={10} onChange={(e) => setCel(e.target.value)} value={cel} name='cel' className="form-control" id="cel" placeholder="Celular: 3312345678" />
                  </div>

                  <div className="mb-3 mx-5">
                    <label htmlFor="pago" className="form-label">Pago inicial</label>
                    <input required type="text" onChange={(e) => setPago(e.target.value)} value={pago} name='pago' className="form-control" id="pago" placeholder="5000" />
                  </div>
                  
                  <div className='mb-3 mx-5'>
                    <p>Selecciona el Folio de la propiedad</p>
                    <select className="form-select" onChange={(e) => { propiedadID == '' ? (setPropiedadID(e.target.value)):(setPropiedadID(e.target.value))}} aria-label="Default select example">
                      <option value="" >Folio</option>
                      {propiedadesL.map((fol) => {
                        return (
                          <option key={fol.id} value={fol.id}>{fol.folio}</option>
                        )
                      })}
                    </select>
                  </div>

                  <div className='mb-3 mx-5'> 
                    <p>Elige el esquema: </p>
                    <select className="form-select" onChange={(e) => setCompra(e.target.value)}  aria-label="Default select example">
                      <option value="">Tipo de Trámite</option>
                      {compras.map(( comp, i) => {
                        return (
                          <option key={i} value={comp}>{comp}</option>
                        )
                      })}
                    </select>
                  </div>

                  { compra != "INFONAVIT-unamos-creditos" ? (<></>) : (
                    <>
                      <div className='mb-3 mx-5'> 
                        <p>Número de clientes que uniran el crédito: </p>
                        <select className="form-select" onChange={(e) => setN_creditos(e.target.value)}  aria-label="Default select example">
                          <option value="2" selected >Selecciona una opción</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                      <div className="mb-3 mx-5">
                        <label htmlFor="NSS" className="form-label">NSS del primer cliente registrado anteriormente: </label>
                        <input maxLength={11} required type="text" onChange={(e) => setNSS(e.target.value)} value={NSS} name='NSS1' className="form-control" id="NSS1" placeholder="NSS" />
                      </div>
                      <div className='mb-3 mx-5'> 
                        <p>Estado Civil del primer cliente: </p>
                        <select className="form-select" onChange={(e) => setCivil(e.target.value)}  aria-label="Default select example">
                          <option value="">Selecciona una opción</option>
                          <option value="SOLTERO">SOLTERO</option>
                          <option value="CASADO">CASADO</option>
                        </select>
                      </div>
                      { civil !='SOLTERO' ? (
                        <div className='mb-3 mx-5'> 
                          <p>Régimen Patrimonial del primer cliente: </p>
                          <select className="form-select" onChange={(e) => setTipoMatrimonio(e.target.value)}  aria-label="Default select example">
                            <option value="">Selecciona una opción</option>
                            <option value="SOCIEDAD LEGAL / MANCOMUNADO">Sociedad legal / Mancomunado</option>
                            <option value="BIENES SEPARADOS">Bienes separados</option>
                          </select>
                        </div>
                      ) : (<></>)

                      }
                      { n_creditos == '2' ? (
                        <>
                         <div className="mb-3 mx-5">
                            <label htmlFor="nombre2" className="form-label">Nombre(s) segundo cliente: </label>
                            <input required type="text" onChange={(e) => setNombre2(e.target.value.toUpperCase())} value={nombre2} name='nombre2' className="form-control" id="nombre2" placeholder="Nombre(s)" />
                          </div>
        
                          <div className="mb-3 mx-5">
                            <label htmlFor="apellidoP2" className="form-label">Apellido Paterno segundo cliente: </label>
                            <input required type="text" onChange={(e) => setApellidoP2(e.target.value.toUpperCase())} value={apellidoP2} name='apellidoP2' className="form-control" id="apellidoP2" placeholder="Apellido Paterno" />
                          </div>
        
                          <div className="mb-3 mx-5">
                            <label htmlFor="apellidoM2" className="form-label">Apellido Materno segundo cliente: </label>
                            <input required type="text" onChange={(e) => setApellidoM2(e.target.value.toUpperCase())} value={apellidoM2} name='apellidoM2' className="form-control" id="apellidoM2" placeholder="Apellido Materno" />
                          </div>
                          
                          <div className="mb-3 mx-5">
                            <label htmlFor="email2" className="form-label">Email segundo cliente: </label>
                            <input required type="email" onChange={(e) => setEmail2(e.target.value)} value={email2} name='email2' className="form-control" id="email2" placeholder="name@example.com" />
                          </div>
        
                          <div className="mb-3 mx-5">
                            <label htmlFor="cel2" className="form-label">Celular - 10 digitos segundo cliente: </label>
                            <input required type="text" maxLength={10} onChange={(e) => setCel2(e.target.value)} value={cel2} name='cel2' className="form-control" id="cel2" placeholder="Celular: 3312345678" />
                          </div>

                          <div className="mb-3 mx-5">
                            <label htmlFor="NSS2" className="form-label">NSS del segundo cliente: </label>
                            <input maxLength={11} required type="text" onChange={(e) => setNSS2(e.target.value)} value={NSS2} name='NSS2' className="form-control" id="NSS2" placeholder="NSS" />
                          </div>
                          <div className='mb-3 mx-5'> 
                            <p>Estado Civil del segundo cliente: </p>
                            <select className="form-select" onChange={(e) => setCivil2(e.target.value)}  aria-label="Default select example">
                              <option value="">Selecciona una opción</option>
                              <option value="SOLTERO">SOLTERO</option>
                              <option value="CASADO">CASADO</option>
                            </select>
                          </div>
                          { civil2 !='SOLTERO' ? (
                            <div className='mb-3 mx-5'> 
                              <p>Régimen Patrimonial del segundo cliente: </p>
                              <select className="form-select" onChange={(e) => setTipoMatrimonio2(e.target.value)}  aria-label="Default select example">
                                <option value="">Selecciona una opción</option>
                                <option value="SOCIEDAD LEGAL / MANCOMUNADO">Sociedad legal / Mancomunado</option>
                                <option value="BIENES SEPARADOS">Bienes separados</option>
                              </select>
                            </div>
                          ) : (<></>)
                          }

                        </>
                      ) : (<></>)

                      }
                      { n_creditos == '3' ? (
                        <>
                         <div className="mb-3 mx-5">
                            <label htmlFor="nombre2" className="form-label">Nombre(s) segundo cliente: </label>
                            <input required type="text" onChange={(e) => setNombre2(e.target.value.toUpperCase())} value={nombre2} name='nombre2' className="form-control" id="nombre2" placeholder="Nombre(s)" />
                          </div>
        
                          <div className="mb-3 mx-5">
                            <label htmlFor="apellidoP2" className="form-label">Apellido Paterno segundo cliente: </label>
                            <input required type="text" onChange={(e) => setApellidoP2(e.target.value.toUpperCase())} value={apellidoP2} name='apellidoP2' className="form-control" id="apellidoP2" placeholder="Apellido Paterno" />
                          </div>
        
                          <div className="mb-3 mx-5">
                            <label htmlFor="apellidoM2" className="form-label">Apellido Materno segundo cliente: </label>
                            <input required type="text" onChange={(e) => setApellidoM2(e.target.value.toUpperCase())} value={apellidoM2} name='apellidoM2' className="form-control" id="apellidoM2" placeholder="Apellido Materno" />
                          </div>
                          
                          <div className="mb-3 mx-5">
                            <label htmlFor="email2" className="form-label">Email segundo cliente: </label>
                            <input required type="email" onChange={(e) => setEmail2(e.target.value)} value={email2} name='email2' className="form-control" id="email2" placeholder="name@example.com" />
                          </div>
        
                          <div className="mb-3 mx-5">
                            <label htmlFor="cel2" className="form-label">Celular - 10 digitos segundo cliente: </label>
                            <input required type="text" maxLength={10} onChange={(e) => setCel2(e.target.value)} value={cel2} name='cel2' className="form-control" id="cel2" placeholder="Celular: 3312345678" />
                          </div>

                          <div className="mb-3 mx-5">
                            <label htmlFor="NSS2" className="form-label">NSS del segundo cliente: </label>
                            <input maxLength={11} required type="text" onChange={(e) => setNSS2(e.target.value)} value={NSS2} name='NSS2' className="form-control" id="NSS2" placeholder="NSS" />
                          </div>
                          <div className='mb-3 mx-5'> 
                            <p>Estado Civil del segundo cliente: </p>
                            <select className="form-select" onChange={(e) => setCivil2(e.target.value)}  aria-label="Default select example">
                              <option value="">Selecciona una opción</option>
                              <option value="SOLTERO">SOLTERO</option>
                              <option value="CASADO">CASADO</option>
                            </select>
                          </div>
                          { civil2 !='SOLTERO' ? (
                            <div className='mb-3 mx-5'> 
                              <p>Régimen Patrimonial del segundo cliente: </p>
                              <select className="form-select" onChange={(e) => setTipoMatrimonio2(e.target.value)}  aria-label="Default select example">
                                <option value="">Selecciona una opción</option>
                                <option value="SOCIEDAD LEGAL / MANCOMUNADO">Sociedad legal / Mancomunado</option>
                                <option value="BIENES SEPARADOS">Bienes separados</option>
                              </select>
                            </div>
                          ) : (<></>)
                          }
                          <div className="mb-3 mx-5">
                            <label htmlFor="nombre3" className="form-label">Nombre(s) tercer cliente: </label>
                            <input required type="text" onChange={(e) => setNombre3(e.target.value.toUpperCase())} value={nombre3} name='nombre3' className="form-control" id="nombre3" placeholder="Nombre(s)" />
                          </div>
        
                          <div className="mb-3 mx-5">
                            <label htmlFor="apellidoP3" className="form-label">Apellido Paterno tercer cliente: </label>
                            <input required type="text" onChange={(e) => setApellidoP3(e.target.value.toUpperCase())} value={apellidoP3} name='apellidoP3' className="form-control" id="apellidoP3" placeholder="Apellido Paterno" />
                          </div>
        
                          <div className="mb-3 mx-5">
                            <label htmlFor="apellidoM3" className="form-label">Apellido Materno tercer cliente: </label>
                            <input required type="text" onChange={(e) => setApellidoM3(e.target.value.toUpperCase())} value={apellidoM3} name='apellidoM3' className="form-control" id="apellidoM3" placeholder="Apellido Materno" />
                          </div>
                          
                          <div className="mb-3 mx-5">
                            <label htmlFor="email3" className="form-label">Email tercer cliente: </label>
                            <input required type="email" onChange={(e) => setEmail3(e.target.value)} value={email3} name='email3' className="form-control" id="email3" placeholder="name@example.com" />
                          </div>
        
                          <div className="mb-3 mx-5">
                            <label htmlFor="cel3" className="form-label">Celular - 10 digitos tercer cliente: </label>
                            <input required type="text" maxLength={10} onChange={(e) => setCel3(e.target.value)} value={cel3} name='cel3' className="form-control" id="cel3" placeholder="Celular: 3312345678" />
                          </div>

                          <div className="mb-3 mx-5">
                            <label htmlFor="NSS3" className="form-label">NSS del tercer cliente: </label>
                            <input maxLength={11} required type="text" onChange={(e) => setNSS3(e.target.value)} value={NSS3} name='NSS3' className="form-control" id="NSS3" placeholder="NSS" />
                          </div>
                          <div className='mb-3 mx-5'> 
                            <p>Estado Civil del tercer cliente: </p>
                            <select className="form-select" onChange={(e) => setCivil3(e.target.value)}  aria-label="Default select example">
                              <option value="">Selecciona una opción</option>
                              <option value="SOLTERO">SOLTERO</option>
                              <option value="CASADO">CASADO</option>
                            </select>
                          </div>
                          { civil3 !='SOLTERO' ? (
                            <div className='mb-3 mx-5'> 
                              <p>Régimen Patrimonial del tercer cliente: </p>
                              <select className="form-select" onChange={(e) => setTipoMatrimonio3(e.target.value)}  aria-label="Default select example">
                                <option value="">Selecciona una opción</option>
                                <option value="SOCIEDAD LEGAL / MANCOMUNADO">Sociedad legal / Mancomunado</option>
                                <option value="BIENES SEPARADOS">Bienes separados</option>
                              </select>
                            </div>
                          ) : (<></>)
                          }

                        </>
                      ) : (<></>)

                      }
                      { n_creditos == '4' ? (
                        <>
                         <div className="mb-3 mx-5">
                            <label htmlFor="nombre2" className="form-label">Nombre(s) segundo cliente: </label>
                            <input required type="text" onChange={(e) => setNombre2(e.target.value.toUpperCase())} value={nombre2} name='nombre2' className="form-control" id="nombre2" placeholder="Nombre(s)" />
                          </div>
        
                          <div className="mb-3 mx-5">
                            <label htmlFor="apellidoP2" className="form-label">Apellido Paterno segundo cliente: </label>
                            <input required type="text" onChange={(e) => setApellidoP2(e.target.value.toUpperCase())} value={apellidoP2} name='apellidoP2' className="form-control" id="apellidoP2" placeholder="Apellido Paterno" />
                          </div>
        
                          <div className="mb-3 mx-5">
                            <label htmlFor="apellidoM2" className="form-label">Apellido Materno segundo cliente: </label>
                            <input required type="text" onChange={(e) => setApellidoM2(e.target.value.toUpperCase())} value={apellidoM2} name='apellidoM2' className="form-control" id="apellidoM2" placeholder="Apellido Materno" />
                          </div>
                          
                          <div className="mb-3 mx-5">
                            <label htmlFor="email2" className="form-label">Email segundo cliente: </label>
                            <input required type="email" onChange={(e) => setEmail2(e.target.value)} value={email2} name='email2' className="form-control" id="email2" placeholder="name@example.com" />
                          </div>
        
                          <div className="mb-3 mx-5">
                            <label htmlFor="cel2" className="form-label">Celular - 10 digitos segundo cliente: </label>
                            <input required type="text" maxLength={10} onChange={(e) => setCel2(e.target.value)} value={cel2} name='cel2' className="form-control" id="cel2" placeholder="Celular: 3312345678" />
                          </div>

                          <div className="mb-3 mx-5">
                            <label htmlFor="NSS2" className="form-label">NSS del segundo cliente: </label>
                            <input maxLength={11} required type="text" onChange={(e) => setNSS2(e.target.value)} value={NSS2} name='NSS2' className="form-control" id="NSS2" placeholder="NSS" />
                          </div>
                          <div className='mb-3 mx-5'> 
                            <p>Estado Civil del segundo cliente: </p>
                            <select className="form-select" onChange={(e) => setCivil2(e.target.value)}  aria-label="Default select example">
                              <option value="">Selecciona una opción</option>
                              <option value="SOLTERO">SOLTERO</option>
                              <option value="CASADO">CASADO</option>
                            </select>
                          </div>
                          { civil2 !='SOLTERO' ? (
                            <div className='mb-3 mx-5'> 
                              <p>Régimen Patrimonial del segundo cliente: </p>
                              <select className="form-select" onChange={(e) => setTipoMatrimonio2(e.target.value)}  aria-label="Default select example">
                                <option value="">Selecciona una opción</option>
                                <option value="SOCIEDAD LEGAL / MANCOMUNADO">Sociedad legal / Mancomunado</option>
                                <option value="BIENES SEPARADOS">Bienes separados</option>
                              </select>
                            </div>
                          ) : (<></>)
                          }
                          <div className="mb-3 mx-5">
                            <label htmlFor="nombre3" className="form-label">Nombre(s) tercer cliente: </label>
                            <input required type="text" onChange={(e) => setNombre3(e.target.value.toUpperCase())} value={nombre3} name='nombre3' className="form-control" id="nombre3" placeholder="Nombre(s)" />
                          </div>
        
                          <div className="mb-3 mx-5">
                            <label htmlFor="apellidoP3" className="form-label">Apellido Paterno tercer cliente: </label>
                            <input required type="text" onChange={(e) => setApellidoP3(e.target.value.toUpperCase())} value={apellidoP3} name='apellidoP3' className="form-control" id="apellidoP3" placeholder="Apellido Paterno" />
                          </div>
        
                          <div className="mb-3 mx-5">
                            <label htmlFor="apellidoM3" className="form-label">Apellido Materno tercer cliente: </label>
                            <input required type="text" onChange={(e) => setApellidoM3(e.target.value.toUpperCase())} value={apellidoM3} name='apellidoM3' className="form-control" id="apellidoM3" placeholder="Apellido Materno" />
                          </div>
                          
                          <div className="mb-3 mx-5">
                            <label htmlFor="email3" className="form-label">Email tercer cliente: </label>
                            <input required type="email" onChange={(e) => setEmail3(e.target.value)} value={email3} name='email3' className="form-control" id="email3" placeholder="name@example.com" />
                          </div>
        
                          <div className="mb-3 mx-5">
                            <label htmlFor="cel3" className="form-label">Celular - 10 digitos tercer cliente: </label>
                            <input required type="text" maxLength={10} onChange={(e) => setCel3(e.target.value)} value={cel3} name='cel3' className="form-control" id="cel3" placeholder="Celular: 3312345678" />
                          </div>

                          <div className="mb-3 mx-5">
                            <label htmlFor="NSS3" className="form-label">NSS del tercer cliente: </label>
                            <input maxLength={11} required type="text" onChange={(e) => setNSS3(e.target.value)} value={NSS3} name='NSS3' className="form-control" id="NSS3" placeholder="NSS" />
                          </div>
                          <div className='mb-3 mx-5'> 
                            <p>Estado Civil del tercer cliente: </p>
                            <select className="form-select" onChange={(e) => setCivil3(e.target.value)}  aria-label="Default select example">
                              <option value="">Selecciona una opción</option>
                              <option value="SOLTERO">SOLTERO</option>
                              <option value="CASADO">CASADO</option>
                            </select>
                          </div>
                          { civil3 !='SOLTERO' ? (
                            <div className='mb-3 mx-5'> 
                              <p>Régimen Patrimonial del tercer cliente: </p>
                              <select className="form-select" onChange={(e) => setTipoMatrimonio3(e.target.value)}  aria-label="Default select example">
                                <option value="">Selecciona una opción</option>
                                <option value="SOCIEDAD LEGAL / MANCOMUNADO">Sociedad legal / Mancomunado</option>
                                <option value="BIENES SEPARADOS">Bienes separados</option>
                              </select>
                            </div>
                          ) : (<></>)
                          }

                          <div className="mb-3 mx-5">
                            <label htmlFor="nombre4" className="form-label">Nombre(s) cuarto cliente: </label>
                            <input required type="text" onChange={(e) => setNombre4(e.target.value.toUpperCase())} value={nombre4} name='nombre4' className="form-control" id="nombre4" placeholder="Nombre(s)" />
                          </div>
        
                          <div className="mb-3 mx-5">
                            <label htmlFor="apellidoP4" className="form-label">Apellido Paterno cuarto cliente: </label>
                            <input required type="text" onChange={(e) => setApellidoP4(e.target.value.toUpperCase())} value={apellidoP4} name='apellidoP4' className="form-control" id="apellidoP4" placeholder="Apellido Paterno" />
                          </div>
        
                          <div className="mb-3 mx-5">
                            <label htmlFor="apellidoM4" className="form-label">Apellido Materno cuarto cliente: </label>
                            <input required type="text" onChange={(e) => setApellidoM4(e.target.value.toUpperCase())} value={apellidoM4} name='apellidoM4' className="form-control" id="apellidoM4" placeholder="Apellido Materno" />
                          </div>
                          
                          <div className="mb-3 mx-5">
                            <label htmlFor="email4" className="form-label">Email cuarto cliente: </label>
                            <input required type="email" onChange={(e) => setEmail4(e.target.value)} value={email4} name='email4' className="form-control" id="email4" placeholder="name@example.com" />
                          </div>
        
                          <div className="mb-3 mx-5">
                            <label htmlFor="cel4" className="form-label">Celular - 10 digitos cuarto cliente: </label>
                            <input required type="text" maxLength={10} onChange={(e) => setCel4(e.target.value)} value={cel4} name='cel4' className="form-control" id="cel4" placeholder="Celular: 3312345678" />
                          </div>

                          <div className="mb-3 mx-5">
                            <label htmlFor="NSS4" className="form-label">NSS del cuarto cliente: </label>
                            <input maxLength={11} required type="text" onChange={(e) => setNSS4(e.target.value)} value={NSS4} name='NSS4' className="form-control" id="NSS4" placeholder="NSS" />
                          </div>
                          <div className='mb-3 mx-5'> 
                            <p>Estado Civil del cuarto cliente: </p>
                            <select className="form-select" onChange={(e) => setCivil4(e.target.value)}  aria-label="Default select example">
                              <option value="">Selecciona una opción</option>
                              <option value="SOLTERO">SOLTERO</option>
                              <option value="CASADO">CASADO</option>
                            </select>
                          </div>
                          { civil4 !='SOLTERO' ? (
                            <div className='mb-3 mx-5'> 
                              <p>Régimen Patrimonial del cuarto cliente: </p>
                              <select className="form-select" onChange={(e) => setTipoMatrimonio4(e.target.value)}  aria-label="Default select example">
                                <option value="">Selecciona una opción</option>
                                <option value="SOCIEDAD LEGAL / MANCOMUNADO">Sociedad legal / Mancomunado</option>
                                <option value="BIENES SEPARADOS">Bienes separados</option>
                              </select>
                            </div>
                          ) : (<></>)
                          }

                        </>
                      ) : (<></>)

                      }
                    </>
                  )

                  }

                  { compra != '' && compra != "INFONAVIT-unamos-creditos" ? (
                    <>
                      <Docesquema 
                        tipo={tipoDocEsquema}
                        value={docEsquema}
                        maxLength={esquemaLength}
                        onChange={(e) => setDocEsquema(e.target.value.toUpperCase())}
                      />
                      <div className='mb-3 mx-5'> 
                        <p>Estado Civil</p>
                        <select className="form-select" onChange={(e) => setCivil(e.target.value)}  aria-label="Default select example">
                          <option value="">Selecciona una opción</option>
                          <option value="SOLTERO">SOLTERO</option>
                          <option value="CASADO">CASADO</option>
                        </select>
                      </div>
                    </>
                    
                  ) : (<></>)

                  }

                  { civil !='SOLTERO' && compra != "INFONAVIT-unamos-creditos" ? (
                    <div className='mb-3 mx-5'> 
                      <p>Régimen Patrimonial</p>
                      <select className="form-select" onChange={(e) => setTipoMatrimonio(e.target.value)}  aria-label="Default select example">
                        <option value="">Selecciona una opción</option>
                        <option value="SOCIEDAD LEGAL / MANCOMUNADO">Sociedad legal / Mancomunado</option>
                        <option value="BIENES SEPARADOS">Bienes separados</option>
                      </select>
                    </div>
                  ) : (<></>)

                  }

                  <div className='my-5'>
                    <button type="button" onClick={registerClient}  className="btn btn-secondary">Registrar</button>
                  </div>
                  
              </form>

            </div>

          </div>
        ) : 
        (
          <></>
        )
        }
        
        {menu == "clientes" ? 
        (
          <div className='m-5 p-2'>
            {
              clientes != null && clientes.length > 0 ? (
                  <BootstrapTable
                    striped
                    condensed
                    hover
                    keyField='id'
                    data={clientes}
                    columns={columns2}
                    pagination={paginationFactory()}
                    filter={filterFactory()}
                    rowEvents={rowEventClient}
                  />
                ) : (
                  <>
                    <h2>No se tienen registros...</h2>
                  </>
                )
              }
          </div>
        ) : 
        (
          <></>
        )
        }
        {menu == "password" ? 
        (
          <div className='container-sm'>

          <div className='col-md-6 col-12 align-items-center my-5'>
            <h3>Cambiar Contraseña</h3>
            <div className="mb-3">
              <label for="pass" className="form-label">Nueva contraseña:</label>
              <input type="password" onChange={(e) => setNewPassword(e.target.value)} className="form-control" id="pass" />
            </div>
            <div className="mb-3">
              <label for="token" className="form-label">Token:</label>
              <input type="password" onChange={(e) => setToken(e.target.value)} className="form-control" id="token" />
            </div>
            <button type="button" onClick={passwordChange} className="btn btn-primary">Cambiar Status Interno</button>
          </div>
          </div>
        ) : 
        (
          <></>
        )
        }
        
      </div>
    </>
  )
}
