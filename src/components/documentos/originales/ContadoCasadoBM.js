import React, { useState } from 'react'
import { db, storage } from '@/firebase/config'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore"
import ModalG from '../ModalG'

export default function ContadoCasadoBM(props) {

  const [ine, setIne] = useState(null)
  const [curp, setCurp] = useState(null)
  const [rfc, setRfc] = useState(null)
  const [compDom, setCompDom] = useState(null)
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

  const handleRFC = async () => {
    if (rfc == null) return;
    try {
      const rfcRef = ref(storage, `${props.id}/RFCCliente_${rfc.name}`)
      const carg = await uploadBytes(rfcRef, rfc)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        RFC: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento de RFC"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleCompDom = async () => {
    if (compDom == null) return;
    try {
      const Ref = ref(storage, `${props.id}/ComprobanteDomicilioCliente_${compDom.name}`)
      const carg = await uploadBytes(Ref, compDom)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        CompDom: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento de Comprobante de domicilio"
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

  const handleCarta = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/CartaGeneralCliente_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        CartaG: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento de Carta General"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleINEV = async () => {
    if (currentfile == null) return;
    try {
      const ineRef = ref(storage, `${props.id}/INEVendedor_${currentfile.name}`)
      const carg = await uploadBytes(ineRef, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        INEV: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento de INE del dueño de la propiedad"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleCURPV = async () => {
    if (currentfile == null) return;
    try {
      const curpRef = ref(storage, `${props.id}/CURPVendedor_${currentfile.name}`)
      const carg = await uploadBytes(curpRef, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        CURPV: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento de CURP del dueño de la propiedad"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleRFCV = async () => {
    if (currentfile == null) return;
    try {
      const rfcRef = ref(storage, `${props.id}/RFCVendedor_${currentfile.name}`)
      const carg = await uploadBytes(rfcRef, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        RFCV: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento de RFC del dueño de la propiedad"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleCompDomV = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/ComprobanteDomicilioVendedor_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        CompDomV: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento de Comprobante de domicilio del dueño de la propiedad"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleActaNacV = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/ActaNacimientoVendedor_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        ActNacV: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento de acta de nacimiento del dueño de la propiedad"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleEscritura = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/EscrituraVendedor_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        EscrituraV: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento de escritura del dueño de la propiedad"
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
      const Ref = ref(storage, `${props.id}/PredialVendedor_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        PredialV: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento de predial del dueño de la propiedad"
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
      const Ref = ref(storage, `${props.id}/CompNoAdeudoPredialVendedor_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        NoAdeudoPredialV: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube el comprobante de no adeudo de predial del dueño de la propiedad"
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
      const Ref = ref(storage, `${props.id}/AguaVendedor_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        AguaV: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento del agua del dueño de la propiedad"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleEstadoCta = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/EstadoCtaVendedor_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        EstadoCtaV: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento de Estado de Cuenta del dueño de la propiedad"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleActaMat = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Acta_Matrimonio_vendedor_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        ActaMatrimonioVendedor: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube el acta de matrimonio del dueño de la propiedad"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleINEConyuge = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/INE_Conguge_vendedor_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        IneConyugeVendedor: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el INE del conyuge del dueño de la propiedad"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleRFCConyuge = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/RFC_Conguge_vendedor_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        RfcConyugeVendedor: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el RFC del conyuge del dueño de la propiedad"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleActNacConyuge = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/ActNac_Conguge_vendedor_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        ActNacConyugeVendedor: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el acta de nacimiento del conyuge del dueño de la propiedad"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleCurpConyuge = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/CURP_Conguge_vendedor_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        CURPConyugeVendedor: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el CURP del conyuge del dueño de la propiedad"
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

  const handleIneConyugeCliente = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/INE_Conyuge_Cliente_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        IneConyugeCliente: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el INE del cónyuge del cliente"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleRfcConyugeCliente = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/RFC_Conyuge_Cliente_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        RfcConyugeCliente: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el RFC del cónyuge del cliente"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleActNacConyugeCliente = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/ActNac_Conyuge_Cliente_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        ActNacConyugeCliente: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el Acta de nacimiento del cónyuge del cliente"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleCurpConyugeCliente = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Curp_Conyuge_Cliente_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        CurpConyugeCliente: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el CURP del cónyuge del cliente"
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
              <label for="rfc" className="form-label">RFC</label>
              <input className="form-control" onChange={(e) => setRfc(e.target.files[0])} type="file" id="rfc" />
              <button type='button' onClick={handleRFC} className='btn btn-secondary my-3' >Subir archivo</button>
            </div>
          </form>

          <form >
            <div className="mb-3">
              <label for="compdom" className="form-label">Comprobante de domicilio</label>
              <input className="form-control" onChange={(e) => setCompDom(e.target.files[0])} type="file" id="compdom" />
              <button type='button' onClick={handleCompDom} className='btn btn-secondary my-3' >Subir archivo</button>
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
              <label for="carta" className="form-label">Carta General</label>
              <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="carta" />
              <button type='button' onClick={handleCarta} className='btn btn-secondary my-3' >Subir archivo</button>
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
        <h3>Documentos del Cónyuge (cliente)</h3>
      </div>
      
      <div className='row text-start mx-5 px-5'>

        <form >
          <div className="mb-3">
            <label for="INEConyugeCliente" className="form-label">INE</label>
            <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="INEConyugeCliente" />
            <button type='button' onClick={handleIneConyugeCliente} className='btn btn-secondary my-3' >Subir archivo</button>
          </div>
        </form>

        <form >
          <div className="mb-3">
            <label for="RFCConyugeCliente" className="form-label">RFC</label>
            <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="RFCConyugeCliente" />
            <button type='button' onClick={handleRfcConyugeCliente} className='btn btn-secondary my-3' >Subir archivo</button>
          </div>
        </form>

        <form >
          <div className="mb-3">
            <label for="ActNacConyugeCliente" className="form-label">Acta de Nacimiento</label>
            <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="ActNacConyugeCliente" />
            <button type='button' onClick={handleActNacConyugeCliente} className='btn btn-secondary my-3' >Subir archivo</button>
          </div>
        </form>

        <form >
          <div className="mb-3">
            <label for="CURPConyugeCliente" className="form-label">CURP</label>
            <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="CURPConyugeCliente" />
            <button type='button' onClick={handleCurpConyugeCliente} className='btn btn-secondary my-3' >Subir archivo</button>
          </div>
        </form>

      </div>

      <div className='container mt-5 mb-4'>
        <h3>Documentos de quien vende la propiedad</h3>
      </div>
      
      <div className='row text-start mx-5 px-5'>

          <form >
            <div className="mb-3">
              <label for="ineV" className="form-label">INE vendedor</label>
              <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="ineV" />
              <button type='button' onClick={handleINEV} className='btn btn-secondary my-3' >Subir archivo</button>
            </div>
          </form>

          <form >
            <div className="mb-3">
              <label for="curpV" className="form-label">CURP vendedor</label>
              <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="curpV" />
              <button type='button' onClick={handleCURPV} className='btn btn-secondary my-3' >Subir archivo</button>
            </div>
          </form>

          <form >
            <div className="mb-3">
              <label for="rfcV" className="form-label">RFC vendedor</label>
              <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="rfcV" />
              <button type='button' onClick={handleRFCV} className='btn btn-secondary my-3' >Subir archivo</button>
            </div>
          </form>

          <form >
            <div className="mb-3">
              <label for="compdomV" className="form-label">Comprobante de domicilio vendedor</label>
              <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="compdomV" />
              <button type='button' onClick={handleCompDomV} className='btn btn-secondary my-3' >Subir archivo</button>
            </div>
          </form>

          <form >
            <div className="mb-3">
              <label for="actaV" className="form-label">Acta de nacimiento vendedor</label>
              <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="actaV" />
              <button type='button' onClick={handleActaNacV} className='btn btn-secondary my-3' >Subir archivo</button>
            </div>
          </form>

          <form >
            <div className="mb-3">
              <label for="escritura" className="form-label">Escritura</label>
              <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="escritura" />
              <button type='button' onClick={handleEscritura} className='btn btn-secondary my-3' >Subir archivo</button>
            </div>
          </form>

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
              <label for="agua" className="form-label">No adeudo Agua</label>
              <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="agua" />
              <button type='button' onClick={handleAgua} className='btn btn-secondary my-3' >Subir archivo</button>
            </div>
          </form>

          <form >
            <div className="mb-3">
              <label for="estadoCta" className="form-label">Estado de Cuenta</label>
              <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="estadoCta" />
              <button type='button' onClick={handleEstadoCta} className='btn btn-secondary my-3' >Subir archivo</button>
            </div>
          </form>

      </div>

      <div className='container mt-5 mb-4'>
        <h3>En caso de que quien vende la propiedad está casado: (Documentos del cónyuge)</h3>
      </div>
      
      <div className='row text-start mx-5 px-5'>

        <form >
          <div className="mb-3">
            <label for="actaMatrimonio" className="form-label">Acta de matrimonio</label>
            <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="actaMatrimonio" />
            <button type='button' onClick={handleActaMat} className='btn btn-secondary my-3' >Subir archivo</button>
          </div>
        </form>

        <form >
          <div className="mb-3">
            <label for="INEConyugeVendedor" className="form-label">INE del cónyuge</label>
            <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="INEConyugeVendedor" />
            <button type='button' onClick={handleINEConyuge} className='btn btn-secondary my-3' >Subir archivo</button>
          </div>
        </form>

        <form >
          <div className="mb-3">
            <label for="RFCConyugeVendedor" className="form-label">RFC del cónyuge</label>
            <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="RFCConyugeVendedor" />
            <button type='button' onClick={handleRFCConyuge} className='btn btn-secondary my-3' >Subir archivo</button>
          </div>
        </form>

        <form >
          <div className="mb-3">
            <label for="ActaNacConyugeVendedor" className="form-label">Acta de nacimiento del cónyuge</label>
            <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="ActaNacConyugeVendedor" />
            <button type='button' onClick={handleActNacConyuge} className='btn btn-secondary my-3' >Subir archivo</button>
          </div>
        </form>

        <form >
          <div className="mb-3">
            <label for="CURPConyugeVendedor" className="form-label">CURP del cónyuge</label>
            <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="CURPConyugeVendedor" />
            <button type='button' onClick={handleCurpConyuge} className='btn btn-secondary my-3' >Subir archivo</button>
          </div>
        </form>

      </div>
      
    </>
  )
}
