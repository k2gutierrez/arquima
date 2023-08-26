import React from 'react'

export default function Docesquema(props) {
  return (
    <div className="mb-3 mx-5">
        <label htmlFor="docEsquema" className="form-label">{ props.tipo }</label>
        <input type="text" onChange={ props.onChange } value={ props.value } name='docEsquema' className="form-control" id="docEsquema" placeholder={ props.tipo} />
    </div>
  )
}
