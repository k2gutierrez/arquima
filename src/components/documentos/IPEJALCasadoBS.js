import React, { useState } from 'react'
import { db, storage } from '@/firebase/config'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore"
import ModalG from '../ModalG'

export default function IPEJALCasadoBS(props) {

  const [ine, setIne] = useState(null)
  const [curp, setCurp] = useState(null)
  const [actaNac, setactaNac] = useState(null)
  const [currentfile, setCurrentfile] = useState(null)

  const [show, setShow] = useState(false)

  const handleINE = async () => {
    if (ine == null) return;
    try {
      const ineRef = ref(storage, `${props.id}/INECliente_${ine.name}`)
      const carg = await uploadBytes(ineRef, ine)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        INE: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento de INE"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleCURP = async () => {
    if (curp == null) return;
    try {
      const curpRef = ref(storage, `${props.id}/CURPCliente_${curp.name}`)
      const carg = await uploadBytes(curpRef, curp)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        CURP: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento de CURP"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleActaNac = async () => {
    if (actaNac == null) return;
    try {
      const Ref = ref(storage, `${props.id}/ActaNacimientoCliente_${actaNac.name}`)
      const carg = await uploadBytes(Ref, actaNac)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        ActNac: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento de acta de nacimiento"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

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
          comentario: "Se subió el acta de matrimonio del cliente"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handlePredial = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Predial_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        Predial: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento de predial del cliente"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleNoAdeudoPredial = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/CompNoAdeudoPredial_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        NoAdeudoPredial: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube el comprobante de no adeudo de predial del cliente"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }


  const handleAgua = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Agua_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        Agua: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube recibo del agua del cliente"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleNoAdeudoAgua = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/NoAdeudoAgua_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        NoAdeudoAgua: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube comprobante de no adeudo del agua"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const HandleEscrituraPublica = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Escritura_publica_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        Escritura: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube la escritura del cliente"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const HandleGravamen = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Gravamen_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        Gravamen: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube el documento con el estado del gravamen del cliente"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const HandleNomina = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Talon_Nomina_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        Nomina: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube el talón de nómina del cliente"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const HandleCuotasCondominales = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Cuotas_Condominales_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        CuotasCondominales: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube el recibo de pago de cuotas condominales del cliente"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const HandleNoAdeudoCuotasCondominales = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/No_Adeudo_Cuotas_Condominales_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        NoAdeudoCuotasCondominales: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube el comprobante de no adeudo de cuotas condominales del cliente"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const HandleLicenciaAlineamiento = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Licencia_alineamiento_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        LicenciaAlineamiento: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube la licencia de alineamiento y número oficial del cliente"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const HandleCartaAdeudo = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Carta_Adeudo_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        CartaAdeudo: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube la Carta de Adeudo del cliente"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const HandleEdoCuenta = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Estado_Cuenta_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        EdoCuenta: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube el estado de cuenta del cliente"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }
  
  const HandlePrecalificacionINFONAVIT = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Precalificacion_INFONAVIT_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        PrecalificacionINFONAVIT: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube la Precalificación de INFONAVIT del cliente"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }
  
  const HandleConstanciaDerechos = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Constancia_Derechos_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        ConstanciaDerechos: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube la Constancia de Derechos del cliente"
        })
      })
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
        message={"Documento cargado y registro exitoso"}
        onClick={() => {setShow(false)}}
        button={"Aceptar"}
      />

      <div className='container mt-5 mb-4'>
        <h3>Documentos del cliente</h3>
      </div>
      
      <div className='row text-start mx-5 px-5'>

          <form >
            <div className="mb-3">
              <label for="ine" className="form-label">INE</label>
              <input className="form-control" onChange={(e) => setIne(e.target.files[0])} type="file" id="ine" />
              <button type='button' onClick={handleINE} className='btn btn-secondary my-3' >Subir archivo</button>
            </div>
          </form>

          <form >
            <div className="mb-3">
              <label for="curp" className="form-label">CURP</label>
              <input className="form-control" onChange={(e) => setCurp(e.target.files[0])} type="file" id="curp" />
              <button type='button' onClick={handleCURP} className='btn btn-secondary my-3' >Subir archivo</button>
            </div>
          </form>

          <form >
            <div className="mb-3">
              <label for="actnac" className="form-label">Acta de nacimiento</label>
              <input className="form-control" onChange={(e) => setactaNac(e.target.files[0])} type="file" id="actnac" />
              <button type='button' onClick={handleActaNac} className='btn btn-secondary my-3' >Subir archivo</button>
            </div>
          </form>

          <form >
            <div className="mb-3">
              <label for="actaMatrimonioCliente" className="form-label">Acta de Matrimonio</label>
              <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="actaMatrimonioCliente" />
              <button type='button' onClick={handleActaMatrimonioCliente} className='btn btn-secondary my-3' >Subir archivo</button>
            </div>
          </form>

      </div>

      <div className='container mt-5 mb-4'>
        <h3>Documentos del trámite</h3>
      </div>
      
      <div className='row text-start mx-5 px-5'>

          <form >
            <div className="mb-3">
              <label for="predial" className="form-label">Recibo de Predial</label>
              <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="predial" />
              <button type='button' onClick={handlePredial} className='btn btn-secondary my-3' >Subir archivo</button>
            </div>
          </form>

          <form >
            <div className="mb-3">
              <label for="noadeudopredial" className="form-label">Comprobante de no adeudo predial</label>
              <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="noadeudopredial" />
              <button type='button' onClick={handleNoAdeudoPredial} className='btn btn-secondary my-3' >Subir archivo</button>
            </div>
          </form>

          <form >
            <div className="mb-3">
              <label for="agua" className="form-label">Recibo de pago del Agua</label>
              <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="agua" />
              <button type='button' onClick={handleAgua} className='btn btn-secondary my-3' >Subir archivo</button>
            </div>
          </form>
          
          <form >
            <div className="mb-3">
              <label for="NoAdagua" className="form-label">Comprobante de no adeudo de Agua</label>
              <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="NoAdagua" />
              <button type='button' onClick={handleNoAdeudoAgua} className='btn btn-secondary my-3' >Subir archivo</button>
            </div>
          </form>

          <form >
            <div className="mb-3">
              <label for="escritura" className="form-label">Escritura Pública de Compra Venta con boleta registral y hoja de transmisión patrimonial</label>
              <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="escritura" />
              <button type='button' onClick={HandleEscrituraPublica} className='btn btn-secondary my-3' >Subir archivo</button>
            </div>
          </form>
          
          <form >
            <div className="mb-3">
              <label for="cert" className="form-label">Certificado de existencia o inexistencia de gravamen</label>
              <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="cert" />
              <button type='button' onClick={HandleGravamen} className='btn btn-secondary my-3' >Subir archivo</button>
            </div>
          </form>

          <form >
            <div className="mb-3">
              <label for="talon" className="form-label">Talón de Nómina</label>
              <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="talon" />
              <button type='button' onClick={HandleNomina} className='btn btn-secondary my-3' >Subir archivo</button>
            </div>
          </form>

          <form >
            <div className="mb-3">
              <label for="cuotas" className="form-label">Recibo de pago de Cuotas Condominales</label>
              <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="cuotas" />
              <button type='button' onClick={HandleCuotasCondominales} className='btn btn-secondary my-3' >Subir archivo</button>
            </div>
          </form>

          <form >
            <div className="mb-3">
              <label for="constanciaNoAdeudo" className="form-label">Constancia de no adeudo de Cuotas Condominales</label>
              <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="constanciaNoAdeudo" />
              <button type='button' onClick={HandleNoAdeudoCuotasCondominales} className='btn btn-secondary my-3' >Subir archivo</button>
            </div>
          </form>

          <form >
            <div className="mb-3">
              <label for="licencia" className="form-label">Licencia de alineamiento y número oficial</label>
              <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="licencia" />
              <button type='button' onClick={HandleLicenciaAlineamiento} className='btn btn-secondary my-3' >Subir archivo</button>
            </div>
          </form>

          <form >
            <div className="mb-3">
              <label for="cartaNoAdeudo" className="form-label">Carta de adeudo, Saldo o Condicionada al Pago</label>
              <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="cartaNoAdeudo" />
              <button type='button' onClick={HandleCartaAdeudo} className='btn btn-secondary my-3' >Subir archivo</button>
            </div>
          </form>

          <form >
            <div className="mb-3">
              <label for="estadoCta" className="form-label">Estado de cuenta con clabe interbancaria a nombre del afiliado</label>
              <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="estadoCta" />
              <button type='button' onClick={HandleEdoCuenta} className='btn btn-secondary my-3' >Subir archivo</button>
            </div>
          </form>

          <form >
            <div className="mb-3">
              <label for="precalificacion" className="form-label">Precalificación de INFONAVIT</label>
              <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="precalificacion" />
              <button type='button' onClick={HandlePrecalificacionINFONAVIT} className='btn btn-secondary my-3' >Subir archivo</button>
            </div>
          </form>

          <form >
            <div className="mb-3">
              <label for="vigencia" className="form-label">Constancia de Vigencia de Derechos. Observaciones</label>
              <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="vigencia" />
              <button type='button' onClick={HandleConstanciaDerechos} className='btn btn-secondary my-3' >Subir archivo</button>
            </div>
          </form>

      </div>
      
    </>
  )
}
