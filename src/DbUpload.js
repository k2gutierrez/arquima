import React from 'react'
import { arquimaDB } from '@/db';
import { DB_hornos } from './BD_HORNOS';
import { DB_rosario } from './BD_ROSARIO';
import { DB_coto_cielo } from './BD_COTO_CIELO';
import { DB_san_antonio } from './BD_SAN_ANTONIO';

import { currencyMXN } from '@/formatCurrencyExample';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';

export default function DbUpload() {

    async function arquimaUpload() {

        const dataBase = DB_coto_cielo

        const result = await dataBase.forEach(function (obj) {
            
            let data = {
                asesor: obj.asesor,
                direccion: obj.direccion,
                esquema: obj.esquema,
                folio: obj.folio,
                prototipo: obj.prototipo,
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
                status_interno: obj.status_interno,
                fecha_escritura: obj.fecha_escritura,
                n_escritura: obj.n_escritura,
                nombre_notario: obj.nombre_notario,
                n_notaria: obj.n_notaria
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
    {/*<div>
        <button type='button' className='btn btn-secondary' onClick={arquimaUpload}>Cargar base</button>
    </div>*/}
    )
}
