import React, { useState } from 'react'
import { db, storage } from '@/firebase/config'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore"
import ModalG from '../ModalG'

export default function BANCOSoltero(props) {

  const [currentfile, setCurrentfile] = useState(null)
  
  const [puesto, setPuesto] = useState(null)
  const [telOficina, setTelOficina] = useState(null)
  const [telCasa, setTelCasa] = useState(null)
  const [celular, setCelular] = useState(null)
  const [estudios, setEstudios] = useState(null)
  const [nombreRefPersonal, setNombreRefPersonal] = useState(null)
  const [telRefPersonal, setTelRefPersonal] = useState(null)
  const [tiempoRefPersonal, setTiempoRefPersonal]  = useState(null)
  const [nombreRefFamiliar, setNombreRefFamiliar] = useState(null)
  const [telRefFamiliar, setTelRefFamiliar] = useState(null)
  const [parentescoRefFamiliar, setParentescoRefFamiliar] = useState(null)
  const [pesoAcre, setPesoAcre] = useState(null)
  const [estaturaAcre, setEstaturaAcre] = useState(null)
  const [tiempoDom, setTiempoDom] = useState(null)
  const [statusDom, setStatusDom]  = useState(null)
  const [dependientes, setDependientes] = useState("0")
  const [valorPropiedad, setValorPropiedad] = useState(null)
  const [depEdad1, setDepEdad1] = useState(null)
  const [depParen1, setDepParen1] = useState(null)
  const [depEdad2, setDepEdad2] = useState(null)
  const [depParen2, setDepParen2] = useState(null)
  const [depEdad3, setDepEdad3] = useState(null)
  const [depParen3, setDepParen3] = useState(null)
  const [depEdad4, setDepEdad4] = useState(null)
  const [depParen4, setDepParen4] = useState(null)
  const [depEdad5, setDepEdad5] = useState(null)
  const [depParen5, setDepParen5] = useState(null)
  const [depEdad6, setDepEdad6] = useState(null)
  const [depParen6, setDepParen6] = useState(null)
  const [depEdad7, setDepEdad7] = useState(null)
  const [depParen7, setDepParen7] = useState(null)
  const [depEdad8, setDepEdad8] = useState(null)
  const [depParen8, setDepParen8] = useState(null)

  const [show, setShow] = useState(false)
  const [m, setM] = useState("")

  const registrarInfoIndispensable = async () => {

    let data
    if (dependientes == "1") {
      data = {
        infoIndisp: {
          telOficina: telOficina,
          telCasa: telCasa,
          celular: celular,
          estudios: estudios,
          nombreRefPersonal: nombreRefPersonal,
          telRefPersonal: telRefPersonal,
          tiempoRefPersonal: tiempoRefPersonal,
          nombreRefFamiliar: nombreRefFamiliar,
          telRefFamiliar: telRefFamiliar,
          parentescoRefFamiliar: parentescoRefFamiliar,
          pesoAcre: pesoAcre,
          estaturaAcre: estaturaAcre,
          tiempoDom: tiempoDom,
          statusDom: statusDom,
          dependientes: dependientes,
          depEdad1: depEdad1,
          depParen1: depParen1,
          valorPropiedad: valorPropiedad
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se registró la información indispensable del cliente"
        })
      }
    } else if (dependientes == "2") {
      data = {
        infoIndisp: {
          telOficina: telOficina,
          telCasa: telCasa,
          celular: celular,
          estudios: estudios,
          nombreRefPersonal: nombreRefPersonal,
          telRefPersonal: telRefPersonal,
          tiempoRefPersonal: tiempoRefPersonal,
          nombreRefFamiliar: nombreRefFamiliar,
          telRefFamiliar: telRefFamiliar,
          parentescoRefFamiliar: parentescoRefFamiliar,
          pesoAcre: pesoAcre,
          estaturaAcre: estaturaAcre,
          tiempoDom: tiempoDom,
          statusDom: statusDom,
          dependientes: dependientes,
          depEdad1: depEdad1,
          depParen1: depParen1,
          depEdad2: depEdad2,
          depParen2: depParen2,
          valorPropiedad: valorPropiedad
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se registró la información indispensable del cliente"
        })
      }
    } else if (dependientes == "3") {
      data = {
        infoIndisp: {
          telOficina: telOficina,
          telCasa: telCasa,
          celular: celular,
          estudios: estudios,
          nombreRefPersonal: nombreRefPersonal,
          telRefPersonal: telRefPersonal,
          tiempoRefPersonal: tiempoRefPersonal,
          nombreRefFamiliar: nombreRefFamiliar,
          telRefFamiliar: telRefFamiliar,
          parentescoRefFamiliar: parentescoRefFamiliar,
          pesoAcre: pesoAcre,
          estaturaAcre: estaturaAcre,
          tiempoDom: tiempoDom,
          statusDom: statusDom,
          dependientes: dependientes,
          depEdad1: depEdad1,
          depParen1: depParen1,
          depEdad2: depEdad2,
          depParen2: depParen2,
          depEdad3: depEdad3,
          depParen3: depParen3,
          valorPropiedad: valorPropiedad
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se registró la información indispensable del cliente"
        })
      }
    } else if (dependientes == "4") {
      data = {
        infoIndisp: {
          telOficina: telOficina,
          telCasa: telCasa,
          celular: celular,
          estudios: estudios,
          nombreRefPersonal: nombreRefPersonal,
          telRefPersonal: telRefPersonal,
          tiempoRefPersonal: tiempoRefPersonal,
          nombreRefFamiliar: nombreRefFamiliar,
          telRefFamiliar: telRefFamiliar,
          parentescoRefFamiliar: parentescoRefFamiliar,
          pesoAcre: pesoAcre,
          estaturaAcre: estaturaAcre,
          tiempoDom: tiempoDom,
          statusDom: statusDom,
          dependientes: dependientes,
          depEdad1: depEdad1,
          depParen1: depParen1,
          depEdad2: depEdad2,
          depParen2: depParen2,
          depEdad3: depEdad3,
          depParen3: depParen3,
          depEdad4: depEdad4,
          depParen4: depParen4,
          valorPropiedad: valorPropiedad
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se registró la información indispensable del cliente"
        })
      }
    } else if (dependientes == "5") {
      data = {
        infoIndisp: {
          telOficina: telOficina,
          telCasa: telCasa,
          celular: celular,
          estudios: estudios,
          nombreRefPersonal: nombreRefPersonal,
          telRefPersonal: telRefPersonal,
          tiempoRefPersonal: tiempoRefPersonal,
          nombreRefFamiliar: nombreRefFamiliar,
          telRefFamiliar: telRefFamiliar,
          parentescoRefFamiliar: parentescoRefFamiliar,
          pesoAcre: pesoAcre,
          estaturaAcre: estaturaAcre,
          tiempoDom: tiempoDom,
          statusDom: statusDom,
          dependientes: dependientes,
          depEdad1: depEdad1,
          depParen1: depParen1,
          depEdad2: depEdad2,
          depParen2: depParen2,
          depEdad3: depEdad3,
          depParen3: depParen3,
          depEdad4: depEdad4,
          depParen4: depParen4,
          depEdad5: depEdad5,
          depParen5: depParen5,
          valorPropiedad: valorPropiedad
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se registró la información indispensable del cliente"
        })
      }
    } else if (dependientes == "6") {
      data = {
        infoIndisp: {
          telOficina: telOficina,
          telCasa: telCasa,
          celular: celular,
          estudios: estudios,
          nombreRefPersonal: nombreRefPersonal,
          telRefPersonal: telRefPersonal,
          tiempoRefPersonal: tiempoRefPersonal,
          nombreRefFamiliar: nombreRefFamiliar,
          telRefFamiliar: telRefFamiliar,
          parentescoRefFamiliar: parentescoRefFamiliar,
          pesoAcre: pesoAcre,
          estaturaAcre: estaturaAcre,
          tiempoDom: tiempoDom,
          statusDom: statusDom,
          dependientes: dependientes,
          depEdad1: depEdad1,
          depParen1: depParen1,
          depEdad2: depEdad2,
          depParen2: depParen2,
          depEdad3: depEdad3,
          depParen3: depParen3,
          depEdad4: depEdad4,
          depParen4: depParen4,
          depEdad5: depEdad5,
          depParen5: depParen5,
          depEdad6: depEdad6,
          depParen6: depParen6,
          valorPropiedad: valorPropiedad
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se registró la información indispensable del cliente"
        })
      }
    } else if (dependientes == "7") {
      data = {
        infoIndisp: {
          telOficina: telOficina,
          telCasa: telCasa,
          celular: celular,
          estudios: estudios,
          nombreRefPersonal: nombreRefPersonal,
          telRefPersonal: telRefPersonal,
          tiempoRefPersonal: tiempoRefPersonal,
          nombreRefFamiliar: nombreRefFamiliar,
          telRefFamiliar: telRefFamiliar,
          parentescoRefFamiliar: parentescoRefFamiliar,
          pesoAcre: pesoAcre,
          estaturaAcre: estaturaAcre,
          tiempoDom: tiempoDom,
          statusDom: statusDom,
          dependientes: dependientes,
          depEdad1: depEdad1,
          depParen1: depParen1,
          depEdad2: depEdad2,
          depParen2: depParen2,
          depEdad3: depEdad3,
          depParen3: depParen3,
          depEdad4: depEdad4,
          depParen4: depParen4,
          depEdad5: depEdad5,
          depParen5: depParen5,
          depEdad6: depEdad6,
          depParen6: depParen6,
          depEdad7: depEdad7,
          depParen7: depParen7,
          valorPropiedad: valorPropiedad
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se registró la información indispensable del cliente"
        })
      }
    } else if (dependientes == "8") {
      data = {
        infoIndisp: {
          telOficina: telOficina,
          telCasa: telCasa,
          celular: celular,
          estudios: estudios,
          nombreRefPersonal: nombreRefPersonal,
          telRefPersonal: telRefPersonal,
          tiempoRefPersonal: tiempoRefPersonal,
          nombreRefFamiliar: nombreRefFamiliar,
          telRefFamiliar: telRefFamiliar,
          parentescoRefFamiliar: parentescoRefFamiliar,
          pesoAcre: pesoAcre,
          estaturaAcre: estaturaAcre,
          tiempoDom: tiempoDom,
          statusDom: statusDom,
          dependientes: dependientes,
          depEdad1: depEdad1,
          depParen1: depParen1,
          depEdad2: depEdad2,
          depParen2: depParen2,
          depEdad3: depEdad3,
          depParen3: depParen3,
          depEdad4: depEdad4,
          depParen4: depParen4,
          depEdad5: depEdad5,
          depParen5: depParen5,
          depEdad6: depEdad6,
          depParen6: depParen6,
          depEdad7: depEdad7,
          depParen7: depParen7,
          depEdad8: depEdad8,
          depParen8: depParen8,
          valorPropiedad: valorPropiedad
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se registró la información indispensable del cliente"
        })
      }
    } else if (dependientes == "0") {
      data = {
        infoIndisp: {
          telOficina: telOficina,
          telCasa: telCasa,
          celular: celular,
          estudios: estudios,
          nombreRefPersonal: nombreRefPersonal,
          telRefPersonal: telRefPersonal,
          tiempoRefPersonal: tiempoRefPersonal,
          nombreRefFamiliar: nombreRefFamiliar,
          telRefFamiliar: telRefFamiliar,
          parentescoRefFamiliar: parentescoRefFamiliar,
          pesoAcre: pesoAcre,
          estaturaAcre: estaturaAcre,
          tiempoDom: tiempoDom,
          statusDom: statusDom,
          dependientes: dependientes,
          valorPropiedad: valorPropiedad
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se registró la información indispensable del cliente"
        })
      }
    }
    try {

      const infoDispRef = doc(db, 'clientes', props.id)
      await updateDoc(infoDispRef, data);

      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  let listCliente = [
    {
      title: 'INE o pasaporte del cliente',
      key: 'INE',
      text: 'INECliente',
      comment: 'Se sube documento de INE / pasaporte del cliente'
    },
    {
      title: 'RFC del cliente',
      key: 'RFC',
      text: 'RFCCliente',
      comment: 'Se sube documento de RFC del cliente'
    },
    {
      title: 'Comprobante de domicilio del cliente',
      key: 'CompDom',
      text: 'ComprobanteDomicilioCliente',
      comment: 'Se sube documento de Comprobante de domicilio del cliente'
    },
    {
      title: 'Comprobante de domicilio 2 del cliente',
      key: 'CompDom2',
      text: 'ComprobanteDomicilio2Cliente',
      comment: 'Se sube documento de Comprobante de domicilio 2 del cliente'
    },
    {
      title: 'Acta de nacimiento del cliente',
      key: 'ActNac',
      text: 'ActaNacimientoCliente',
      comment: 'Se sube documento de acta de nacimiento del cliente'
    },
    {
      title: 'Acta de nacimiento del Coacreditado (En caso que aplique)',
      key: 'ActNacCoAcreditado',
      text: 'ActaNacimiento_CoAcreditado',
      comment: 'Se sube documento de acta de nacimiento del Coacreditado'
    },
  ]

  let listNomina = [
    {
      title: 'Últimos 3 recibos de nómina \n Recibo Nominal 1',
      key: 'Nomina1',
      text: 'Recibo_Nomina_1',
      comment: 'Se subió un recibo de nómina del cliente'
    },
    {
      title: 'Recibo Nominal 2',
      key: 'Nomina2',
      text: 'Recibo_Nomina_2',
      comment: 'Se subió un recibo de nómina del cliente'
    },
    {
      title: 'Recibo Nominal 3',
      key: 'Nomina3',
      text: 'Recibo_Nomina_3',
      comment: 'Se subió un recibo de nómina del cliente'
    },
    {
      title: 'últimos 2 Estados de Cuenta donde depositen la Nómina \n Estado de Cuenta 1',
      key: 'EdoCuenta1',
      text: 'Estado_Cuenta_1',
      comment: 'Se subió un estado de cuenta del cliente'
    },
    {
      title: 'Estado de Cuenta 2',
      key: 'EdoCuenta2',
      text: 'Estado_Cuenta_2',
      comment: 'Se subió un estado de cuenta del cliente'
    }
  ]

  let listIndependiente = [
    {
      title: 'Alta en Hacienda',
      key: 'AltaHacienda',
      text: 'Alta_Hacienda',
      comment: 'Se subió el Alta de Hacienda del cliente'
    },
    {
      title: 'Constancia Fiscal',
      key: 'ConstanciaSituacionFiscal',
      text: 'Constancia_situacion_Fiscal',
      comment: 'Se subió la constancia de situación fiscal del cliente'
    },
    {
      title: 'Carta Personal',
      key: 'CartaPersonal',
      text: 'Carta_Personal',
      comment: 'Se subió la carta a título personal del cliente'
    },
    {
      title: 'últimos 6 meses de Estados de Cuenta completos donde se reflejen mis ingresos \n Estado de Cuenta 1',
      key: 'EdoCuenta1',
      text: 'Estado_Cuenta_1',
      comment: 'Se subió un estado de cuenta del cliente'
    },
    {
      title: 'Estado de Cuenta 2',
      key: 'EdoCuenta2',
      text: 'Estado_Cuenta_2',
      comment: 'Se subió un estado de cuenta del cliente'
    },
    {
      title: 'Estado de Cuenta 3',
      key: 'EdoCuenta3',
      text: 'Estado_Cuenta_3',
      comment: 'Se subió un estado de cuenta del cliente'
    },
    {
      title: 'Estado de Cuenta 4',
      key: 'EdoCuenta4',
      text: 'Estado_Cuenta_4',
      comment: 'Se subió un estado de cuenta del cliente'
    },
    {
      title: 'Estado de Cuenta 5',
      key: 'EdoCuenta5',
      text: 'Estado_Cuenta_5',
      comment: 'Se subió un estado de cuenta del cliente'
    },
    {
      title: 'Estado de Cuenta 6',
      key: 'EdoCuenta6',
      text: 'Estado_Cuenta_6',
      comment: 'Se subió un estado de cuenta del cliente'
    }
  ]

  const HandlePuesto = async () => {
    if (puesto == null) return;
    try {

      const puestoRef = doc(db, 'clientes', props.id)
      await updateDoc(puestoRef, {
        puesto: puesto,
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se registró el puesto del cliente"
        })
      });

      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  return (
    <>
      <ModalG
        show={show}
        onHide={() => {setShow(false)}}
        message={ m }
        onClick={() => {setShow(false)}}
        button={"Aceptar"}
      />

      <div className="accordion accordion-flush" id="accordionFlushExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
              Documentos del cliente
            </button>
          </h2>
          <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
            
            <div className='row text-start mx-5 px-5'>
              { listCliente.map((v, k) => {
                let estado = false
                function cambio() {
                  estado = true
                  return estado
                }
                return (
                  <div key={k} >
                    { props.upload[v.key] != undefined || estado == true ? (
                      <div className="mb-3">
                        <label htmlFor={v.key} className="form-label">{v.title}</label>
                        <input className="form-control bg-success" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id={v.key} disabled={props.disabled} />
                        <button type='button' onClick={

                            async function handleFile () {
                              if (currentfile == null) {
                                setM('No se ha agregado ningun archivo')
                                setShow(true)
                                return
                              };
                              try {
                                const ineRef = ref(storage, `${props.id}/${v.text}_${currentfile.name}`)
                                const carg = await uploadBytes(ineRef, currentfile)
                                
                                const enlaceUrl = await getDownloadURL(carg.ref)
                                const docRef = doc(db, 'clientes', props.id)
                                await updateDoc(docRef, {
                                  [v.key]: {
                                    url: enlaceUrl,
                                    vendedor: true
                                  },
                                  historial: arrayUnion({
                                    registrado: props.currentUser,
                                    fecha: Timestamp.fromDate(new Date()),
                                    comentario: v.comment
                                  })
                                })
                                setM(v.comment)
                                setShow(true)
                                setCurrentfile(null)
                              } catch(e) {
                                setM(e)
                                setShow(true)
                                setCurrentfile(null)
                              }
                            }

                        } className='btn btn-secondary my-3' id={v.key} disabled={props.disabled} >Subir archivo</button>
                      </div>
                    ) : (
                      <div className="mb-3">
                        <label htmlFor={k} className="form-label">{v.title}</label>
                        <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id={k} />
                        <button type='button' onClick={

                          async function handleFile () {
                            if (currentfile == null) {
                              setM('No se ha agregado ningun archivo')
                              setShow(true)
                              return
                            };
                            try {
                              const ineRef = ref(storage, `${props.id}/${v.text}_${currentfile.name}`)
                              const carg = await uploadBytes(ineRef, currentfile)
                              
                              const enlaceUrl = await getDownloadURL(carg.ref)
                              const docRef = doc(db, 'clientes', props.id)
                              await updateDoc(docRef, {
                                [v.key]: {
                                  url: enlaceUrl,
                                  vendedor: true
                                },
                                historial: arrayUnion({
                                  registrado: props.currentUser,
                                  fecha: Timestamp.fromDate(new Date()),
                                  comentario: v.comment
                                })
                              })
                              setM(v.comment)
                              setShow(true)
                              cambio()
                              setCurrentfile(null)
                            } catch(e) {
                              setM(e)
                              setShow(true)
                              setCurrentfile(null)
                            }
                          }

                        } className='btn btn-secondary my-3' >Subir archivo</button>
                      </div>
                    )
                    }
                  </div>
                )
              })
              }
            </div>

          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
              ¿Ingresos a través de Nómina?
            </button>
          </h2>

          <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
            <div className='row text-start mx-5 px-5'>
            
              { listNomina.map((v, k) => {
                let estado = false
                function cambio() {
                  estado = true
                  return estado
                }
                return (
                  <div key={k} >
                    { props.upload[v.key] != undefined || estado == true ? (
                      <div className="mb-3">
                        <label htmlFor={v.key} className="form-label">{v.title}</label>
                        <input className="form-control bg-success" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id={v.key} disabled={props.disabled} />
                        <button type='button' onClick={

                            async function handleFile () {
                              if (currentfile == null) {
                                setM('No se ha agregado ningun archivo')
                                setShow(true)
                                return
                              };
                              try {
                                const ineRef = ref(storage, `${props.id}/${v.text}_${currentfile.name}`)
                                const carg = await uploadBytes(ineRef, currentfile)
                                
                                const enlaceUrl = await getDownloadURL(carg.ref)
                                const docRef = doc(db, 'clientes', props.id)
                                await updateDoc(docRef, {
                                  [v.key]: {
                                    url: enlaceUrl,
                                    vendedor: true
                                  },
                                  historial: arrayUnion({
                                    registrado: props.currentUser,
                                    fecha: Timestamp.fromDate(new Date()),
                                    comentario: v.comment
                                  })
                                })
                                setM(v.comment)
                                setShow(true)
                                setCurrentfile(null)
                              } catch(e) {
                                setM(e)
                                setShow(true)
                                setCurrentfile(null)
                              }
                            }

                        } className='btn btn-secondary my-3' id={v.key} disabled={props.disabled} >Subir archivo</button>
                      </div>
                    ) : (
                      <div className="mb-3">
                        <label htmlFor={k} className="form-label">{v.title}</label>
                        <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id={k} />
                        <button type='button' onClick={

                          async function handleFile () {
                            if (currentfile == null) {
                              setM('No se ha agregado ningun archivo')
                              setShow(true)
                              return
                            };
                            try {
                              const ineRef = ref(storage, `${props.id}/${v.text}_${currentfile.name}`)
                              const carg = await uploadBytes(ineRef, currentfile)
                              
                              const enlaceUrl = await getDownloadURL(carg.ref)
                              const docRef = doc(db, 'clientes', props.id)
                              await updateDoc(docRef, {
                                [v.key]: {
                                  url: enlaceUrl,
                                  vendedor: true
                                },
                                historial: arrayUnion({
                                  registrado: props.currentUser,
                                  fecha: Timestamp.fromDate(new Date()),
                                  comentario: v.comment
                                })
                              })
                              setM(v.comment)
                              setShow(true)
                              cambio()
                              setCurrentfile(null)
                            } catch(e) {
                              setM(e)
                              setShow(true)
                              setCurrentfile(null)
                            }
                          }

                        } className='btn btn-secondary my-3' >Subir archivo</button>
                      </div>
                    )
                    }
                  </div>
                )
              })
              }

              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Puesto</span>
                <input type="text" className="form-control" onChange={(e) => setPuesto(e.target.value)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                <button type='button' onClick={HandlePuesto} className='btn btn-secondary my-3' >Registrar</button>
              </div>

            </div>
            
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
              ¿Ingresos de forma independiente?
            </button>
          </h2>
          <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">

            <div className='row text-start mx-5 px-5'>

              { listIndependiente.map((v, k) => {
                let estado = false
                function cambio() {
                  estado = true
                  return estado
                }
                return (
                  <div key={k} >
                    { props.upload[v.key] != undefined || estado == true ? (
                      <div className="mb-3">
                        <label htmlFor={v.key} className="form-label">{v.title}</label>
                        <input className="form-control bg-success" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id={v.key} disabled={props.disabled} />
                        <button type='button' onClick={

                            async function handleFile () {
                              if (currentfile == null) {
                                setM('No se ha agregado ningun archivo')
                                setShow(true)
                                return
                              };
                              try {
                                const ineRef = ref(storage, `${props.id}/${v.text}_${currentfile.name}`)
                                const carg = await uploadBytes(ineRef, currentfile)
                                
                                const enlaceUrl = await getDownloadURL(carg.ref)
                                const docRef = doc(db, 'clientes', props.id)
                                await updateDoc(docRef, {
                                  [v.key]: {
                                    url: enlaceUrl,
                                    vendedor: true
                                  },
                                  historial: arrayUnion({
                                    registrado: props.currentUser,
                                    fecha: Timestamp.fromDate(new Date()),
                                    comentario: v.comment
                                  })
                                })
                                setM(v.comment)
                                setShow(true)
                                setCurrentfile(null)
                              } catch(e) {
                                setM(e)
                                setShow(true)
                                setCurrentfile(null)
                              }
                            }

                        } className='btn btn-secondary my-3' id={v.key} disabled={props.disabled} >Subir archivo</button>
                      </div>
                    ) : (
                      <div className="mb-3">
                        <label htmlFor={k} className="form-label">{v.title}</label>
                        <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id={k} />
                        <button type='button' onClick={

                          async function handleFile () {
                            if (currentfile == null) {
                              setM('No se ha agregado ningun archivo')
                              setShow(true)
                              return
                            };
                            try {
                              const ineRef = ref(storage, `${props.id}/${v.text}_${currentfile.name}`)
                              const carg = await uploadBytes(ineRef, currentfile)
                              
                              const enlaceUrl = await getDownloadURL(carg.ref)
                              const docRef = doc(db, 'clientes', props.id)
                              await updateDoc(docRef, {
                                [v.key]: {
                                  url: enlaceUrl,
                                  vendedor: true
                                },
                                historial: arrayUnion({
                                  registrado: props.currentUser,
                                  fecha: Timestamp.fromDate(new Date()),
                                  comentario: v.comment
                                })
                              })
                              setM(v.comment)
                              setShow(true)
                              cambio()
                              setCurrentfile(null)
                            } catch(e) {
                              setM(e)
                              setShow(true)
                              setCurrentfile(null)
                            }
                          }

                        } className='btn btn-secondary my-3' >Subir archivo</button>
                      </div>
                    )
                    }
                  </div>
                )
              })
              }

            </div>
            
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
              Información indispensable:
            </button>
          </h2>
          <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">

            <div className='row text-start mx-5 px-5'>

              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Tel. oficina</span>
                <input type="text" className="form-control" onChange={(e) => setTelOficina(e.target.value)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Tel. casa</span>
                <input type="text" className="form-control" onChange={(e) => setTelCasa(e.target.value)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Cel.</span>
                <input type="text" className="form-control" onChange={(e) => setCelular(e.target.value)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
              </div>

              <div className="input-group mb-3">
                <p>último grado de estudios</p>
                <input type="text" className="form-control" onChange={(e) => setEstudios(e.target.value)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
              </div>

              <p className='mb-2'>Referencia personal:</p>

              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Nombre</span>
                <input type="text" className="form-control" onChange={(e) => setNombreRefPersonal(e.target.value)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Teléfono</span>
                <input type="text" className="form-control" onChange={(e) => setTelRefPersonal(e.target.value)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Tiempo de conocerse</span>
                <input type="text" className="form-control" onChange={(e) => setTiempoRefPersonal(e.target.value)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
              </div>

              <p className='mb-2'>Referencia familiar que no viva con la persona:</p>

              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Nombre</span>
                <input type="text" className="form-control" onChange={(e) => setNombreRefFamiliar(e.target.value)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Teléfono</span>
                <input type="text" className="form-control" onChange={(e) => setTelRefFamiliar(e.target.value)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Parentesco</span>
                <input type="text" className="form-control" onChange={(e) => setParentescoRefFamiliar(e.target.value)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
              </div>

              <p className='mb-2'>Peso y estatura de acreditado:</p>

              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Peso</span>
                <input type="text" className="form-control" onChange={(e) => setPesoAcre(e.target.value)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">estatura</span>
                <input type="text" className="form-control" onChange={(e) => setEstaturaAcre(e.target.value)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
              </div>

              <div className="input-group mb-3">
                <p>Tiempo de vivir en su dimicilio</p>
                <input type="text" className="form-control" onChange={(e) => setTiempoDom(e.target.value)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
              </div>

              <div className='mb-3'>
                <p>Selecciona una opción respecto al domicilio donde vive el solicitante:</p>
                <select className="form-select" onChange={(e) => setStatusDom(e.target.value)} aria-label="Default select example">
                  <option selected>Seleccionar</option>
                  <option value="propio">Propio</option>
                  <option value="rentado">Rentado</option>
                  <option value="de familiares">de familiares</option>
                </select>
              </div>

              <div className='mb-3'>
                <p>Dependientes económicos:</p>
                <select className="form-select" onChange={(e) => setDependientes(e.target.value)} aria-label="Default select example">
                  <option value="0" selected>Seleccionar</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </div>

              {dependientes == "1" ? (
                <div className="input-group mb-3">
                  <input type="text" className="form-control" onChange={(e) => setDepEdad1(e.target.value)} id='edad1' placeholder="Edad" aria-label="Edad" />
                  <span className="input-group-text">-</span>
                  <input type="text" className="form-control" onChange={(e) => setDepParen1(e.target.value)} id='paren1' placeholder="Parentesco" aria-label="Parentesco" />
                </div>
              
              ) : (<></>)
              }

              {dependientes == "2" ? (
                <>
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={(e) => setDepEdad1(e.target.value)} id='edad21' placeholder="Edad" aria-label="Edad" />
                    <span className="input-group-text">-</span>
                    <input type="text" className="form-control" onChange={(e) => setDepParen1(e.target.value)} id='paren21' placeholder="Parentesco" aria-label="Parentesco" />
                  </div>
                  
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={(e) => setDepEdad2(e.target.value)} id='edad22' placeholder="Edad" aria-label="Edad" />
                    <span className="input-group-text">-</span>
                    <input type="text" className="form-control" onChange={(e) => setDepParen2(e.target.value)} id='paren22' placeholder="Parentesco" aria-label="Parentesco" />
                  </div>
                </>
              
              ) : (<></>)
              }

              {dependientes == "3" ? (
                <>
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={(e) => setDepEdad1(e.target.value)} id='edad31' placeholder="Edad" aria-label="Edad" />
                    <span className="input-group-text">-</span>
                    <input type="text" className="form-control" onChange={(e) => setDepParen1(e.target.value)} id='paren31' placeholder="Parentesco" aria-label="Parentesco" />
                  </div>
                  
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={(e) => setDepEdad2(e.target.value)} id='edad32' placeholder="Edad" aria-label="Edad" />
                    <span className="input-group-text">-</span>
                    <input type="text" className="form-control" onChange={(e) => setDepParen2(e.target.value)} id='paren32' placeholder="Parentesco" aria-label="Parentesco" />
                  </div>

                  <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={(e) => setDepEdad3(e.target.value)} id='edad33' placeholder="Edad" aria-label="Edad" />
                    <span className="input-group-text">-</span>
                    <input type="text" className="form-control" onChange={(e) => setDepParen3(e.target.value)} id='paren33' placeholder="Parentesco" aria-label="Parentesco" />
                  </div>
                </>
              
              ) : (<></>)
              }

              {dependientes == "4" ? (
                <>
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={(e) => setDepEdad1(e.target.value)} id='edad41' placeholder="Edad" aria-label="Edad" />
                    <span className="input-group-text">-</span>
                    <input type="text" className="form-control" onChange={(e) => setDepParen1(e.target.value)} id='paren41' placeholder="Parentesco" aria-label="Parentesco" />
                  </div>
                  
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={(e) => setDepEdad2(e.target.value)} id='edad42' placeholder="Edad" aria-label="Edad" />
                    <span className="input-group-text">-</span>
                    <input type="text" className="form-control" onChange={(e) => setDepParen2(e.target.value)} id='paren42' placeholder="Parentesco" aria-label="Parentesco" />
                  </div>

                  <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={(e) => setDepEdad3(e.target.value)} id='edad43' placeholder="Edad" aria-label="Edad" />
                    <span className="input-group-text">-</span>
                    <input type="text" className="form-control" onChange={(e) => setDepParen3(e.target.value)} id='paren43' placeholder="Parentesco" aria-label="Parentesco" />
                  </div>

                  <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={(e) => setDepEdad4(e.target.value)} id='edad44' placeholder="Edad" aria-label="Edad" />
                    <span className="input-group-text">-</span>
                    <input type="text" className="form-control" onChange={(e) => setDepParen4(e.target.value)} id='paren44' placeholder="Parentesco" aria-label="Parentesco" />
                  </div>
                </>
              
              ) : (<></>)
              }

              {dependientes == "5" ? (
                <>
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={(e) => setDepEdad1(e.target.value)} id='edad51' placeholder="Edad" aria-label="Edad" />
                    <span className="input-group-text">-</span>
                    <input type="text" className="form-control" onChange={(e) => setDepParen1(e.target.value)} id='paren51' placeholder="Parentesco" aria-label="Parentesco" />
                  </div>
                  
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={(e) => setDepEdad2(e.target.value)} id='edad52' placeholder="Edad" aria-label="Edad" />
                    <span className="input-group-text">-</span>
                    <input type="text" className="form-control" onChange={(e) => setDepParen2(e.target.value)} id='paren52' placeholder="Parentesco" aria-label="Parentesco" />
                  </div>

                  <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={(e) => setDepEdad3(e.target.value)} id='edad53' placeholder="Edad" aria-label="Edad" />
                    <span className="input-group-text">-</span>
                    <input type="text" className="form-control" onChange={(e) => setDepParen3(e.target.value)} id='paren53' placeholder="Parentesco" aria-label="Parentesco" />
                  </div>

                  <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={(e) => setDepEdad4(e.target.value)} id='edad54' placeholder="Edad" aria-label="Edad" />
                    <span className="input-group-text">-</span>
                    <input type="text" className="form-control" onChange={(e) => setDepParen4(e.target.value)} id='paren54' placeholder="Parentesco" aria-label="Parentesco" />
                  </div>

                  <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={(e) => setDepEdad5(e.target.value)} id='edad55' placeholder="Edad" aria-label="Edad" />
                    <span className="input-group-text">-</span>
                    <input type="text" className="form-control" onChange={(e) => setDepParen5(e.target.value)} id='paren55' placeholder="Parentesco" aria-label="Parentesco" />
                  </div>
                </>

              ) : (<></>)
              }

              {dependientes == "6" ? (
                <>
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={(e) => setDepEdad1(e.target.value)} id='edad61' placeholder="Edad" aria-label="Edad" />
                    <span className="input-group-text">-</span>
                    <input type="text" className="form-control" onChange={(e) => setDepParen1(e.target.value)} id='paren61' placeholder="Parentesco" aria-label="Parentesco" />
                  </div>
                  
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={(e) => setDepEdad2(e.target.value)} id='edad62' placeholder="Edad" aria-label="Edad" />
                    <span className="input-group-text">-</span>
                    <input type="text" className="form-control" onChange={(e) => setDepParen2(e.target.value)} id='paren62' placeholder="Parentesco" aria-label="Parentesco" />
                  </div>

                  <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={(e) => setDepEdad3(e.target.value)} id='edad63' placeholder="Edad" aria-label="Edad" />
                    <span className="input-group-text">-</span>
                    <input type="text" className="form-control" onChange={(e) => setDepParen3(e.target.value)} id='paren63' placeholder="Parentesco" aria-label="Parentesco" />
                  </div>

                  <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={(e) => setDepEdad4(e.target.value)} id='edad64' placeholder="Edad" aria-label="Edad" />
                    <span className="input-group-text">-</span>
                    <input type="text" className="form-control" onChange={(e) => setDepParen4(e.target.value)} id='paren64' placeholder="Parentesco" aria-label="Parentesco" />
                  </div>

                  <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={(e) => setDepEdad5(e.target.value)} id='edad65' placeholder="Edad" aria-label="Edad" />
                    <span className="input-group-text">-</span>
                    <input type="text" className="form-control" onChange={(e) => setDepParen5(e.target.value)} id='paren65' placeholder="Parentesco" aria-label="Parentesco" />
                  </div>

                  <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={(e) => setDepEdad6(e.target.value)} id='edad66' placeholder="Edad" aria-label="Edad" />
                    <span className="input-group-text">-</span>
                    <input type="text" className="form-control" onChange={(e) => setDepParen6(e.target.value)} id='paren66' placeholder="Parentesco" aria-label="Parentesco" />
                  </div>
                </>

              ) : (<></>)
              }

              {dependientes == "7" ? (
                <>
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={(e) => setDepEdad1(e.target.value)} id='edad71' placeholder="Edad" aria-label="Edad" />
                    <span className="input-group-text">-</span>
                    <input type="text" className="form-control" onChange={(e) => setDepParen1(e.target.value)} id='paren71' placeholder="Parentesco" aria-label="Parentesco" />
                  </div>
                  
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={(e) => setDepEdad2(e.target.value)} id='edad72' placeholder="Edad" aria-label="Edad" />
                    <span className="input-group-text">-</span>
                    <input type="text" className="form-control" onChange={(e) => setDepParen2(e.target.value)} id='paren72' placeholder="Parentesco" aria-label="Parentesco" />
                  </div>

                  <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={(e) => setDepEdad3(e.target.value)} id='edad73' placeholder="Edad" aria-label="Edad" />
                    <span className="input-group-text">-</span>
                    <input type="text" className="form-control" onChange={(e) => setDepParen3(e.target.value)} id='paren73' placeholder="Parentesco" aria-label="Parentesco" />
                  </div>

                  <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={(e) => setDepEdad4(e.target.value)} id='edad74' placeholder="Edad" aria-label="Edad" />
                    <span className="input-group-text">-</span>
                    <input type="text" className="form-control" onChange={(e) => setDepParen4(e.target.value)} id='paren74' placeholder="Parentesco" aria-label="Parentesco" />
                  </div>

                  <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={(e) => setDepEdad5(e.target.value)} id='edad75' placeholder="Edad" aria-label="Edad" />
                    <span className="input-group-text">-</span>
                    <input type="text" className="form-control" onChange={(e) => setDepParen5(e.target.value)} id='paren75' placeholder="Parentesco" aria-label="Parentesco" />
                  </div>

                  <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={(e) => setDepEdad6(e.target.value)} id='edad76' placeholder="Edad" aria-label="Edad" />
                    <span className="input-group-text">-</span>
                    <input type="text" className="form-control" onChange={(e) => setDepParen6(e.target.value)} id='paren76' placeholder="Parentesco" aria-label="Parentesco" />
                  </div>

                  <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={(e) => setDepEdad7(e.target.value)} id='edad77' placeholder="Edad" aria-label="Edad" />
                    <span className="input-group-text">-</span>
                    <input type="text" className="form-control" onChange={(e) => setDepParen7(e.target.value)} id='paren77' placeholder="Parentesco" aria-label="Parentesco" />
                  </div>
                </>

              ) : (<></>)
              }

              {dependientes == "8" ? (
                <>
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={(e) => setDepEdad1(e.target.value)} id='edad81' placeholder="Edad" aria-label="Edad" />
                    <span className="input-group-text">-</span>
                    <input type="text" className="form-control" onChange={(e) => setDepParen1(e.target.value)} id='paren81' placeholder="Parentesco" aria-label="Parentesco" />
                  </div>
                  
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={(e) => setDepEdad2(e.target.value)} id='edad82' placeholder="Edad" aria-label="Edad" />
                    <span className="input-group-text">-</span>
                    <input type="text" className="form-control" onChange={(e) => setDepParen2(e.target.value)} id='paren82' placeholder="Parentesco" aria-label="Parentesco" />
                  </div>

                  <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={(e) => setDepEdad3(e.target.value)} id='edad83' placeholder="Edad" aria-label="Edad" />
                    <span className="input-group-text">-</span>
                    <input type="text" className="form-control" onChange={(e) => setDepParen3(e.target.value)} id='paren83' placeholder="Parentesco" aria-label="Parentesco" />
                  </div>

                  <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={(e) => setDepEdad4(e.target.value)} id='edad84' placeholder="Edad" aria-label="Edad" />
                    <span className="input-group-text">-</span>
                    <input type="text" className="form-control" onChange={(e) => setDepParen4(e.target.value)} id='paren84' placeholder="Parentesco" aria-label="Parentesco" />
                  </div>

                  <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={(e) => setDepEdad5(e.target.value)} id='edad85' placeholder="Edad" aria-label="Edad" />
                    <span className="input-group-text">-</span>
                    <input type="text" className="form-control" onChange={(e) => setDepParen5(e.target.value)} id='paren85' placeholder="Parentesco" aria-label="Parentesco" />
                  </div>

                  <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={(e) => setDepEdad6(e.target.value)} id='edad86' placeholder="Edad" aria-label="Edad" />
                    <span className="input-group-text">-</span>
                    <input type="text" className="form-control" onChange={(e) => setDepParen6(e.target.value)} id='paren86' placeholder="Parentesco" aria-label="Parentesco" />
                  </div>

                  <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={(e) => setDepEdad7(e.target.value)} id='edad87' placeholder="Edad" aria-label="Edad" />
                    <span className="input-group-text">-</span>
                    <input type="text" className="form-control" onChange={(e) => setDepParen7(e.target.value)} id='paren87' placeholder="Parentesco" aria-label="Parentesco" />
                  </div>

                  <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={(e) => setDepEdad8(e.target.value)} id='edad88' placeholder="Edad" aria-label="Edad" />
                    <span className="input-group-text">-</span>
                    <input type="text" className="form-control" onChange={(e) => setDepParen8(e.target.value)} id='paren88' placeholder="Parentesco" aria-label="Parentesco" />
                  </div>
                </>

              ) : (<></>)
              }

              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Valor aproximado de la propiedad a adquirir</span>
                <input type="text" className="form-control" onChange={(e) => setValorPropiedad(e.target.value)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
              </div>

              <button type='button' onClick={registrarInfoIndispensable} className='btn btn-secondary my-3' >Registrar</button>

            </div>
            
          </div>
        </div>
      </div>
      
    </>
  )
}
