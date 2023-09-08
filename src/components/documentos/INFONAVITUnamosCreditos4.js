import React, { useState } from 'react'
import { db, storage } from '@/firebase/config'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore"
import ModalG from '../ModalG'
import Accordion from 'react-bootstrap/Accordion'

export default function INFONAVITUnamosCreditos4(props) {

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
          comentario: "Se sube documento de INE del cliente 1"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleINE2 = async () => {
    if (ine == null) return;
    try {
      const ineRef = ref(storage, `${props.id}/INECliente2_${ine.name}`)
      const carg = await uploadBytes(ineRef, ine)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        INE2: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento de INE del cliente 2"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleINE3 = async () => {
    if (ine == null) return;
    try {
      const ineRef = ref(storage, `${props.id}/INECliente3_${ine.name}`)
      const carg = await uploadBytes(ineRef, ine)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        INE3: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento de INE del cliente 3"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleINE4 = async () => {
    if (ine == null) return;
    try {
      const ineRef = ref(storage, `${props.id}/INECliente4_${ine.name}`)
      const carg = await uploadBytes(ineRef, ine)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        INE4: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento de INE del cliente 4"
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
          comentario: "Se sube documento de CURP del cliente 1"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleCURP2 = async () => {
    if (curp == null) return;
    try {
      const curpRef = ref(storage, `${props.id}/CURPCliente2_${curp.name}`)
      const carg = await uploadBytes(curpRef, curp)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        CURP2: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento de CURP del cliente 2"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleCURP3 = async () => {
    if (curp == null) return;
    try {
      const curpRef = ref(storage, `${props.id}/CURPCliente3_${curp.name}`)
      const carg = await uploadBytes(curpRef, curp)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        CURP3: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento de CURP del cliente 3"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleCURP4 = async () => {
    if (curp == null) return;
    try {
      const curpRef = ref(storage, `${props.id}/CURPCliente4_${curp.name}`)
      const carg = await uploadBytes(curpRef, curp)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        CURP4: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento de CURP del cliente 4"
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
          comentario: "Se sube documento de RFC del cliente 1"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleRFC2 = async () => {
    if (rfc == null) return;
    try {
      const rfcRef = ref(storage, `${props.id}/RFCCliente2_${rfc.name}`)
      const carg = await uploadBytes(rfcRef, rfc)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        RFC2: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento de RFC del cliente 2"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleRFC3 = async () => {
    if (rfc == null) return;
    try {
      const rfcRef = ref(storage, `${props.id}/RFCCliente3_${rfc.name}`)
      const carg = await uploadBytes(rfcRef, rfc)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        RFC3: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento de RFC del cliente 3"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleRFC4 = async () => {
    if (rfc == null) return;
    try {
      const rfcRef = ref(storage, `${props.id}/RFCCliente4_${rfc.name}`)
      const carg = await uploadBytes(rfcRef, rfc)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        RFC4: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento de RFC del cliente 4"
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
          comentario: "Se sube documento de Comprobante de domicilio del cliente 1"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleCompDom2 = async () => {
    if (compDom == null) return;
    try {
      const Ref = ref(storage, `${props.id}/ComprobanteDomicilioCliente2_${compDom.name}`)
      const carg = await uploadBytes(Ref, compDom)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        CompDom2: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento de Comprobante de domicilio el cliente 2"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleCompDom3 = async () => {
    if (compDom == null) return;
    try {
      const Ref = ref(storage, `${props.id}/ComprobanteDomicilioCliente3_${compDom.name}`)
      const carg = await uploadBytes(Ref, compDom)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        CompDom3: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento de Comprobante de domicilio el cliente 3"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleCompDom4 = async () => {
    if (compDom == null) return;
    try {
      const Ref = ref(storage, `${props.id}/ComprobanteDomicilioCliente4_${compDom.name}`)
      const carg = await uploadBytes(Ref, compDom)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        CompDom4: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento de Comprobante de domicilio el cliente 4"
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
      const Ref = ref(storage, `${props.id}/ActaNacimiento_Cliente_${actaNac.name}`)
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
          comentario: "Se sube documento de acta de nacimiento del cliente 1"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleActaNac2 = async () => {
    if (actaNac == null) return;
    try {
      const Ref = ref(storage, `${props.id}/ActaNacimiento_Cliente2_${actaNac.name}`)
      const carg = await uploadBytes(Ref, actaNac)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        ActNac2: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento de acta de nacimiento del cliente 2"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleActaNac3 = async () => {
    if (actaNac == null) return;
    try {
      const Ref = ref(storage, `${props.id}/ActaNacimiento_Cliente3_${actaNac.name}`)
      const carg = await uploadBytes(Ref, actaNac)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        ActNac3: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento de acta de nacimiento del cliente 3"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleActaNac4 = async () => {
    if (actaNac == null) return;
    try {
      const Ref = ref(storage, `${props.id}/ActaNacimiento_Cliente4_${actaNac.name}`)
      const carg = await uploadBytes(Ref, actaNac)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        ActNac4: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento de acta de nacimiento del cliente 4"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleFormato = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/FormatoGeneral_Cliente_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        FormatoG: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento de Formato General del cliente 1"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleFormato2 = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/FormatoGeneral_Cliente2_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        FormatoG2: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento de Formato General del cliente 2"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleFormato3 = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/FormatoGeneral_Cliente3_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        FormatoG3: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento de Formato General del cliente 3"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleFormato4 = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/FormatoGeneral_Cliente4_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        FormatoG4: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento de Formato General del cliente 4"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleTaller = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Taller_saber_Cliente_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        TallerSaberCliente: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el comprobante del Taller Saber para decidir del cliente 1"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleTaller2 = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Taller_saber_Cliente2_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        TallerSaberCliente2: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el comprobante del Taller Saber para decidir del cliente 2"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleTaller3 = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Taller_saber_Cliente3_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        TallerSaberCliente3: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el comprobante del Taller Saber para decidir del cliente 3"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleTaller4 = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Taller_saber_Cliente4_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        TallerSaberCliente4: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el comprobante del Taller Saber para decidir del cliente 4"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handlePrecalificacion = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Precalificacion_Cliente_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        PrecalificacionCliente: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el documento de precalificación de INFONAVIT del cliente 1"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handlePrecalificacion2 = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Precalificacion_Cliente2_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        PrecalificacionCliente2: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el documento de precalificación de INFONAVIT del cliente 2"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handlePrecalificacion3 = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Precalificacion_Cliente3_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        PrecalificacionCliente3: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el documento de precalificación de INFONAVIT del cliente 3"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handlePrecalificacion4 = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Precalificacion_Cliente4_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        PrecalificacionCliente4: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el documento de precalificación de INFONAVIT del cliente 4"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleSolicitud = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Solicitud_Credito_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        SolicitudCreditoCliente: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió la solicitud de crédito del cliente 1"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleSolicitud2 = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Solicitud_Credito2_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        SolicitudCreditoCliente2: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió la solicitud de crédito del cliente 2"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleSolicitud3 = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Solicitud_Credito3_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        SolicitudCreditoCliente3: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió la solicitud de crédito del cliente 3"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleSolicitud4 = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Solicitud_Credito4_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        SolicitudCreditoCliente4: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió la solicitud de crédito del cliente 4"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }
  
  const handleSIC = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/SIC_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        SIC: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el SIC del cliente 1"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleSIC2 = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/SIC2_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        SIC2: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el SIC del cliente 2"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleSIC3 = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/SIC3_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        SIC3: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el SIC del cliente 3"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleSIC4 = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/SIC4_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        SIC4: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el SIC del cliente 4"
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

  const handleIneConyugeCliente2 = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/INE_Conyuge_Cliente2_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        IneConyugeCliente2: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el INE del cónyuge del cliente 2"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleIneConyugeCliente3 = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/INE_Conyuge_Cliente3_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        IneConyugeCliente3: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el INE del cónyuge del cliente 3"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleIneConyugeCliente4 = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/INE_Conyuge_Cliente4_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        IneConyugeCliente4: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el INE del cónyuge del cliente 4"
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

  const handleRfcConyugeCliente2 = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/RFC_Conyuge_Cliente2_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        RfcConyugeCliente2: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el RFC del cónyuge del cliente 2"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleRfcConyugeCliente3 = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/RFC_Conyuge_Cliente3_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        RfcConyugeCliente3: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el RFC del cónyuge del cliente 3"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleRfcConyugeCliente4 = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/RFC_Conyuge_Cliente4_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        RfcConyugeCliente4: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el RFC del cónyuge del cliente 4"
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

  const handleActNacConyugeCliente2 = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/ActNac_Conyuge_Cliente2_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        ActNacConyugeCliente2: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el Acta de nacimiento del cónyuge del cliente 2"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleActNacConyugeCliente3 = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/ActNac_Conyuge_Cliente3_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        ActNacConyugeCliente3: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el Acta de nacimiento del cónyuge del cliente 3"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleActNacConyugeCliente4 = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/ActNac_Conyuge_Cliente4_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        ActNacConyugeCliente4: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el Acta de nacimiento del cónyuge del cliente 4"
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

  const handleCurpConyugeCliente2 = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Curp_Conyuge_Cliente2_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        CurpConyugeCliente2: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el CURP del cónyuge del cliente 2"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleCurpConyugeCliente3 = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Curp_Conyuge_Cliente3_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        CurpConyugeCliente3: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el CURP del cónyuge del cliente 3"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleCurpConyugeCliente4 = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Curp_Conyuge_Cliente4_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        CurpConyugeCliente4: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el CURP del cónyuge del cliente 4"
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

  const handleActaConst = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Acta_Constitutiva_Vendedor_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        ActaConstitutivaV: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube la Acta Constitutiva del dueño de la propiedad"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleMemoria = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Memoria_descriptiva_Vendedor_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        MemoriaDescriptivaV: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube la memoria descriptiva del dueño de la propiedad"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }
  
  const handlePlano = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Plano_Arquitectonico_Vendedor_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        PlanoArqV: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube el Plano Arquitectónico del dueño de la propiedad"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleHabitabilidad = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Habitabilidad_Vendedor_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        HabitabilidadV: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube el documento de Habitabilidad del dueño de la propiedad"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleLuz = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Recibos_Luz_Vendedor_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        RecibosLuzV: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube el pimer recibo de luz del dueño de la propiedad"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleLuz2 = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Recibos_Luz2_Vendedor_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        RecibosLuzV2: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube el segundo recibo de luz del dueño de la propiedad"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleLuz3 = async () => {
    if (currentfile == null) return;
    try {
      const Ref = ref(storage, `${props.id}/Recibos_Luz3_Vendedor_${currentfile.name}`)
      const carg = await uploadBytes(Ref, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        RecibosLuzV3: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube el tercer recibo de luz del dueño de la propiedad"
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

  return (
    <>
      <ModalG
        show={show}
        onHide={() => {setShow(false)}}
        message={"Documento cargado y registro exitoso"}
        onClick={() => {setShow(false)}}
        button={"Aceptar"}
      />

      <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Cliente 1</Accordion.Header>
          <Accordion.Body>
            
          <div className='row text-start mx-3 my-3'>

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
                <label for="carta" className="form-label">Formato General</label>
                <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="carta" />
                <button type='button' onClick={handleFormato} className='btn btn-secondary my-3' >Subir archivo</button>
              </div>
            </form>

            <form >
              <div className="mb-3">
                <label for="taller" className="form-label">Taller: Saber para decidir</label>
                <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="taller" />
                <button type='button' onClick={handleTaller} className='btn btn-secondary my-3' >Subir archivo</button>
              </div>
            </form>

            <form >
              <div className="mb-3">
                <label for="precal" className="form-label">Precalificación</label>
                <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="precal" />
                <button type='button' onClick={handlePrecalificacion} className='btn btn-secondary my-3' >Subir archivo</button>
              </div>
            </form>

            <form >
              <div className="mb-3">
                <label for="solicitud" className="form-label">Solicitud de crédito</label>
                <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="solicitud" />
                <button type='button' onClick={handleSolicitud} className='btn btn-secondary my-3' >Subir archivo</button>
              </div>
            </form>

            <form >
              <div className="mb-3">
                <label for="sic" className="form-label">SIC</label>
                <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="sic" />
                <button type='button' onClick={handleSIC} className='btn btn-secondary my-3' >Subir archivo</button>
              </div>
            </form>

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

                <form >
                  <div className="mb-3">
                    <label for="INEConyugeCliente" className="form-label">INE del cónyuge del cliente 1</label>
                    <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="INEConyugeCliente" />
                    <button type='button' onClick={handleIneConyugeCliente} className='btn btn-secondary my-3' >Subir archivo</button>
                  </div>
                </form>

                <form >
                  <div className="mb-3">
                    <label for="RFCConyugeCliente" className="form-label">RFC del cónyuge del cliente 1</label>
                    <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="RFCConyugeCliente" />
                    <button type='button' onClick={handleRfcConyugeCliente} className='btn btn-secondary my-3' >Subir archivo</button>
                  </div>
                </form>

                <form >
                  <div className="mb-3">
                    <label for="ActNacConyugeCliente" className="form-label">Acta de Nacimiento del cónyuge del cliente 1</label>
                    <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="ActNacConyugeCliente" />
                    <button type='button' onClick={handleActNacConyugeCliente} className='btn btn-secondary my-3' >Subir archivo</button>
                  </div>
                </form>

                <form >
                  <div className="mb-3">
                    <label for="CURPConyugeCliente" className="form-label">CURP del cónyuge del cliente 1</label>
                    <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="CURPConyugeCliente" />
                    <button type='button' onClick={handleCurpConyugeCliente} className='btn btn-secondary my-3' >Subir archivo</button>
                  </div>
                </form>

              </div>

            </Accordion.Body>
          </Accordion.Item>
          )
        }
        <Accordion.Item eventKey="2">
          <Accordion.Header>Cliente 2</Accordion.Header>
          <Accordion.Body>
            <div className='row text-start mx-3 my-3'>

              <form >
                <div className="mb-3">
                  <label for="ine2" className="form-label">INE Cliente 2</label>
                  <input className="form-control" onChange={(e) => setIne(e.target.files[0])} type="file" id="ine2" />
                  <button type='button' onClick={handleINE2} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="curp2" className="form-label">CURP Cliente 2</label>
                  <input className="form-control" onChange={(e) => setCurp(e.target.files[0])} type="file" id="curp2" />
                  <button type='button' onClick={handleCURP2} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="rfc2" className="form-label">RFC cliente 2</label>
                  <input className="form-control" onChange={(e) => setRfc(e.target.files[0])} type="file" id="rfc2" />
                  <button type='button' onClick={handleRFC2} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="compdom2" className="form-label">Comprobante de domicilio cliente 2</label>
                  <input className="form-control" onChange={(e) => setCompDom(e.target.files[0])} type="file" id="compdom2" />
                  <button type='button' onClick={handleCompDom2} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="actnac2" className="form-label">Acta de nacimiento cliente 2</label>
                  <input className="form-control" onChange={(e) => setactaNac(e.target.files[0])} type="file" id="actnac2" />
                  <button type='button' onClick={handleActaNac2} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="carta2" className="form-label">Formato General cliente 2</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="carta2" />
                  <button type='button' onClick={handleFormato2} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="taller2" className="form-label">Taller: Saber para decidir cliente 2</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="taller2" />
                  <button type='button' onClick={handleTaller2} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="precal2" className="form-label">Precalificación cliente 2</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="precal2" />
                  <button type='button' onClick={handlePrecalificacion2} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="solicitud2" className="form-label">Solicitud de crédito del cliente 2</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="solicitud2" />
                  <button type='button' onClick={handleSolicitud2} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="sic2" className="form-label">SIC del cliente 2</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="sic2" />
                  <button type='button' onClick={handleSIC2} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

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

                <form >
                  <div className="mb-3">
                    <label for="INEConyugeCliente2" className="form-label">INE del cónyuge del cliente 2</label>
                    <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="INEConyugeCliente2" />
                    <button type='button' onClick={handleIneConyugeCliente2} className='btn btn-secondary my-3' >Subir archivo</button>
                  </div>
                </form>

                <form >
                  <div className="mb-3">
                    <label for="RFCConyugeCliente2" className="form-label">RFC del cónyuge del cliente 2</label>
                    <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="RFCConyugeCliente2" />
                    <button type='button' onClick={handleRfcConyugeCliente2} className='btn btn-secondary my-3' >Subir archivo</button>
                  </div>
                </form>

                <form >
                  <div className="mb-3">
                    <label for="ActNacConyugeCliente2" className="form-label">Acta de Nacimiento del cónyuge del cliente 2</label>
                    <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="ActNacConyugeCliente2" />
                    <button type='button' onClick={handleActNacConyugeCliente2} className='btn btn-secondary my-3' >Subir archivo</button>
                  </div>
                </form>

                <form >
                  <div className="mb-3">
                    <label for="CURPConyugeCliente2" className="form-label">CURP del cónyuge del cliente 2</label>
                    <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="CURPConyugeCliente2" />
                    <button type='button' onClick={handleCurpConyugeCliente2} className='btn btn-secondary my-3' >Subir archivo</button>
                  </div>
                </form>

              </div>

            </Accordion.Body>
          </Accordion.Item>
          )
        }
        <Accordion.Item eventKey="4">
          <Accordion.Header>Cliente 3</Accordion.Header>
          <Accordion.Body>
            
            <div className='row text-start mx-3 my-3'>

              <form >
                <div className="mb-3">
                  <label for="ine3" className="form-label">INE Cliente 3</label>
                  <input className="form-control" onChange={(e) => setIne(e.target.files[0])} type="file" id="ine3" />
                  <button type='button' onClick={handleINE3} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="curp3" className="form-label">CURP Cliente 3</label>
                  <input className="form-control" onChange={(e) => setCurp(e.target.files[0])} type="file" id="curp3" />
                  <button type='button' onClick={handleCURP3} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="rfc3" className="form-label">RFC cliente 3</label>
                  <input className="form-control" onChange={(e) => setRfc(e.target.files[0])} type="file" id="rfc3" />
                  <button type='button' onClick={handleRFC3} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="compdom3" className="form-label">Comprobante de domicilio cliente 3</label>
                  <input className="form-control" onChange={(e) => setCompDom(e.target.files[0])} type="file" id="compdom3" />
                  <button type='button' onClick={handleCompDom3} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="actnac3" className="form-label">Acta de nacimiento cliente 3</label>
                  <input className="form-control" onChange={(e) => setactaNac(e.target.files[0])} type="file" id="actnac3" />
                  <button type='button' onClick={handleActaNac3} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="carta3" className="form-label">Formato General cliente 3</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="carta3" />
                  <button type='button' onClick={handleFormato3} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="taller3" className="form-label">Taller: Saber para decidir cliente 3</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="taller3" />
                  <button type='button' onClick={handleTaller3} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="precal3" className="form-label">Precalificación cliente 3</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="precal3" />
                  <button type='button' onClick={handlePrecalificacion3} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="solicitud3" className="form-label">Solicitud de crédito del cliente 3</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="solicitud3" />
                  <button type='button' onClick={handleSolicitud3} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="sic3" className="form-label">SIC del cliente 3</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="sic3" />
                  <button type='button' onClick={handleSIC3} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

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

                <form >
                  <div className="mb-3">
                    <label for="INEConyugeCliente3" className="form-label">INE del cónyuge del cliente 3</label>
                    <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="INEConyugeCliente3" />
                    <button type='button' onClick={handleIneConyugeCliente3} className='btn btn-secondary my-3' >Subir archivo</button>
                  </div>
                </form>

                <form >
                  <div className="mb-3">
                    <label for="RFCConyugeCliente3" className="form-label">RFC del cónyuge del cliente 3</label>
                    <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="RFCConyugeCliente3" />
                    <button type='button' onClick={handleRfcConyugeCliente3} className='btn btn-secondary my-3' >Subir archivo</button>
                  </div>
                </form>

                <form >
                  <div className="mb-3">
                    <label for="ActNacConyugeCliente3" className="form-label">Acta de Nacimiento del cónyuge del cliente 3</label>
                    <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="ActNacConyugeCliente3" />
                    <button type='button' onClick={handleActNacConyugeCliente3} className='btn btn-secondary my-3' >Subir archivo</button>
                  </div>
                </form>

                <form >
                  <div className="mb-3">
                    <label for="CURPConyugeCliente3" className="form-label">CURP del cónyuge del cliente 3</label>
                    <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="CURPConyugeCliente3" />
                    <button type='button' onClick={handleCurpConyugeCliente3} className='btn btn-secondary my-3' >Subir archivo</button>
                  </div>
                </form>

              </div>

            </Accordion.Body>
          </Accordion.Item>
          )
        }
        <Accordion.Item eventKey="6">
          <Accordion.Header>Cliente 4</Accordion.Header>
          <Accordion.Body>
            
          <div className='row text-start mx-3 my-3'>

            <form >
              <div className="mb-3">
                <label for="ine4" className="form-label">INE Cliente 4</label>
                <input className="form-control" onChange={(e) => setIne(e.target.files[0])} type="file" id="ine4" />
                <button type='button' onClick={handleINE4} className='btn btn-secondary my-3' >Subir archivo</button>
              </div>
            </form>

            <form >
              <div className="mb-3">
                <label for="curp4" className="form-label">CURP Cliente 4</label>
                <input className="form-control" onChange={(e) => setCurp(e.target.files[0])} type="file" id="curp4" />
                <button type='button' onClick={handleCURP4} className='btn btn-secondary my-3' >Subir archivo</button>
              </div>
            </form>

            <form >
              <div className="mb-3">
                <label for="rfc4" className="form-label">RFC cliente 4</label>
                <input className="form-control" onChange={(e) => setRfc(e.target.files[0])} type="file" id="rfc4" />
                <button type='button' onClick={handleRFC4} className='btn btn-secondary my-3' >Subir archivo</button>
              </div>
            </form>

            <form >
              <div className="mb-3">
                <label for="compdom4" className="form-label">Comprobante de domicilio cliente 4</label>
                <input className="form-control" onChange={(e) => setCompDom(e.target.files[0])} type="file" id="compdom4" />
                <button type='button' onClick={handleCompDom4} className='btn btn-secondary my-3' >Subir archivo</button>
              </div>
            </form>

            <form >
              <div className="mb-3">
                <label for="actnac4" className="form-label">Acta de nacimiento cliente 4</label>
                <input className="form-control" onChange={(e) => setactaNac(e.target.files[0])} type="file" id="actnac4" />
                <button type='button' onClick={handleActaNac4} className='btn btn-secondary my-3' >Subir archivo</button>
              </div>
            </form>

            <form >
              <div className="mb-3">
                <label for="carta4" className="form-label">Formato General cliente 4</label>
                <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="carta4" />
                <button type='button' onClick={handleFormato4} className='btn btn-secondary my-3' >Subir archivo</button>
              </div>
            </form>

            <form >
              <div className="mb-3">
                <label for="taller4" className="form-label">Taller: Saber para decidir cliente 4</label>
                <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="taller4" />
                <button type='button' onClick={handleTaller4} className='btn btn-secondary my-3' >Subir archivo</button>
              </div>
            </form>

            <form >
              <div className="mb-3">
                <label for="precal4" className="form-label">Precalificación cliente 4</label>
                <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="precal4" />
                <button type='button' onClick={handlePrecalificacion4} className='btn btn-secondary my-3' >Subir archivo</button>
              </div>
            </form>

            <form >
              <div className="mb-3">
                <label for="solicitud4" className="form-label">Solicitud de crédito del cliente 4</label>
                <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="solicitud4" />
                <button type='button' onClick={handleSolicitud4} className='btn btn-secondary my-3' >Subir archivo</button>
              </div>
            </form>

            <form >
              <div className="mb-3">
                <label for="sic4" className="form-label">SIC del cliente 4</label>
                <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="sic4" />
                <button type='button' onClick={handleSIC4} className='btn btn-secondary my-3' >Subir archivo</button>
              </div>
            </form>

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

              <form >
                <div className="mb-3">
                  <label for="INEConyugeCliente4" className="form-label">INE del cónyuge del cliente 4</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="INEConyugeCliente4" />
                  <button type='button' onClick={handleIneConyugeCliente4} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="RFCConyugeCliente4" className="form-label">RFC del cónyuge del cliente 4</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="RFCConyugeCliente4" />
                  <button type='button' onClick={handleRfcConyugeCliente4} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="ActNacConyugeCliente4" className="form-label">Acta de Nacimiento del cónyuge del cliente 4</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="ActNacConyugeCliente4" />
                  <button type='button' onClick={handleActNacConyugeCliente4} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="CURPConyugeCliente4" className="form-label">CURP del cónyuge del cliente 4</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="CURPConyugeCliente4" />
                  <button type='button' onClick={handleCurpConyugeCliente4} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

            </div>

            </Accordion.Body>
          </Accordion.Item>
          )
        }
        <Accordion.Item eventKey="8">
          <Accordion.Header>Documentos del vendedor de la propiedad</Accordion.Header>
          <Accordion.Body>
            
            <div className='row text-start mx-3 my-3'>

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
                  <label for="actaV" className="form-label">Acta de nacimiento vendedor</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="actaV" />
                  <button type='button' onClick={handleActaNacV} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="escritura" className="form-label">Escritura con Boleta y antecedentes</label>
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
                  <label for="agua" className="form-label">Comprobante de No adeudo Agua</label>
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

              <form >
                <div className="mb-3">
                  <label for="asctaV" className="form-label">Acta Constitutiva (En caso que aplique)</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="asctaV" />
                  <button type='button' onClick={handleActaConst} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="memoria" className="form-label">Memoria Descriptiva</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="memoria" />
                  <button type='button' onClick={handleMemoria} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="plano" className="form-label">Plano Arquitectónico</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="plano" />
                  <button type='button' onClick={handlePlano} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="hab" className="form-label">Habitabilidad / Manifestación de obra / Terminación de obra / Lic de construcción </label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="hab" />
                  <button type='button' onClick={handleHabitabilidad} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <p>3 últimos recibos de luz: </p>
              <form >
                <div className="mb-3">
                  <label for="luz" className="form-label">Recibo de Luz 1</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="luz" />
                  <button type='button' onClick={handleLuz} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>
              <form >
                <div className="mb-3">
                  <label for="luz2" className="form-label">Recibo de Luz 2</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="luz2" />
                  <button type='button' onClick={handleLuz2} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>
              <form >
                <div className="mb-3">
                  <label for="luz3" className="form-label">Recibo de Luz 3</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="luz3" />
                  <button type='button' onClick={handleLuz3} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

            </div>

          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="9">
          <Accordion.Header>¿El vendedor de la propiedad está casado? Documentos del cónyuge</Accordion.Header>
          <Accordion.Body>
            
            <div className='row text-start mx-3 my-3'>

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

          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      
    </>
  )
}
