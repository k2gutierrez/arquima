import React, { useState } from 'react'
import { db, storage } from '@/firebase/config'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore"
import { currencyMXN } from '@/formatCurrencyExample'
import ModalG from '../ModalG'

export default function BANCOCasado(props) {

  const [ine, setIne] = useState(null)
  const [rfc, setRfc] = useState(null)
  const [compDom, setCompDom] = useState(null)
  const [actaNac, setactaNac] = useState(null)
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
  const [pecoCon, setPesoCon] = useState(null)
  const [estaturaCon, setEstaturaCon]  = useState(null)
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
          pecoCon: pecoCon,
          estaturaCon: estaturaCon,
          tiempoDom: tiempoDom,
          statusDom: statusDom,
          dependientes: dependientes,
          depEdad1: depEdad1,
          depParen1: depParen1,
          valorPropiedad: currencyMXN(valorPropiedad)
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
          pecoCon: pecoCon,
          estaturaCon: estaturaCon,
          tiempoDom: tiempoDom,
          statusDom: statusDom,
          dependientes: dependientes,
          depEdad1: depEdad1,
          depParen1: depParen1,
          depEdad2: depEdad2,
          depParen2: depParen2,
          valorPropiedad: currencyMXN(valorPropiedad)
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
          pecoCon: pecoCon,
          estaturaCon: estaturaCon,
          tiempoDom: tiempoDom,
          statusDom: statusDom,
          dependientes: dependientes,
          depEdad1: depEdad1,
          depParen1: depParen1,
          depEdad2: depEdad2,
          depParen2: depParen2,
          depEdad3: depEdad3,
          depParen3: depParen3,
          valorPropiedad: currencyMXN(valorPropiedad)
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
          pecoCon: pecoCon,
          estaturaCon: estaturaCon,
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
          valorPropiedad: currencyMXN(valorPropiedad)
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
          pecoCon: pecoCon,
          estaturaCon: estaturaCon,
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
          valorPropiedad: currencyMXN(valorPropiedad)
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
          pecoCon: pecoCon,
          estaturaCon: estaturaCon,
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
          valorPropiedad: currencyMXN(valorPropiedad)
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
          pecoCon: pecoCon,
          estaturaCon: estaturaCon,
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
          valorPropiedad: currencyMXN(valorPropiedad)
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
          pecoCon: pecoCon,
          estaturaCon: estaturaCon,
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
          valorPropiedad: currencyMXN(valorPropiedad)
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
          pecoCon: pecoCon,
          estaturaCon: estaturaCon,
          tiempoDom: tiempoDom,
          statusDom: statusDom,
          dependientes: dependientes,
          valorPropiedad: currencyMXN(valorPropiedad)
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

  const handleCompDom2 = async () => {
    if (compDom == null) return;
    try {
      const Ref = ref(storage, `${props.id}/OtroComprobanteDomicilioCliente_${compDom.name}`)
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
          comentario: "Se sube el segundo documento de Comprobante de domicilio"
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
          comentario: "Se sube documento de acta de nacimiento del ciente"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleActaNacConyuge = async () => {
    if (actaNac == null) return;
    try {
      const Ref = ref(storage, `${props.id}/ActaNacimiento_Conyuge_${actaNac.name}`)
      const carg = await uploadBytes(Ref, actaNac)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        ActNacConyuge: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento de acta de nacimiento del conyuge"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const handleActaNacCoAcreditado = async () => {
    if (actaNac == null) return;
    try {
      const Ref = ref(storage, `${props.id}/ActaNacimiento_CoAcreditado_${actaNac.name}`)
      const carg = await uploadBytes(Ref, actaNac)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        ActNacCoAcreditado: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se sube documento de acta de nacimiento del coacreditado"
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

  const ReciboNomina1 = async () => {
    if (currentfile == null) return;
    try {
      const ineRef = ref(storage, `${props.id}/Recibo_Nomina_1_${currentfile.name}`)
      const carg = await uploadBytes(ineRef, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        Nomina1: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió un recibo de nómina del cliente"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const ReciboNomina2 = async () => {
    if (currentfile == null) return;
    try {
      const ineRef = ref(storage, `${props.id}/Recibo_Nomina_2_${currentfile.name}`)
      const carg = await uploadBytes(ineRef, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        Nomina2: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió un segundo recibo de nómina del cliente"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const ReciboNomina3 = async () => {
    if (currentfile == null) return;
    try {
      const ineRef = ref(storage, `${props.id}/Recibo_Nomina_3_${currentfile.name}`)
      const carg = await uploadBytes(ineRef, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        Nomina3: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió un tercer recibo de nómina del cliente"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const EstadoCuenta1 = async () => {
    if (currentfile == null) return;
    try {
      const ineRef = ref(storage, `${props.id}/Estado_Cuenta_1_${currentfile.name}`)
      const carg = await uploadBytes(ineRef, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        EdoCuenta1: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió un estado de cuenta del cliente"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const EstadoCuenta2 = async () => {
    if (currentfile == null) return;
    try {
      const ineRef = ref(storage, `${props.id}/Estado_Cuenta_2_${currentfile.name}`)
      const carg = await uploadBytes(ineRef, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        EdoCuenta2: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió un segundo estado de cuenta del cliente"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const EstadoCuenta3 = async () => {
    if (currentfile == null) return;
    try {
      const ineRef = ref(storage, `${props.id}/Estado_Cuenta_3_${currentfile.name}`)
      const carg = await uploadBytes(ineRef, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        EdoCuenta3: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió un tercer estado de cuenta del cliente"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const EstadoCuenta4 = async () => {
    if (currentfile == null) return;
    try {
      const ineRef = ref(storage, `${props.id}/Estado_Cuenta_4_${currentfile.name}`)
      const carg = await uploadBytes(ineRef, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        EdoCuenta4: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió un cuarto estado de cuenta del cliente"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const EstadoCuenta5 = async () => {
    if (currentfile == null) return;
    try {
      const ineRef = ref(storage, `${props.id}/Estado_Cuenta_5_${currentfile.name}`)
      const carg = await uploadBytes(ineRef, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        EdoCuenta5: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió un quinto estado de cuenta del cliente"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const EstadoCuenta6 = async () => {
    if (currentfile == null) return;
    try {
      const ineRef = ref(storage, `${props.id}/Estado_Cuenta_6_${currentfile.name}`)
      const carg = await uploadBytes(ineRef, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        EdoCuenta6: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió un sexto estado de cuenta del cliente"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

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

  const HandleAltaHacienda = async () => {
    if (currentfile == null) return;
    try {
      const ineRef = ref(storage, `${props.id}/Alta_Hacienda_${currentfile.name}`)
      const carg = await uploadBytes(ineRef, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        AltaHacienda: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió el Alta de Hacienda del cliente"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const HandleConstanciaFiscal = async () => {
    if (currentfile == null) return;
    try {
      const ineRef = ref(storage, `${props.id}/Constancia_situacion_Fiscal_${currentfile.name}`)
      const carg = await uploadBytes(ineRef, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        ConstanciaSituacionFiscal: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió la constancia de situación fiscal del cliente"
        })
      })
      setShow(true)

    } catch(e) {
      window.alert(e)
    }
  }

  const HandleCartaPersonal = async () => {
    if (currentfile == null) return;
    try {
      const ineRef = ref(storage, `${props.id}/Carta_Personal_${currentfile.name}`)
      const carg = await uploadBytes(ineRef, currentfile)
      
      const enlaceUrl = await getDownloadURL(carg.ref)
      const docRef = doc(db, 'clientes', props.id)
      await updateDoc(docRef, {
        CartaPersonal: {
          url: enlaceUrl,
          vendedor: true
        },
        historial: arrayUnion({
          registrado: props.currentUser,
          fecha: Timestamp.fromDate(new Date()),
          comentario: "Se subió la carta a título personal del cliente"
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

      <div className="accordion accordion-flush" id="accordionFlushExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
              Documentos del cliente
            </button>
          </h2>
          <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
            <div className='row text-start mx-5 px-5'>

              <form >
                <div className="mb-3">
                  <label for="ine" className="form-label">Identificación oficial vigente: IFE, INE o Pasaporte</label>
                  <input className="form-control" onChange={(e) => setIne(e.target.files[0])} type="file" id="ine" />
                  <button type='button' onClick={handleINE} className='btn btn-secondary my-3' >Subir archivo</button>
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
                  <label for="compdom" className="form-label">Comprobante de domicilio reciente (agua, luz, predio, cable, gas, cuenta bancaria)</label>
                  <input className="form-control" onChange={(e) => setCompDom(e.target.files[0])} type="file" id="compdom" />
                  <button type='button' onClick={handleCompDom} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="compdom" className="form-label">Otro comprobante de domicilio reciente (agua, luz, predio, cable, gas, cuenta bancaria)</label>
                  <input className="form-control" onChange={(e) => setCompDom(e.target.files[0])} type="file" id="compdom" />
                  <button type='button' onClick={handleCompDom2} className='btn btn-secondary my-3' >Subir archivo</button>
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
                  <label for="actnac" className="form-label">Acta de nacimiento de conyuge</label>
                  <input className="form-control" onChange={(e) => setactaNac(e.target.files[0])} type="file" id="actnac" />
                  <button type='button' onClick={handleActaNacConyuge} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="actnac" className="form-label">Acta de nacimiento de coacreditado (en caso que aplique)</label>
                  <input className="form-control" onChange={(e) => setactaNac(e.target.files[0])} type="file" id="actnac" />
                  <button type='button' onClick={handleActaNacCoAcreditado} className='btn btn-secondary my-3' >Subir archivo</button>
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
            
              <p className='mb-3'>últimos 3 recibos de nómina:</p>
              <form >
                <div className="mb-3">
                  <label for="nom1" className="form-label">Recibo de nómina 1:</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="nom1" />
                  <button type='button' onClick={ReciboNomina1} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="nom2" className="form-label">Recibo de nómina 2:</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="nom2" />
                  <button type='button' onClick={ReciboNomina2} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="nom3" className="form-label">Recibo de nómina 3:</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="nom3" />
                  <button type='button' onClick={ReciboNomina3} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <p className='mb-3'>Últimos 2 meses de estados de cuenta completos, donde depositen la nómina:</p>
              <form >
                
                <div className="mb-3">
                  <label for="edo1" className="form-label">Estado de cuenta 1</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="edo1" />
                  <button type='button' onClick={EstadoCuenta1} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="edo2" className="form-label">Estado de cuenta 2</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="edo2" />
                  <button type='button' onClick={EstadoCuenta2} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

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

              <form >
                <div className="mb-3">
                  <label for="alta" className="form-label">Alta de hacienda</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="alta" />
                  <button type='button' onClick={HandleAltaHacienda} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="situacionFiscal" className="form-label">Constancia de situación fiscal con mínimo de 2 años de inicio de operaciones</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="situacionFiscal" />
                  <button type='button' onClick={HandleConstanciaFiscal} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="cartaPersonal" className="form-label"> Carta a título personal, escrita a mano, donde indique su actividad, tiempo de realizarla e ingresos aproximados</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="cartaPersonal" />
                  <button type='button' onClick={HandleCartaPersonal} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <p className='mb-3'>Últimos 6 meses de estados de cuenta completos, donde reflejen ingresos mensuales</p>
              <form >
                <div className="mb-3">
                  <label for="estadoCuenta1" className="form-label">Estado de cuenta 1</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="estadoCuenta1" />
                  <button type='button' onClick={EstadoCuenta1} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="estadoCuenta2" className="form-label">Estado de cuenta 2</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="estadoCuenta2" />
                  <button type='button' onClick={EstadoCuenta2} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="estadoCuenta3" className="form-label">Estado de cuenta 3</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="estadoCuenta3" />
                  <button type='button' onClick={EstadoCuenta3} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="estadoCuenta4" className="form-label">Estado de cuenta 4</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="estadoCuenta4" />
                  <button type='button' onClick={EstadoCuenta4} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="estadoCuenta5" className="form-label">Estado de cuenta 5</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="estadoCuenta5" />
                  <button type='button' onClick={EstadoCuenta5} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>

              <form >
                <div className="mb-3">
                  <label for="estadoCuenta6" className="form-label">Estado de cuenta 6</label>
                  <input className="form-control" onChange={(e) => setCurrentfile(e.target.files[0])} type="file" id="estadoCuenta6" />
                  <button type='button' onClick={EstadoCuenta6} className='btn btn-secondary my-3' >Subir archivo</button>
                </div>
              </form>
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
            {/*<div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>*/}
          </div>
        </div>
      </div>
    

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

        <p className='mb-2'>Peso y estatura de cónyuge:</p>

        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-default">Peso</span>
          <input type="text" className="form-control" onChange={(e) => setPesoCon(e.target.value)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-default">estatura</span>
          <input type="text" className="form-control" onChange={(e) => setEstaturaCon(e.target.value)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
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

        <button type='button' onClick={registrarInfoIndispensable} className='btn btn-secondary my-3' >Registrar Información</button>

      </div>
      
    </>
  )
}
