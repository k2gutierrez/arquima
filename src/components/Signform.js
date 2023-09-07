import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import Icon from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';

export default function Signform(props) {
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const router = useRouter();

  const handleToggle = () => {
    if (type==='password'){
       setIcon(eye);
       setType('text')
    } else {
       setIcon(eyeOff)
       setType('password')
    }
  }

  return (
    <div className=''>
        <h1 className="my-3">Arquima</h1>
        <h3 className="my-3">{props.title}</h3>
        <form className="form">
            <div className="mb-3 mx-1">
            <label htmlFor="email" className="form-label">Email</label>
            <input required type="email" onChange={props.setEmail} name='email' className="form-control" id="email" placeholder="name@example.com" />
            </div>
            <p>Password</p>
            <div className="input-group mb-3 mx-1">
            <input required type={type} aria-describedby="button-addon2" onChange={props.setPassword} name='password' className="form-control" id="password" placeholder="password" />
            <button className="btn btn-outline-transparent" type="button" id="button-addon2">
              <span className="flex justify-around items-center" id='password' onClick={handleToggle}>
                <Icon className="absolute mr-10" icon={icon} size={25}/>
              </span>
            </button>
            </div>
            <div className='row'>
              <div className='col-md-6 col-12'>
                <button type="button" onClick={props.onClick} className="btn btn-secondary">Sign in</button>
              </div>
              <div className='col-md-6 col-12'>
                <Link href="/"><button type="button" className="btn btn-lg" >Volver al Inicio</button></Link>
              </div>
            </div>
            
            
        </form>
    </div>
  )
}
