'use client'
import React from 'react'
import Image from 'next/image';
import imageStatus from '../../public/status/status9nobg.png'

function Status9(props) {

    return (

        <div className={props.className} id='pdf' >
            <Image className='img-fluid' src={imageStatus} alt='status' width={872} height={258} />
        </div>

    )
}

export default Status9
