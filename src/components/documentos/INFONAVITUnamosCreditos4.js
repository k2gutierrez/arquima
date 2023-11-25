import React, { useState } from 'react'
import { db, storage } from '@/firebase/config'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore"
import ModalG from '../ModalG'
import Accordion from 'react-bootstrap/Accordion'

export default function INFONAVITUnamosCreditos4(props) {

  const [message, setMessage] = useState('')
  const [currentfile, setCurrentfile] = useState(null)

  const [show, setShow] = useState(false)


  let listCliente = [
    {
      title: 'INE del cliente',
      key: 'INE',
      text: 'INECliente',
      comment: 'Se sube documento de INE del cliente'
    },
    {
      title: 'CURP del cliente',
      key: 'CURP',
      text: 'CURPCliente',
      comment: 'Se sube documento de CURP del cliente'
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
      title: 'Acta de nacimiento del cliente',
      key: 'ActNac',
      text: 'ActaNacimientoCliente',
      comment: 'Se sube documento de acta de nacimiento del cliente'
    },
    {
      title: 'Formato General del cliente',
      key: 'FormatoG',
      text: 'FormatoGeneral_Cliente',
      comment: 'Se sube documento de Formato General del cliente'
    },
    {
      title: 'Taller saber para decidir',
      key: 'TallerSaberCliente',
      text: 'Taller_saber_Cliente',
      comment: 'Se subió el comprobante del Taller Saber para decidir del cliente'
    },
    {
      title: 'Precalificación de INFONAVIT',
      key: 'PrecalificacionCliente',
      text: 'Precalificacion_Cliente',
      comment: 'Se subió el documento de precalificación de INFONAVIT del cliente'
    },
    {
      title: 'Solicitud de Crédito',
      key: 'SolicitudCreditoCliente',
      text: 'Solicitud_Credito',
      comment: 'Se subió la solicitud de crédito del cliente'
    },
    {
      title: 'SIC',
      key: 'SIC',
      text: 'SIC',
      comment: 'Se subió el SIC del cliente'
    },
  ]

  let listCliente2 = [
    {
      title: 'INE del cliente 2',
      key: 'INE2',
      text: 'INECliente2',
      comment: 'Se sube documento de INE del cliente 2'
    },
    {
      title: 'CURP del cliente 2',
      key: 'CURP2',
      text: 'CURPCliente2',
      comment: 'Se sube documento de CURP del cliente 2'
    },
    {
      title: 'RFC del cliente 2',
      key: 'RFC2',
      text: 'RFCCliente2',
      comment: 'Se sube documento de RFC del cliente 2'
    },
    {
      title: 'Comprobante de domicilio del cliente 2',
      key: 'CompDom2',
      text: 'ComprobanteDomicilioCliente2',
      comment: 'Se sube documento de Comprobante de domicilio del cliente 2'
    },
    {
      title: 'Acta de nacimiento del cliente 2',
      key: 'ActNac2',
      text: 'ActaNacimientoCliente2',
      comment: 'Se sube documento de acta de nacimiento del cliente 2'
    },
    {
      title: 'Formato General del cliente 2',
      key: 'FormatoG2',
      text: 'FormatoGeneral_Cliente2',
      comment: 'Se sube documento de Formato General del cliente 2'
    },
    {
      title: 'Taller saber para decidir 2',
      key: 'TallerSaberCliente2',
      text: 'Taller_saber_Cliente2',
      comment: 'Se subió el comprobante del Taller Saber para decidir del cliente 2'
    },
    {
      title: 'Precalificación de INFONAVIT 2',
      key: 'PrecalificacionCliente2',
      text: 'Precalificacion_Cliente2',
      comment: 'Se subió el documento de precalificación de INFONAVIT del cliente 2'
    },
    {
      title: 'Solicitud de Crédito 2',
      key: 'SolicitudCreditoCliente2',
      text: 'Solicitud_Credito2',
      comment: 'Se subió la solicitud de crédito del cliente 2'
    },
    {
      title: 'SIC cliente 2',
      key: 'SIC2',
      text: 'SIC2',
      comment: 'Se subió el SIC del cliente 2'
    },
  ]

  let listCliente3 = [
    {
      title: 'INE del cliente 3',
      key: 'INE3',
      text: 'INECliente3',
      comment: 'Se sube documento de INE del cliente 3'
    },
    {
      title: 'CURP del cliente 3',
      key: 'CURP3',
      text: 'CURPCliente3',
      comment: 'Se sube documento de CURP del cliente 3'
    },
    {
      title: 'RFC del cliente 3',
      key: 'RFC3',
      text: 'RFCCliente3',
      comment: 'Se sube documento de RFC del cliente 3'
    },
    {
      title: 'Comprobante de domicilio del cliente 3',
      key: 'CompDom3',
      text: 'ComprobanteDomicilioCliente3',
      comment: 'Se sube documento de Comprobante de domicilio del cliente 3'
    },
    {
      title: 'Acta de nacimiento del cliente 3',
      key: 'ActNac3',
      text: 'ActaNacimientoCliente3',
      comment: 'Se sube documento de acta de nacimiento del cliente 3'
    },
    {
      title: 'Formato General del cliente 3',
      key: 'FormatoG3',
      text: 'FormatoGeneral_Cliente3',
      comment: 'Se sube documento de Formato General del cliente 3'
    },
    {
      title: 'Taller saber para decidir 3',
      key: 'TallerSaberCliente3',
      text: 'Taller_saber_Cliente3',
      comment: 'Se subió el comprobante del Taller Saber para decidir del cliente 3'
    },
    {
      title: 'Precalificación de INFONAVIT 3',
      key: 'PrecalificacionCliente3',
      text: 'Precalificacion_Cliente3',
      comment: 'Se subió el documento de precalificación de INFONAVIT del cliente 3'
    },
    {
      title: 'Solicitud de Crédito 3',
      key: 'SolicitudCreditoCliente3',
      text: 'Solicitud_Credito3',
      comment: 'Se subió la solicitud de crédito del cliente 3'
    },
    {
      title: 'SIC cliente 3',
      key: 'SIC3',
      text: 'SIC3',
      comment: 'Se subió el SIC del cliente 3'
    },
  ]

  let listCliente4 = [
    {
      title: 'INE del cliente 4',
      key: 'INE4',
      text: 'INECliente4',
      comment: 'Se sube documento de INE del cliente 4'
    },
    {
      title: 'CURP del cliente 4',
      key: 'CURP4',
      text: 'CURPCliente4',
      comment: 'Se sube documento de CURP del cliente 4'
    },
    {
      title: 'RFC del cliente 4',
      key: 'RFC4',
      text: 'RFCCliente4',
      comment: 'Se sube documento de RFC del cliente 4'
    },
    {
      title: 'Comprobante de domicilio del cliente 4',
      key: 'CompDom4',
      text: 'ComprobanteDomicilioCliente4',
      comment: 'Se sube documento de Comprobante de domicilio del cliente 4'
    },
    {
      title: 'Acta de nacimiento del cliente 4',
      key: 'ActNac4',
      text: 'ActaNacimientoCliente4',
      comment: 'Se sube documento de acta de nacimiento del cliente 4'
    },
    {
      title: 'Formato General del cliente 4',
      key: 'FormatoG4',
      text: 'FormatoGeneral_Cliente4',
      comment: 'Se sube documento de Formato General del cliente 4'
    },
    {
      title: 'Taller saber para decidir 4',
      key: 'TallerSaberCliente4',
      text: 'Taller_saber_Cliente4',
      comment: 'Se subió el comprobante del Taller Saber para decidir del cliente 4'
    },
    {
      title: 'Precalificación de INFONAVIT 4',
      key: 'PrecalificacionCliente4',
      text: 'Precalificacion_Cliente4',
      comment: 'Se subió el documento de precalificación de INFONAVIT del cliente 4'
    },
    {
      title: 'Solicitud de Crédito 4',
      key: 'SolicitudCreditoCliente4',
      text: 'Solicitud_Credito4',
      comment: 'Se subió la solicitud de crédito del cliente 4'
    },
    {
      title: 'SIC cliente 4',
      key: 'SIC4',
      text: 'SIC4',
      comment: 'Se subió el SIC del cliente 4'
    },
  ]

  /////////////////////////////////////////////////////////////////////////////////////////////////

  const handleActaMatrimonioCliente = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Acta_Matrimonio_Cliente_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        ActaMatrimonioCliente: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el acta de matrimonio del cliente 1"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleActaMatrimonioCliente2 = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Acta_Matrimonio_Cliente2_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        ActaMatrimonioCliente2: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el acta de matrimonio del cliente 2"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleActaMatrimonioCliente3 = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Acta_Matrimonio_Cliente3_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        ActaMatrimonioCliente3: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el acta de matrimonio del cliente 3"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleActaMatrimonioCliente4 = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Acta_Matrimonio_Cliente4_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        ActaMatrimonioCliente4: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el acta de matrimonio del cliente 4"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }
  
  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  let listClienteConyuge = [
    {
      title: 'INE del Conyugue del cliente',
      key: 'IneConyugeCliente',
      text: 'INE_Conyuge_Cliente',
      comment: 'Se subió el INE del conyuge del cliente'
    },
    {
      title: 'CURP del Conyugue del cliente',
      key: 'CurpConyugeCliente',
      text: 'Curp_Conyuge_Cliente',
      comment: 'Se subió el CURP del conyuge del cliente'
    },
    {
      title: 'RFC del Conyugue del cliente',
      key: 'RfcConyugeCliente',
      text: 'RFC_Conyuge_Cliente',
      comment: 'Se subió el RFC del conyuge del cliente'
    },
    {
      title: 'Acta de nacimiento del Conyugue del cliente',
      key: 'ActNacConyugeCliente',
      text: 'ActNac_Conyuge_Cliente',
      comment: 'Se subió el acta de nacimiento del conyuge del cliente'
    }
  ]

  let listClienteConyuge2 = [
    {
      title: 'INE del Conyugue del cliente 2',
      key: 'IneConyugeCliente2',
      text: 'INE_Conyuge_Cliente2',
      comment: 'Se subió el INE del conyuge del cliente 2'
    },
    {
      title: 'CURP del Conyugue del cliente 2',
      key: 'CurpConyugeCliente2',
      text: 'Curp_Conyuge_Cliente2',
      comment: 'Se subió el CURP del conyuge del cliente 2'
    },
    {
      title: 'RFC del Conyugue del cliente 2',
      key: 'RfcConyugeCliente2',
      text: 'RFC_Conyuge_Cliente2',
      comment: 'Se subió el RFC del conyuge del cliente 2'
    },
    {
      title: 'Acta de nacimiento del Conyugue del cliente 2',
      key: 'ActNacConyugeCliente2',
      text: 'ActNac_Conyuge_Cliente2',
      comment: 'Se subió el acta de nacimiento del conyuge del cliente 2'
    }
  ]

  let listClienteConyuge3 = [
    {
      title: 'INE del Conyugue del cliente 3',
      key: 'IneConyugeCliente3',
      text: 'INE_Conyuge_Cliente3',
      comment: 'Se subió el INE del conyuge del cliente 3'
    },
    {
      title: 'CURP del Conyugue del cliente 3',
      key: 'CurpConyugeCliente3',
      text: 'Curp_Conyuge_Cliente3',
      comment: 'Se subió el CURP del conyuge del cliente 3'
    },
    {
      title: 'RFC del Conyugue del cliente 3',
      key: 'RfcConyugeCliente3',
      text: 'RFC_Conyuge_Cliente3',
      comment: 'Se subió el RFC del conyuge del cliente 3'
    },
    {
      title: 'Acta de nacimiento del Conyugue del cliente 3',
      key: 'ActNacConyugeCliente3',
      text: 'ActNac_Conyuge_Cliente3',
      comment: 'Se subió el acta de nacimiento del conyuge del cliente 3'
    }
  ]

  let listClienteConyuge4 = [
    {
      title: 'INE del Conyugue del cliente 4',
      key: 'IneConyugeCliente4',
      text: 'INE_Conyuge_Cliente4',
      comment: 'Se subió el INE del conyuge del cliente 4'
    },
    {
      title: 'CURP del Conyugue del cliente 4',
      key: 'CurpConyugeCliente4',
      text: 'Curp_Conyuge_Cliente4',
      comment: 'Se subió el CURP del conyuge del cliente 4'
    },
    {
      title: 'RFC del Conyugue del cliente 4',
      key: 'RfcConyugeCliente4',
      text: 'RFC_Conyuge_Cliente4',
      comment: 'Se subió el RFC del conyuge del cliente 4'
    },
    {
      title: 'Acta de nacimiento del Conyugue del cliente 4',
      key: 'ActNacConyugeCliente4',
      text: 'ActNac_Conyuge_Cliente4',
      comment: 'Se subió el acta de nacimiento del conyuge del cliente 4'
    }
  ]

  let listVendedor = [
    {
      title: 'INE del vendedor',
      key: 'INEV',
      text: 'INEVendedor',
      comment: 'Se sube documento de INE del vendedor'
    },
    {
      title: 'CURP del vendedor',
      key: 'CURPV',
      text: 'CURPVendedor',
      comment: 'Se sube documento de CURP del vendedor'
    },
    {
      title: 'RFC del vendedor',
      key: 'RFCV',
      text: 'RFCVendedor',
      comment: 'Se sube documento de RFC del vendedor'
    },
    {
      title: 'Acta de nacimiento del vendedor',
      key: 'ActNacV',
      text: 'ActaNacimientoVendedor',
      comment: 'Se sube documento de acta de nacimiento del vendedor'
    },
    {
      title: 'Escritura con boleta y antescedentes',
      key: 'EscrituraV',
      text: 'EscrituraVendedor',
      comment: 'Se sube documento de escritura del dueño de la propiedad'
    },
    {
      title: 'Predial',
      key: 'PredialV',
      text: 'PredialVendedor',
      comment: 'Se sube documento de predial del dueño de la propiedad'
    },
    {
      title: 'Comprobante de no adeudo de Agua',
      key: 'AguaV',
      text: 'AguaVendedor',
      comment: 'Se sube documento del agua del dueño de la propiedad'
    },
    {
      title: 'Estado de cuenta del dueño',
      key: 'EstadoCtaV',
      text: 'EstadoCtaVendedor',
      comment: 'Se sube documento de Estado de Cuenta del dueño de la propiedad'
    },
    {
      title: 'Acta Constitutiva',
      key: 'ActaConstitutivaV',
      text: 'Acta_Constitutiva_Vendedor',
      comment: 'Se sube la Acta Constitutiva del dueño de la propiedad'
    },
    {
      title: 'Memoria Descriptiva',
      key: 'MemoriaDescriptivaV',
      text: 'Memoria_descriptiva_Vendedor',
      comment: 'Se sube la memoria descriptiva del dueño de la propiedad'
    },
    {
      title: 'Plano arquitectónico',
      key: 'PlanoArqV',
      text: 'Plano_Arquitectonico_Vendedor',
      comment: 'Se sube el Plano Arquitectónico del dueño de la propiedad'
    },
    {
      title: 'Habitabilidad / Manifestación de obra / Terminación de obra / Lic de construcción',
      key: 'HabitabilidadV',
      text: 'Habitabilidad_Vendedor',
      comment: 'Se sube el documento de Habitabilidad del dueño de la propiedad'
    },
    {
      title: 'Recibo de luz 1',
      key: 'RecibosLuzV',
      text: 'Recibos_Luz1_Vendedor',
      comment: 'Se sube el primer recibo de luz del dueño de la propiedad'
    },
    {
      title: 'Recibo de luz 2',
      key: 'RecibosLuzV2',
      text: 'Recibos_Luz2_Vendedor',
      comment: 'Se sube el segundo recibo de luz del dueño de la propiedad'
    },
    {
      title: 'Recibo de luz 3',
      key: 'RecibosLuzV3',
      text: 'Recibos_Luz3_Vendedor',
      comment: 'Se sube el tercer recibo de luz del dueño de la propiedad'
    },
  ]

  let listConyugeVendedor = [
    {
      title: 'Acta de Matrimonio del vendedor',
      key: 'ActaMatrimonioVendedor',
      text: 'Acta_Matrimonio_vendedor',
      comment: 'Se sube el acta de matrimonio del dueño de la propiedad'
    },
    {
      title: 'INE del Conyugue',
      key: 'IneConyugeVendedor',
      text: 'INE_Conguge_vendedor',
      comment: 'Se subió el INE del conyuge del dueño de la propiedad'
    },
    {
      title: 'CURP del Conyugue',
      key: 'CURPConyugeVendedor',
      text: 'CURP_Conguge_vendedor',
      comment: 'Se subió el CURP del conyuge del dueño de la propiedad'
    },
    {
      title: 'RFC del Conyugue',
      key: 'RfcConyugeVendedor',
      text: 'RFC_Conguge_vendedor',
      comment: 'Se subió el RFC del conyuge del dueño de la propiedad'
    },
    {
      title: 'Acta de nacimiento del Conyugue',
      key: 'ActNacConyugeVendedor',
      text: 'ActNac_Conguge_vendedor',
      comment: 'Se subió el acta de nacimiento del conyuge del dueño de la propiedad'
    }
  ]

  return (
    <>
      <ModalG
        show={show}
        onHide={() => {setShow(false)}}
        message={message}
        onClick={() => {setShow(false)}}
        button={"Aceptar"}
      />

      <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Cliente 1</Accordion.Header>
          <Accordion.Body>
            
          <div className='row text-start mx-3 my-3'>

                { listCliente.map((v, k) => {
                  let [estado, setEstado] = useState(false)
                  return (
                    <div key={k} >
                      { props.upload[v.key] != undefined || estado == true ? (
                        <div className="mb-3">
                          <label htmlFor={v.key} className="form-label">{v.title}</label>
                          <input className="form-control bg-success" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id={v.key} disabled={props.disabled} />
                          <button type='button' onClick={

                              async function handleFile () {
                                if (currentfile == null) {
                                  setMessage('No se ha agregado ningun archivo')
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
                                  setMessage(v.comment)
                                  setShow(true)
                                  setCurrentfile(null)
                                } catch(e) {
                                  setMessage(e)
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
                                setMessage('No se ha agregado ningun archivo')
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
                                setMessage(v.comment)
                                setShow(true)
                                setEstado(true)
                                setCurrentfile(null)
                              } catch(e) {
                                setMessage(e)
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

            { props.civil == 'SOLTERO' ? (<></>) : (
              <form >
                <div className="mb-3">
                  <label for="actaMatrimonioCliente" className="form-label">Acta de Matrimonio</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="actaMatrimonioCliente" />
                  <button type='button' onClick={handleActaMatrimonioCliente} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>
              )
            }

          </div>

          </Accordion.Body>
        </Accordion.Item>
        { props.regimen_patrimonial != 'SOCIEDAD LEGAL / MANCOMUNADO' ? (<></>) : (
          <Accordion.Item eventKey="1">
            <Accordion.Header>Documentos del cónyuge del cliente 1</Accordion.Header>
            <Accordion.Body>
              
              <div className='row text-start mx-5 px-5'>
                { listClienteConyuge.map((v, k) => {
                  let [estado, setEstado] = useState(false)
                  return (
                    <div key={k} >
                      { props.upload[v.key] != undefined || estado == true ? (
                        <div className="mb-3">
                          <label htmlFor={v.key} className="form-label">{v.title}</label>
                          <input className="form-control bg-success" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id={v.key} disabled={props.disabled} />
                          <button type='button' onClick={

                              async function handleFile () {
                                if (currentfile == null) {
                                  setMessage('No se ha agregado ningun archivo')
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
                                  setMessage(v.comment)
                                  setShow(true)
                                  setCurrentfile(null)
                                } catch(e) {
                                  setMessage(e)
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
                                setMessage('No se ha agregado ningun archivo')
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
                                setMessage(v.comment)
                                setShow(true)
                                setEstado(true)
                                setCurrentfile(null)
                              } catch(e) {
                                setMessage(e)
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

            </Accordion.Body>
          </Accordion.Item>
          )
        }
        <Accordion.Item eventKey="2">
          <Accordion.Header>Cliente 2</Accordion.Header>
          <Accordion.Body>
            <div className='row text-start mx-3 my-3'>

                { listCliente2.map((v, k) => {
                  let [estado, setEstado] = useState(false)
                  return (
                    <div key={k} >
                      { props.upload[v.key] != undefined || estado == true ? (
                        <div className="mb-3">
                          <label htmlFor={v.key} className="form-label">{v.title}</label>
                          <input className="form-control bg-success" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id={v.key} disabled={props.disabled} />
                          <button type='button' onClick={

                              async function handleFile () {
                                if (currentfile == null) {
                                  setMessage('No se ha agregado ningun archivo')
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
                                  setMessage(v.comment)
                                  setShow(true)
                                  setCurrentfile(null)
                                } catch(e) {
                                  setMessage(e)
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
                                setMessage('No se ha agregado ningun archivo')
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
                                setMessage(v.comment)
                                setShow(true)
                                setEstado(true)
                                setCurrentfile(null)
                              } catch(e) {
                                setMessage(e)
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

              { props.civil2 == 'SOLTERO' ? (<></>) : (
                <form >
                  <div className="mb-3">
                    <label for="actaMatrimonioCliente2" className="form-label">Acta de Matrimonio del cliente 2</label>
                    <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="actaMatrimonioCliente2" />
                    <button type='button' onClick={handleActaMatrimonioCliente2} className='btn btn-secondary my-3' >Subir archivo</button>
                  </div>
                </form>
                )
              }

            </div>
          </Accordion.Body>
        </Accordion.Item>
        { props.regimen_patrimonial2 != 'SOCIEDAD LEGAL / MANCOMUNADO' ? (<></>) : (
          <Accordion.Item eventKey="3">
            <Accordion.Header>Documentos del cónyuge del cliente 2</Accordion.Header>
            <Accordion.Body>
              
            <div className='row text-start mx-5 px-5'>
                { listClienteConyuge2.map((v, k) => {
                  let [estado, setEstado] = useState(false)
                  return (
                    <div key={k} >
                      { props.upload[v.key] != undefined || estado == true ? (
                        <div className="mb-3">
                          <label htmlFor={v.key} className="form-label">{v.title}</label>
                          <input className="form-control bg-success" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id={v.key} disabled={props.disabled} />
                          <button type='button' onClick={

                              async function handleFile () {
                                if (currentfile == null) {
                                  setMessage('No se ha agregado ningun archivo')
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
                                  setMessage(v.comment)
                                  setShow(true)
                                  setCurrentfile(null)
                                } catch(e) {
                                  setMessage(e)
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
                                setMessage('No se ha agregado ningun archivo')
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
                                setMessage(v.comment)
                                setShow(true)
                                setEstado(true)
                                setCurrentfile(null)
                              } catch(e) {
                                setMessage(e)
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

            </Accordion.Body>
          </Accordion.Item>
          )
        }
        <Accordion.Item eventKey="4">
          <Accordion.Header>Cliente 3</Accordion.Header>
          <Accordion.Body>
            
            <div className='row text-start mx-3 my-3'>

                { listCliente3.map((v, k) => {
                  let [estado, setEstado] = useState(false)
                  return (
                    <div key={k} >
                      { props.upload[v.key] != undefined || estado == true ? (
                        <div className="mb-3">
                          <label htmlFor={v.key} className="form-label">{v.title}</label>
                          <input className="form-control bg-success" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id={v.key} disabled={props.disabled} />
                          <button type='button' onClick={

                              async function handleFile () {
                                if (currentfile == null) {
                                  setMessage('No se ha agregado ningun archivo')
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
                                  setMessage(v.comment)
                                  setShow(true)
                                  setCurrentfile(null)
                                } catch(e) {
                                  setMessage(e)
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
                                setMessage('No se ha agregado ningun archivo')
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
                                setMessage(v.comment)
                                setShow(true)
                                setEstado(true)
                                setCurrentfile(null)
                              } catch(e) {
                                setMessage(e)
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

              { props.civil3 == 'SOLTERO' ? (<></>) : (
                <form >
                  <div className="mb-3">
                    <label for="actaMatrimonioCliente3" className="form-label">Acta de Matrimonio del cliente 3</label>
                    <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="actaMatrimonioCliente3" />
                    <button type='button' onClick={handleActaMatrimonioCliente3} className='btn btn-secondary my-3' >Subir archivo</button>
                  </div>
                </form>
                )
              }

            </div>

          </Accordion.Body>
        </Accordion.Item>
        { props.regimen_patrimonial3 != 'SOCIEDAD LEGAL / MANCOMUNADO' ? (<></>) : (
          <Accordion.Item eventKey="5">
            <Accordion.Header>Documentos del cónyuge del cliente 3</Accordion.Header>
            <Accordion.Body>
              
              <div className='row text-start mx-5 px-5'>
                { listClienteConyuge3.map((v, k) => {
                  let [estado, setEstado] = useState(false)
                  return (
                    <div key={k} >
                      { props.upload[v.key] != undefined || estado == true ? (
                        <div className="mb-3">
                          <label htmlFor={v.key} className="form-label">{v.title}</label>
                          <input className="form-control bg-success" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id={v.key} disabled={props.disabled} />
                          <button type='button' onClick={

                              async function handleFile () {
                                if (currentfile == null) {
                                  setMessage('No se ha agregado ningun archivo')
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
                                  setMessage(v.comment)
                                  setShow(true)
                                  setCurrentfile(null)
                                } catch(e) {
                                  setMessage(e)
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
                                setMessage('No se ha agregado ningun archivo')
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
                                setMessage(v.comment)
                                setShow(true)
                                setEstado(true)
                                setCurrentfile(null)
                              } catch(e) {
                                setMessage(e)
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

            </Accordion.Body>
          </Accordion.Item>
          )
        }
        <Accordion.Item eventKey="6">
          <Accordion.Header>Cliente 4</Accordion.Header>
          <Accordion.Body>
            
          <div className='row text-start mx-3 my-3'>

                { listCliente4.map((v, k) => {
                  let [estado, setEstado] = useState(false)
                  return (
                    <div key={k} >
                      { props.upload[v.key] != undefined || estado == true ? (
                        <div className="mb-3">
                          <label htmlFor={v.key} className="form-label">{v.title}</label>
                          <input className="form-control bg-success" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id={v.key} disabled={props.disabled} />
                          <button type='button' onClick={

                              async function handleFile () {
                                if (currentfile == null) {
                                  setMessage('No se ha agregado ningun archivo')
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
                                  setMessage(v.comment)
                                  setShow(true)
                                  setCurrentfile(null)
                                } catch(e) {
                                  setMessage(e)
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
                                setMessage('No se ha agregado ningun archivo')
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
                                setMessage(v.comment)
                                setShow(true)
                                setEstado(true)
                                setCurrentfile(null)
                              } catch(e) {
                                setMessage(e)
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

            { props.civil4 == 'SOLTERO' ? (<></>) : (
              <form >
                <div className="mb-3">
                  <label for="actaMatrimonioCliente4" className="form-label">Acta de Matrimonio del cliente 4</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="actaMatrimonioCliente4" />
                  <button type='button' onClick={handleActaMatrimonioCliente4} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>
              )
            }

          </div>

          </Accordion.Body>
        </Accordion.Item>
        { props.regimen_patrimonial4 != 'SOCIEDAD LEGAL / MANCOMUNADO' ? (<></>) : (
          <Accordion.Item eventKey="7">
            <Accordion.Header>Documentos del cónyuge del cliente 4</Accordion.Header>
            <Accordion.Body>
              
            <div className='row text-start mx-5 px-5'>
                { listClienteConyuge4.map((v, k) => {
                  let [estado, setEstado] = useState(false)
                  return (
                    <div key={k} >
                      { props.upload[v.key] != undefined || estado == true ? (
                        <div className="mb-3">
                          <label htmlFor={v.key} className="form-label">{v.title}</label>
                          <input className="form-control bg-success" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id={v.key} disabled={props.disabled} />
                          <button type='button' onClick={

                              async function handleFile () {
                                if (currentfile == null) {
                                  setMessage('No se ha agregado ningun archivo')
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
                                  setMessage(v.comment)
                                  setShow(true)
                                  setCurrentfile(null)
                                } catch(e) {
                                  setMessage(e)
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
                                setMessage('No se ha agregado ningun archivo')
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
                                setMessage(v.comment)
                                setShow(true)
                                setEstado(true)
                                setCurrentfile(null)
                              } catch(e) {
                                setMessage(e)
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

            </Accordion.Body>
          </Accordion.Item>
          )
        }
        <Accordion.Item eventKey="8">
          <Accordion.Header>Documentos del vendedor de la propiedad</Accordion.Header>
          <Accordion.Body>
            
              <div className='row text-start mx-5 px-5'>
                { listVendedor.map((v, k) => {
                  let [estado, setEstado] = useState(false)
                  return (
                    <div key={k} >
                      { props.upload[v.key] != undefined || estado == true ? (
                        <div className="mb-3">
                          <label htmlFor={v.key} className="form-label">{v.title}</label>
                          <input className="form-control bg-success" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id={v.key} disabled={props.disabled} />
                          <button type='button' onClick={

                              async function handleFile () {
                                if (currentfile == null) {
                                  setMessage('No se ha agregado ningun archivo')
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
                                  setMessage(v.comment)
                                  setShow(true)
                                  setCurrentfile(null)
                                } catch(e) {
                                  setMessage(e)
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
                                setMessage('No se ha agregado ningun archivo')
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
                                setMessage(v.comment)
                                setShow(true)
                                setEstado(true)
                                setCurrentfile(null)
                              } catch(e) {
                                setMessage(e)
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

          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="9">
          <Accordion.Header>¿El vendedor de la propiedad está casado? Documentos del cónyuge?</Accordion.Header>
          <Accordion.Body>
            
              <div className='row text-start mx-5 px-5'>
                { listConyugeVendedor.map((v, k) => {
                  let [estado, setEstado] = useState(false)
                  return (
                    <div key={k} >
                      { props.upload[v.key] != undefined || estado == true ? (
                        <div className="mb-3">
                          <label htmlFor={v.key} className="form-label">{v.title}</label>
                          <input className="form-control bg-success" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id={v.key} disabled={props.disabled} />
                          <button type='button' onClick={

                              async function handleFile () {
                                if (currentfile == null) {
                                  setMessage('No se ha agregado ningun archivo')
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
                                  setMessage(v.comment)
                                  setShow(true)
                                  setCurrentfile(null)
                                } catch(e) {
                                  setMessage(e)
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
                                setMessage('No se ha agregado ningun archivo')
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
                                setMessage(v.comment)
                                setShow(true)
                                setEstado(true)
                                setCurrentfile(null)
                              } catch(e) {
                                setMessage(e)
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

          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      
    </>
  )
}
