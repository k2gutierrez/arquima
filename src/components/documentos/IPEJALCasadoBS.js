import React, { useState } from 'react'
import { db, storage } from '@/firebase/config'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore"
import ModalG from '../ModalG'

export default function IPEJALCasadoBS(props) {

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
      title: 'Acta de nacimiento del cliente',
      key: 'ActNac',
      text: 'ActaNacimientoCliente',
      comment: 'Se sube documento de acta de nacimiento del cliente'
    },
    {
      title: 'Acta de Matrimonio del cliente',
      key: 'ActaMatrimonioCliente',
      text: 'Acta_Matrimonio_Cliente',
      comment: 'Se subió el acta de matrimonio del cliente'
    }
  ]
  
  let listTramite = [
    {
      title: 'Predial',
      key: 'Predial',
      text: 'Predial',
      comment: 'Se sube documento de predial '
    },
    {
      title: 'Comprobante de no adeudo de Predial',
      key: 'NoAdeudoPredial',
      text: 'CompNoAdeudoPredial',
      comment: 'Se sube el comprobante de no adeudo de Predial'
    },
    {
      title: 'Comprobante de Agua',
      key: 'Agua',
      text: 'Agua',
      comment: 'Se sube documento del agua'
    },
    {
      title: 'Comprobante de no adeudo de Agua',
      key: 'NoAdeudoAgua',
      text: 'NoAdeudoAgua',
      comment: 'Se sube documento de no adeudo del agua'
    },
    {
      title: 'Escritura Pública de Compra Venta con boleta registral y hoja de transmisión patrimonial',
      key: 'Escritura',
      text: 'Escritura_publica',
      comment: 'Se sube documento de escritura pública'
    },
    {
      title: 'Certificado de existencia o inexistencia de gravamen',
      key: 'Gravamen',
      text: 'Gravamen',
      comment: 'Se sube el documento con el estado del gravamen del cliente'
    },
    {
      title: 'Talón de Nómina',
      key: 'Nomina',
      text: 'Talon_Nomina',
      comment: 'Se sube el talón de nómina del cliente'
    },
    {
      title: 'Recibo de pago de Cuotas Condominales',
      key: 'CuotasCondominales',
      text: 'Cuotas_Condominales',
      comment: 'Se sube el recibo de pago de cuotas condominales del cliente'
    },
    {
      title: 'Constancia de no adeudo de Cuotas Condominales',
      key: 'NoAdeudoCuotasCondominales',
      text: 'No_Adeudo_Cuotas_Condominales',
      comment: 'Se sube el comprobante de no adeudo de cuotas condominales del cliente'
    },
    {
      title: 'Licencia de alineamiento y número oficial',
      key: 'LicenciaAlineamiento',
      text: 'Licencia_alineamiento',
      comment: 'Se sube la licencia de alineamiento y número oficial del cliente'
    },
    {
      title: 'Carta de adeudo, Saldo o Condicionada al Pago',
      key: 'CartaAdeudo',
      text: 'Carta_Adeudo',
      comment: 'Se sube la Carta de Adeudo del cliente'
    },
    {
      title: 'Estado de cuenta del cliente',
      key: 'EdoCuenta',
      text: 'Estado_Cuenta',
      comment: 'Se sube el estado de cuenta del cliente'
    },
    {
      title: 'Precalificación de INFONAVIT',
      key: 'PrecalificacionINFONAVIT',
      text: 'Precalificacion_INFONAVIT',
      comment: 'Se sube la Precalificación de INFONAVIT del cliente'
    },
    {
      title: 'Constancia de Vigencia de Derechos. Observaciones',
      key: 'ConstanciaDerechos',
      text: 'Constancia_Derechos',
      comment: 'Se sube la Constancia de Derechos del cliente'
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

    <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Documentos del cliente
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              
              <div className='row text-start mx-5 px-5'>
                { listCliente.map((v, k) => {
                  return (
                    <div key={k} >
                      { props.upload[v.key] != undefined ? (
                        <div className="mb-3">
                          <label htmlFor={v.key} className="form-label">{v.title}</label>
                          <input className="form-control bg-success" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id={v.key} />
                          <button type='button' onClick={

                              async function handleFile () {
                                if (currentfile == null) {
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

            </div>
          </div>
        </div>

        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              Documentos del trámite
            </button>
          </h2>
          <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">

              <div className='row text-start mx-5 px-5'>
                { listTramite.map((v, k) => {
                  return (
                    <div key={k} >
                      { props.upload[v.key] != undefined ? (
                        <div className="mb-3">
                          <label htmlFor={v.key} className="form-label">{v.title}</label>
                          <input className="form-control bg-success" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id={v.key} />
                          <button type='button' onClick={

                              async function handleFile () {
                                if (currentfile == null) {
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

            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}
