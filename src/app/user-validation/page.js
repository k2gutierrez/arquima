'use client'
import React, { useEffect } from 'react'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import logo from '../../../public/ArquimaLogo.png'

export default function User() {

    const router= useRouter();
    const { user, currentRol } = useAuthContext();

    useEffect(() => {
        //userDB();
        switch (currentRol) {
            case "vendedor":
                router.push("/ventas")
                break;
            case "administrativo":
                router.push("/admin")
                break;
            case "owner":
                router.push("/dashboard")
                break;
            default:
                router.push("/user-validation")
                break;
        }
    },[currentRol])

    return (
    <div className='container-sm text-center align-items-center my-5'>
        <div>
            <Image className='img-fluid' alt='logo' src={logo} width={600} height={460} />
        </div>
        <div>
            <p>Loading...</p>
        </div>
    </div>
    )
}
