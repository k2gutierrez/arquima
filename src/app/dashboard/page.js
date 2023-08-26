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


export default function Owner() {
  const [menu, setMenu] = useState('')
  const { user, currentRol, currentName } = useAuthContext()
  const router = useRouter()
  const [show, setShow] = useState(false)
  const [messagem, setMessagem] = useState('')
  const [update, setUpdate] = useState(false)

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [cel, setCel] = useState('')
  const [pago, setPago] = useState('')
  const [folio, setFolio] = useState(0)
  const [asesor, setAsesor] = useState(undefined)
  const [propiedadID, setPropiedadID] = useState("")
  const [asesorID, setAsesorID] = useState("")
  const [compra, setCompra] = useState('')
  const [proyectos, setProyectos] = useState([''])
  const [tipoDocEsquema, setTipoDocEsquema] = useState('')
  const [docEsquema, setDocEsquema] = useState('')
  const [civil, setCivil] = useState('SOLTERO')
  const [tipoMatrimonio, setTipoMatrimonio] = useState('NA')

  const [propiedades, setPropiedades] = useState(null)
  const [propiedadesL, setPropiedadesL] = useState(null)
  const [vendedores, setVendedores] = useState([{id: "none", nombre: "none"}])
  const [clientes, setClientes] = useState(null)

  useEffect(() => {
    if (user == null) {
      router.push("/")
    } else if (currentRol != "owner") {
      router.push("/user-validation")
    } else if (currentRol == "owner") {
      getSellers();
      getProperties();
      getClients();
    }
  }, [user, update])

  useEffect(() => {
    if (propiedades != null) {
      
      const output = []

      propiedades.forEach(v => {
        if (!output.map(o => o.proyecto).includes(v.proyecto)) {
          output.push(v.proyecto)
        } else {
          for (let i = 0; i < output.length; i++) {
            if (output[i].proyecto === v.proyecto) {
              output[i].data.push(v.proyecto)
            } break
          }
        }
      })
      let setOutput = new Set(output)
      setProyectos(setOutput)

      }

  }, [propiedades, menu])

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

  async function getSellers() {
    const q = query(collection(db, "empleados"), where("rol", "==", "vendedor"));
    const querysnapshot = await getDocs(q);
    const docSnapshots = []
    querysnapshot.forEach((doc) => {
      docSnapshots.push(doc.data())
    });
    setVendedores(docSnapshots)
  }

  async function getClients() {
    const q = query(collection(db, "clientes"));
    const querysnapshot = await getDocs(q);
    const docSnapshots = []
    querysnapshot.forEach((doc) => {
      docSnapshots.push(doc.data())
    });
    setClientes(docSnapshots)
  }

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
      setNombre('')
      setEmail('')
      setCel('')
      setPago('')
      setFolio('')
      setAsesor('')
      setPropiedadID(0)
      setAsesorID(0)
      setDocEsquema('')
      setTipoDocEsquema('')
      setCivil('SOLTERO')
      setTipoMatrimonio('NA')
      setUpdate(!update)
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
      router.push(`/dashboard/cliente/${row.id}`)
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
                          <Link href=""><button type='button' onClick={() => setMenu('')} className="btn" data-bs-dismiss="offcanvas" >Inicio</button></Link>
                      </li>
                      <li className="nav-item">
                          <Link href=""><button type='button' onClick={() => setMenu('registrarC')} className="btn" data-bs-dismiss="offcanvas" >Registrar Clientes</button></Link>
                      </li>
                      <li className="nav-item">
                        <Link href=""><button type="button" onClick={() => setMenu('clientes')} className="btn" data-bs-dismiss="offcanvas" >Lista de clientes</button></Link>
                      </li>
                      <li className="nav-item">
                        <Link href=""><button type="button" onClick={() => setMenu('propiedades')} className="btn" data-bs-dismiss="offcanvas" >Propiedades</button></Link>
                      </li>
                      <li className="nav-item" >
                        
                      </li>
                    </ul>
                    
                </div>
            </div>
        </div>
      </nav>
      <div className='container-fluid text-center'>
        {menu == '' || menu == 'inicio' ? 
        (
          <div className='row justify-content-center'>
            <DbUpload />
          </div>
        ) : (<></>)

        }
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
                    <select className="form-select" onChange={(e) => {setFolio(e.target.value); console.log(folio); console.log(propiedadID)}} aria-label="Default select example">
                      <option value="">Folio</option>
                      {propiedadesL.map((fol) => {
                        return (
                          <option key={fol.id} onClick={() => setPropiedadID(fol.id)} value={fol.folio}>{fol.folio}</option>
                        )
                      })}
                    </select>
                  </div>

                  <div className='mb-3 mx-5'> 
                  <p>Selecciona al Asesor encargado de este cliente: </p>
                    <select className="form-select" onChange={(e) => setAsesor(e.target.value)}  aria-label="Default select example">
                      <option value="">Asesor</option>
                      {vendedores.map((vend) => {
                        return (
                          <option key={vend.id} onClick={() => setAsesorID(vend.id)} value={vend.nombre}>{vend.nombre}</option>
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
                        <option value="Sociedad legal / Mancomunado">Sociedad legal / Mancomunado</option>
                        <option value="Bienes separados">Bienes separados</option>
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
                    cellEdit={cellEditFactory({
                      mode: "dbclick",
                    })}
                    filter={filterFactory()}
                  />
                ) : (<>Loading</>)
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
                ) : (<>Loading</>)
              }
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
