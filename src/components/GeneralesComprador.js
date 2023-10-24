'use client'
import React from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'
import Image from 'next/image';
import imageCotoCielo from '../../public/formatos/Membrete_coto_cielo.png'

function GeneralesComprador(props) {
    
    const createPDF = async () => {
        /*const pdf = new jsPDF('p','mm',[297, 210]);*/
        const pdf = new jsPDF("portrait", "mm", "letter");
        const data = document.getElementById('pdf');
        const d = await html2canvas(data);
        const img = d.toDataURL("image/png");
        const imgProperties = pdf.getImageProperties(img);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
        pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("GeneralesComprador.pdf");
    };
      

    return (
        <div>
            <div className={props.className} id='pdf' >
                <Image className={props.imgClass} src={imageCotoCielo} alt='CotoCielo' width={612} height={792} />
                <div className={props.textCotoCielo}>
                <div className='row py-5 ms-3'>
                        <div className='col-10'>
                            <h1 className='text-start'>GENERALES COMPRADOR</h1>
                        </div>
                        <div className='col-2 align-self-end text-end pe-1'>
                            <p className={props.foliotext}>Folio: {props.folio}</p>
                        </div>
                    </div>
                    <div className='row mb-5 justify-content-end align-items-center'>
                        <div className=' text-start mb-5'>
                            <div className='mt-1 mb-3'><strong>Oferente 1</strong></div>
                            <div className=''>
                                <p className='mb-4'>
                                    Apellidos: <u>{props.apellidos}</u> Nombre(s): <u>{props.nombre}</u><br/>
                                    Fecha de nacimiento: ____/ ____/ ______ RFC <u>{props.rfc}</u> N.S.S <u>{props.nss}</u> <br />
                                    Teléfono Celular: <u>{props.cel}</u> Teléfono fijo: ____________ Correo: <u>{props.email}</u> <br />
                                    CURP: <u>{props.curp}</u> Domicilio: <u>{props.domicilio}</u>
                                </p>
                                
                                <p className='mb-4'><b>Estado Civil</b></p>
                                
                                <div className='container'>

                                </div>
                                <div className='row align-items-center'>
                                    <div className='col-3 align-self-center'>
                                        <p>Soltero <span className={props.square}>□</span></p>
                                    </div>
                                    <div className='col-3'>
                                        <p>Sociedad Conyugal <span className={props.square}>□</span></p>
                                    </div>
                                    <div className='col-3'>
                                        <p>Sociedad legal <span className={props.square}>□</span></p>
                                    </div>
                                    <div className='col-3'>
                                        <p>Separación de bienes <span className={props.square}>□</span></p>
                                    </div>
                                </div>

                                <p className='my-4'>
                                    Datos conyugue (en su caso).
                                </p>

                                <p>
                                    Apellidos: ___________________________ Nombres: ___________________________ <br />
                                    Fecha de nacimiento: ____/ ____/ ______ R.F.C.: __________ nss: __________ <br />
                                    Teléfono celular: __________ Teléfono fijo: __________ Correo: ____________ <br />
                                    CURP __________________ Domicilio: ________________________
                                </p>

                                <p className='mt-4 mb-2'><b>Datos de la empresa.</b></p>

                                <p className='mb-5'>
                                    <b>
                                        Nombre o razón social: _________________________ Ocupación: _______________ <br />
                                        Número e teléfono de la empresa: __________ Número de registro patronal (NRP): ________
                                    </b>
                                </p>

                                <p className='mb-2'><b>Referencias.</b></p>

                                <p className='mb-3'>
                                    Apellidos: ____________________ Nombres: ____________________ <br />
                                    Teléfono fijo: __________ Teléfono celular: ____________ Domicilio: ____________________
                                </p>

                                <p className='mb-5'>
                                    Apellidos: ____________________ Nombres: ____________________ <br />
                                    Teléfono fijo: __________ Teléfono celular: ____________ Domicilio: ____________________
                                </p>

                                <p className='mb-2'><b>Beneficiarios.</b></p>

                                <p className='mb-3'>
                                    Apellidos: ____________________ Nombres: ____________________ <br />
                                    CURP: _________________________ Parentesco: _________________________
                                </p>

                                <p className=''>
                                    Apellidos: ____________________ Nombres: ____________________ <br />
                                    CURP: _________________________ Parentesco: _________________________
                                </p>

                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className='my-5'>
                <button type="button" onClick={createPDF} className="btn btn-primary">Descargar PDF</button>
            </div>
        </div>
    )
}

export default GeneralesComprador
