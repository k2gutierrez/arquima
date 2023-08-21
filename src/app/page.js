'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import cls from 'classnames'
import logo from '../../public/ArquimaLogo.png'
import styles from './page.module.css'
import instagram from '../../public/instagramLogo.png'
import facebook from '../../public/facebookLogo.png'

export default function Home() {

  return (
    <div className={cls('container-sm my-5 align-items-center')}>
      <div className='row text-end'>
        <p>¿NO TIENES CUENTA?<Link href="/registro"><button type="button" className="btn btn-lg px-5" >REGISTRATE</button></Link></p>
        
      </div>
      <div className={cls('mt-3 mb-5 pt-4 text-center')}>
        <Image className='img-fluid' src={logo} alt='logo' width={581} height={343} />
        <h1 className='my-5'>Aquí comienza tu nueva vida</h1>
      </div>
      <div className={cls('row text-center justify-content-center')}>
        <div className={cls('col-sm-3 col-12 order-sm-1 order-1 align-self-center mb-3')}>
          <Link href="/login"><button type="button" className="btn btn-lg btn-outline-secondary px-2" >Accede a tu cuenta</button></Link>
        </div> 
        <div className={cls('col-sm-4 col-6 order-sm-2 order-3 align-self-center')}>
          <div className='row justify-content-center'>
            <div className={cls(styles.social, 'col-5 text-end')}>
              <Link href="https://instagram.com/arqui_ma?igshid=MzRlODBiNWFlZA=="><Image className={cls('img-fluid')} alt='instagram' src={instagram} width={47} height={47} /></Link>
            </div>
            <div className={cls(styles.social, 'col-6')}>
              <Link href="https://www.facebook.com/arquimagdl?mibextid=9R9pXO" ><Image className={cls('img-fluid')} alt='facebook' src={facebook} width={47} height={47} /></Link>
            </div>
          </div>
        </div>
        <div className={cls('col-sm-4 col-12 order-sm-3 order-2 align-self-center mb-4')}>
          <Link href="/cliente"><button type="button" className="btn btn-lg btn-outline-secondary px-5" >Soy cliente</button></Link>
        </div>
      </div>
    </div>
  )
  
}
