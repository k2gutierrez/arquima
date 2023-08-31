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
import DbUpload from '@/DbUpload'
import { currencyMXN } from '@/formatCurrencyExample'
import Docesquema from '@/components/DocEsquema'
import engrane from '../../../public/engranes.gif'
import { getAuth, updatePassword } from 'firebase/auth'


export default function Admin() {
  const [menu, setMenu] = useState('propiedades')
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
  const [asesor, setAsesor] = useState(undefined)
  const [propiedadID, setPropiedadID] = useState("")
  const [asesorID, setAsesorID] = useState("")
  const [compra, setCompra] = useState('')

  const [tipoDocEsquema, setTipoDocEsquema] = useState('')
  const [docEsquema, setDocEsquema] = useState('')
  const [civil, setCivil] = useState('SOLTERO')
  const [tipoMatrimonio, setTipoMatrimonio] = useState('NA')

  const [propiedades, setPropiedades] = useState(null)
  const [propiedadesL, setPropiedadesL] = useState(null)
  const [vendedores, setVendedores] = useState([{id: "none", nombre: "none"}])
  const [clientes, setClientes] = useState(null)

  // Arranque inicial y con cada update para llamar a los vendedores, propiedades y clientes, o sino te saca del panel
  useEffect(() => {
    if (user == null) {
      router.push("/")
    } else if (currentRol != "administrativo") {
      router.push("/user-validation")
    } else if (currentRol == "administrativo") {
      getSellers();
      getProperties();
      getClients();
    }
  }, [user, update])

  // Use efecto con la función getPropiedadFolio para revisar cambios en el estado y declarar el ID de la propiedad para el registro del cliente
  useEffect(() => {
    if (propiedadID == '') {
      getPropiedadFolio()
    } else {
      getPropiedadFolio()
    }
  }, [propiedadID])

  //
  useEffect(() => {
    if (asesorID == '') {
      getSellerName()
    } else {
      getSellerName()
    }
  }, [asesorID])


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

  // Función para obtener el nombre del Asesor de acuerdo al ID del Asesor
  async function getSellerName () {
    if (asesorID != '') {
      const docRef = doc(db, "empleados", asesorID)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        let docu = docSnap.data()
        setAsesor(docu.nombre)
      }
    }
  }

  // Use efecto con el tipo de compra para el registro del cliente, este manda llamar opciones al momento de registro
  useEffect(() => {
    switch (compra) {
      case "CONTADO":
        setTipoDocEsquema("CURP")
        break
      case "FOVISSSTE-infonavit-fovissste":
        setTipoDocEsquema("CURP")
        break
      case "FOVISSSTE-tradicional":
        setTipoDocEsquema("CURP")
        break
      case "FOVISSSTE-conyugal":
        setTipoDocEsquema("CURP")
        break
      case "FOVISSSTE-para-todos":
        setTipoDocEsquema("CURP")
        break
      case "INFOVANIT-tradicional":
        setTipoDocEsquema("NSS")
        break
      case "INFOVANIT-unamos-creditos":
        setTipoDocEsquema("NSS")
        break
      case "INFOVANIT-conyugal":
        setTipoDocEsquema("NSS")
        break
      case "INFOVANIT-infonavit-fovissste":
        setTipoDocEsquema("NSS")
        break
      case "INFOVANIT-crediterreno":
        setTipoDocEsquema("NSS")
        break
      case "INFOVANIT-segundo-credito":
        setTipoDocEsquema("NSS")
        break
      case "INFOVANIT-cofinativ":
        setTipoDocEsquema("NSS")
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
        setTipoDocEsquema("CURP")
        break
      case "BANCARIO-casa":
        setTipoDocEsquema("CURP")
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

  // Función para obtener a los vendedores
  async function getSellers() {
    const q = query(collection(db, "empleados"))
    const querysnapshot = await getDocs(q);
    const vend = []
    await querysnapshot.forEach((doc) => {
      const docu = doc.data()
      if (docu.rol == 'vendedor') {
        vend.push(doc.data())
      }
    })
    setVendedores(vend)
  }

  // Función para obtener a los clientes
  async function getClients() {
    const q = query(collection(db, "clientes"));
    const querysnapshot = await getDocs(q);
    const docSnapshots = []
    querysnapshot.forEach((doc) => {
      docSnapshots.push(doc.data())
    });
    setClientes(docSnapshots)
  }

  // Función para obtener propiedades en general y para obtener las propiedades libres
  async function getProperties() {
    const q = query(collection(db, "propiedades"));
    //const q = query(collection(db, "propiedades"), where("status_inmueble", "==", "LIBRE"));
    const querysnapshot = await getDocs(q);
    const docSnapshotsProperties = []
    await querysnapshot.forEach((doc) => {
      docSnapshotsProperties.push(doc.data())
    });
    setPropiedades(docSnapshotsProperties)
    const docsPropsLibres = []
    await querysnapshot.forEach((doc) => {
      const docu = doc.data()
      if (docu.status == "LIBRE") {
        docsPropsLibres.push(doc.data())
      }
    })
    setPropiedadesL(docsPropsLibres)
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
        asesor: asesor,
        asesorID: asesorID,
        terminos: false,
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
        asesor: asesor,
        nombre: nombre,
        esquema: compra
      })

      setMessagem("Registro exitoso") //poner un modal bonito para indicar que el registro fue exitoso!
      handleShow()
      setUpdate(!update)
      setMenu('inicio')
    } catch (e) {
      setMessagem(e)
      handleShow()
    }
  }

  const columns = [
    {
      dataField: "folio",
      text: "Folio",
      sort: true,
      editable: false,
      filter: textFilter()
    },
    {
      dataField: "proyecto",
      text: "Proyecto",
      sort: true,
      filter: textFilter()
    },
    {
      dataField: "inmueble",
      text: "Inmueble",
      sort: true
    },
    {
      dataField: "direccion",
      text: "Dirección",
      sort: true
    },
    {
      dataField: "numero_ext.",
      text: "Número Ext.",
      sort: true,
    },
    {
      dataField: "lte",
      text: "lte",
      sort: true,
    },
    {
      dataField: "mz",
      text: "mz",
      sort: true,
    },
    {
      dataField: "nivel",
      text: "nivel",
      sort: true,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true
    },
    {
      dataField: "status_interno",
      text: "Status Interno",
      sort: true
    },
    {
      dataField: "precio",
      text: "Precio",
      sort: true
    },
    {
      dataField: "asesor",
      text: "Asesor",
      sort: true
    },
    {
      dataField: "esquema",
      text: "Esquema",
      sort: true
    },
    {
      dataField: "nombre",
      text: "Cliente",
      sort: true
    },
    {
      dataField: "observaciones",
      text: "Obs.",
      sort: true
    },
  ]

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
      dataField: "asesor",
      text: "Asesor",
      sort: true,
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
    onClick: (e, row, rowIndex) => {
      router.push(`/admin/cliente/${row.id}`)
    }
  };

  const rowEventPropiedad = {
    onClick: (e, row, rowIndex) => {
      router.push(`/admin/propiedad/${row.id}`)
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
                        <Link href=""><button type="button" onClick={() => setMenu('propiedades')} className="btn" data-bs-dismiss="offcanvas" >Propiedades</button></Link>
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
                  
                  <div className="mb-3 mx-5">
                    <label htmlFor="nombre" className="form-label">Nombre completo</label>
                    <input type="text" onChange={(e) => setNombre(e.target.value.toUpperCase())} value={nombre} name='nombre' className="form-control" id="nombre" placeholder="Nombre Completo" />
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
                    <input type="text" onChange={(e) => setPago(e.target.value)} value={pago} name='pago' className="form-control" id="pago" placeholder="5000" />
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
                  <p>Selecciona al Asesor encargado de este cliente: </p>
                    <select className="form-select" onChange={(e) => setAsesorID(e.target.value)}  aria-label="Default select example">
                      <option value="">Asesor</option>
                      {vendedores.map((vend) => {
                        return (
                          <option key={vend.id} value={vend.id}>{vend.nombre}</option>
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
        
        {menu == "propiedades" ? 
        (
          <div className='mt-5 mb-5'>
            {
              propiedades !=null && propiedades.length > 0 ? (
                  <BootstrapTable
                    striped
                    condensed
                    hover
                    keyField='id'
                    data={propiedades}
                    columns={columns}
                    pagination={paginationFactory()}
                    filter={filterFactory()}
                    rowEvents={rowEventPropiedad}
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
          <div className='align-items-center mb-5'>
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
        ) : 
        (
          <></>
        )
        }
        
      </div>
    </>
  )
}