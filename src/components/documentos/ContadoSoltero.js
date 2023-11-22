import React, { useState } from 'react'
import { db, storage } from '@/firebase/config'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore"
import ModalG from '../ModalG'

export default function ContadoSoltero(props) {

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
      title: 'Carta General del cliente',
      key: 'CartaG',
      text: 'CartaGeneralCliente',
      comment: 'Se sube documento de Carta General del cliente'
    },
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
      title: 'Comprobante de domicilio del vendedor',
      key: 'CompDomV',
      text: 'ComprobanteDomicilioVendedor',
      comment: 'Se sube documento de Comprobante de domicilio del vendedor'
    },
    {
      title: 'Acta de nacimiento del vendedor',
      key: 'ActNacV',
      text: 'ActaNacimientoVendedor',
      comment: 'Se sube documento de acta de nacimiento del vendedor'
    },
    {
      title: 'Escritura',
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
      title: 'Comprobante de No Adeudo de Predial',
      key: 'NoAdeudoPredialV',
      text: 'CompNoAdeudoPredialVendedor',
      comment: 'Se sube el comprobante de no adeudo de predial del dueño de la propiedad'
    },
    {
      title: 'Comprobante de Agua',
      key: 'AguaV',
      text: 'AguaVendedor',
      comment: 'Se sube documento del agua del dueño de la propiedad'
    },
    {
      title: 'Estado de cuenta del dueño',
      key: 'EstadoCtaV',
      text: 'EstadoCtaVendedor',
      comment: 'Se sube documento de Estado de Cuenta del dueño de la propiedad'
    }
  ]

  let listConyugeVendedor = [
    {
      title: 'Acta de Matrimonio',
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

    <div className="accordion" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            Documentos del cliente
          </button>
        </h2>
        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            
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
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            Documentos del vendedor
          </button>
        </h2>
        <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            
          <div className='row text-start mx-5 px-5'>
            { listVendedor.map((v, k) => {
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
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            En caso de que quien vende la propiedad está casado: (Documentos del cónyuge)
          </button>
        </h2>
        <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            
            <div className='row text-start mx-5 px-5'>
              { listConyugeVendedor.map((v, k) => {
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
