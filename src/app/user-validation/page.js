'use client'
import React, { useEffect } from 'react'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import logo from '../../../public/ArquimaLogo.png'
import engrane from '../../../public/engranes.gif'

export default function User() {

    const router= useRouter();
    const { user, currentRol } = useAuthContext();

    useEffect(() => {
        //userDB();
        switch (currentRol) {
            case "vendedor":
                router.push("/ventas")
                break
            case "administrativo":
                router.push("/admin")
                break
            case "owner":
                router.push("/dashboard")
                break
            case "" || null:
                router.push("/")
            default:
                router.push("/user-validation")
                break
        }
    },[user, currentRol])
    console.log(user)

    return (
    <div className='container-sm text-center align-items-center my-5'>
        <div>
            <Image className='img-fluid' alt='logo' src={logo} width={600} height={460} />
        </div>
        <div>
            <Image className="img-fluid" alt='engrane' src={engrane} width={350} height={210} />
            <p>Loading...</p>
        </div>
    </div>
    )
}
