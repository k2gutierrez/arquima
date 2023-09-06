import React from 'react'
import { arquimaDB } from '@/db';
import { currencyMXN } from '@/formatCurrencyExample';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';

export default function DbUpload() {

    async function arquimaUpload() {

        const result = await arquimaDB.forEach(function (obj) {
            
            let data = {
                asesor: obj.asesor,
                direccion: obj.direccion,
                esquema: obj.esquema,
                folio: obj.folio,
                inmueble: obj.inmueble,
                lte: obj.lte,
                m2_const: obj.m2_const,
                m2_terreno: obj.m2_terreno,
                mz: obj.mz,
                nivel: obj.nivel,
                nombre: obj.nombre,
                numero_ext: obj.numero_ext,
                observaciones: [obj.observaciones],
                last_obs: obj.observaciones,
                precio: currencyMXN(obj.precio),
                proyecto: obj.proyecto,
                status: obj.status,
                status_interno: obj.status_interno
            }
            const usersRef = collection(db, "propiedades")
            const userRef = new doc(usersRef)
            const id = userRef.id
            const userData = {id: id, ...data}
            const docRef = setDoc(userRef, userData)
        });
        window.alert("Registros exitosos")
      
        
    }

    return (
    <div>
        <button type='button' className='btn btn-secondary' onClick={arquimaUpload}>Cargar base</button>
    </div>
    )
}
