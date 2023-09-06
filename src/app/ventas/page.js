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
  const [email, setEmail] = useState('')
  const [cel, setCel] = useState('')
  const [pago, setPago] = useState('')
  const [folio, setFolio] = useState('')

  const [propiedadID, setPropiedadID] = useState("")

  const [compra, setCompra] = useState('')

  const [tipoDocEsquema, setTipoDocEsquema] = useState('')
  const [docEsquema, setDocEsquema] = useState('')
  const [civil, setCivil] = useState('SOLTERO')
  const [tipoMatrimonio, setTipoMatrimonio] = useState('NA')

  const [propiedadesL, setPropiedadesL] = useState(null)
  const [clientes, setClientes] = useState(null)
  const [esquemaLength, setEsquemaLength] = useState(20)

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
    console.log('useEffect para obtener propiedad')
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
    console.log('useEffect de switch para designar tipo de esquema')
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
      case "INFOVANIT-tradicional":
        setTipoDocEsquema("NSS")
        setEsquemaLength(11)
        break
      case "INFOVANIT-unamos-creditos":
        setTipoDocEsquema("NSS")
        setEsquemaLength(11)
        break
      case "INFOVANIT-conyugal":
        setTipoDocEsquema("NSS")
        setEsquemaLength(11)
        break
      case "INFOVANIT-infonavit-fovissste":
        setTipoDocEsquema("NSS")
        setEsquemaLength(11)
        break
      case "INFOVANIT-crediterreno":
        setTipoDocEsquema("NSS")
        setEsquemaLength(11)
        break
      case "INFOVANIT-segundo-credito":
        setTipoDocEsquema("NSS")
        setEsquemaLength(11)
        break
      case "INFOVANIT-cofinativ":
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
      case "BANCARIO-terreno":
        setTipoDocEsquema("CURP_DATA")
        setEsquemaLength(18)
        break
      case "BANCARIO-casa":
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
      let fa = a.folio.toUpperCase()
      let fb = b.folio.toUpperCase()
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
    try {
      const data = {
        nombre: nombre,
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
                    <label htmlFor="nombre" className="form-label">Nombre completo</label>
                    <input required type="text" onChange={(e) => setNombre(e.target.value.toUpperCase())} value={nombre} name='nombre' className="form-control" id="nombre" placeholder="Nombre Completo" />
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
                  { compra != '' ? (
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

                  { civil !='SOLTERO' ? (
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
                    <Image className="img-fluid" alt='engrane' src={engrane} width={350} height={210} />
                    <p>Loading...</p>
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
            <div class="mb-3">
              <label for="pass" class="form-label">Nueva contraseña:</label>
              <input type="password" onChange={(e) => setNewPassword(e.target.value)} class="form-control" id="pass" />
            </div>
            <div class="mb-3">
              <label for="token" class="form-label">Token:</label>
              <input type="password" onChange={(e) => setToken(e.target.value)} class="form-control" id="token" />
            </div>
            <button type="button" onClick={passwordChange} class="btn btn-primary">Cambiar Status Interno</button>
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
