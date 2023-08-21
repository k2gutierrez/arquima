'use client'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { db } from '@/firebase/config'
import { Timestamp, doc, addDoc, setDoc, updateDoc, collection, query, where, getDocs, getDoc } from 'firebase/firestore'

export default function Admin() {

  const [docus, setDocus] = useState([])
  const { user } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (user == null) {
      router.push("/")
    } else if (currentRol != "administrativo" && currentRol == "owner") {
      router.push("/dashboard")
    } else if (currentRol != "administrativo" && currentRol == "vendedor") {
      router.push("/sells")
    } else if (currentRol != "administrativo" && currentRol == "cliente") {
      router.push("/")
    } else if (currentRol == "administrativo") {
      router.push("/")
    }
    fetchData()
  }, [user])

  console.log(docus)
  
  async function fetchData() {  
    const querysnapshot = await getDocs(collection(db, "propiedades"));
    const docSnapshots = []
    querysnapshot.forEach((doc) => {
      docSnapshots.push(doc.data())
    });
    setDocus(docSnapshots)
  }

  return (
    <>
      <div>Admin</div>
      <div><p>{user.uid}</p></div>
      <div><p>{user.email}</p></div>
      {/*<button type="submit" onClick={uploadDB} className="btn btn-primary">Cambiar nombre</button>*/}
      <div className='table-responsive'>
            <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">PROYECTO</th>
                    <th scope="col">FOLIO</th>
                    <th scope="col">DIRECCION</th>
                    <th scope="col">NUMERO_EXT</th>
                    <th scope="col">INMUEBLE</th>
                    <th scope="col">NIVEL</th>
                    <th scope="col">MZ</th>
                    <th scope="col">LTE</th>
                    <th scope="col">M2_TERRENO</th>
                    <th scope="col">M2_CONST</th>
                    <th scope="col">PRECIO</th>
                    <th scope="col">STATUS_INMUEBLE</th>
                    <th scope="col">NOMBRE</th>
                    <th scope="col">ESQUEMA</th>
                    <th scope="col">ASESOR</th>
                    <th scope="col">STATUS_CREDITO</th>
                    <th scope="col">OBSERVACIONES</th>
                  </tr>
                </thead>
                <tbody className='table-striped'>
                {
        docus.map((d, i) => {
        return (
                
                  <tr>
                    <td>{d.proyecto}</td>
                    <td>{d.folio}</td>
                    <td>{d.direccion}</td>
                    <td>{d.numero_ext}</td>
                    <td>{d.inmueble}</td>
                    <td>{d.nivel}</td>
                    <td>{d.mz}</td>
                    <td>{d.lte}</td>
                    <td>{d.m2_terreno}</td>
                    <td>{d.m2_const}</td>
                    <td>{d.precio}</td>
                    <td>{d.status_inmueble}</td>
                    <td>{d.nombre}</td>
                    <td>{d.esquema}</td>
                    <td>{d.asesor}</td>
                    <td>{d.status_credito}</td>
                    <td>{d.observaciones}</td>
                  </tr>
        )
      })
      }
      </tbody>
      </table>
      </div>
    </>
  )
}
