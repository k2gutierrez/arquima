'use client'
import React from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'
import Image from 'next/image';
import imageCotoCielo from '../../public/formatos/Membrete_coto_cielo.png'

function ActaDeEntrega(props) {
    
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
        pdf.save("ActadeEntregadeVivienda.pdf");
    };
      

    return (
        <>
            <div className={props.className} id='pdf' >
                <Image className={props.imgClass} src={imageCotoCielo} alt='CotoCielo' width={612} height={792} />
                <div className={props.textCotoCielo}>
                    <div className='row py-5 ms-3'>
                        <div className='col-10'>
                            <h1 className='text-start'>ACTA DE ENTREGA DE VIVIENDAS</h1>
                        </div>
                        <div className='col-2 align-self-end text-end pe-1'>
                            <p className={props.foliotext}>Folio: {props.folio}</p>
                        </div>
                    </div>
                    <div className='row mt-5 mb-5 justify-content-end align-items-center'>
                        <div className=' text-start mb-5'>
                            <div className=''>
                                <p className='my-5'>
                                En la ciudad de TLAJUMULCO DE ZUÑIGA, a los 28 dias del mes de julio del año 2023, se reunieron en las instalaciones del 
                                proyecto “COTO DEL CIELO” , en una parte el/la Sr/ Sra Luis Ángel Martínez Alfaro. <br />
                                En representación de la constructora PROMOTORA DYAJA, S.A. DE C.V. y de otra el/la Sr/ Sra Lucia Hinojoza 
                                Beneficiario/a de la vivienda, ubicada en el domicilio {props.domicilio}, MANZANA {props.mz}, LOTE {props.lte}, folio de vivienda No. {props.folio}, objeto 
                                de la presente entrega y manifiestan lo siguiente; (INVENTARIO DE LA VIVIENDA):
                                </p>
                                <br />
                                <br />
                                <br />
                                <p className='my-5'>
                                ᴏ Vivienda impermeabilizada tanto en techo como en muro lateral.<br />
                                ᴏ Pasto en cochera y patio.<br />
                                ᴏ Tarja en cocina.<br />
                                ᴏ Sanitario.<br />
                                ᴏ Regadera.<br />
                                ᴏ Llaves mezcladoras en tarja y en lavabo.<br />
                                ᴏ Calentador de paso (el cual se instala en la fecha solicitada o se hace entrega en físico, deberá especificar por este medio).<br />
                                ᴏ Lavadero en patio.<br />
                                </p>
                                <br />
                                <br />
                                <br />
                                <p className='mt-5'>  
                                Que el beneficiario/a, hace constar que recibió el inmueble anteriormente descrito a entera satisfacción y perfecto estado de 
                                funcionamiento.
                                </p>
                                <p className=''>
                                Asi mismo declara haber recibido carta de garantía y las llaves de acceso al inmueble.
                                </p>
                                <p className='mb-5'>
                                Para constancia se firma a los 28 dias del mes de julio del año 2023
                                </p>
                                <br />
                                <br />
                                <br />
                                <div className='row mt-5'>
                                    <div className='col-6'>
                                        <p className='mb-5'>
                                            _________________________________________________ <br />
                                            Firma de "EL OFERENTE".
                                        </p>
                                        <br />
                                        <p>
                                            _________________________________________________ <br />
                                                Firma de "EL OFERENTE 2".
                                            </p>
                                    </div>
                                    <div className='col-6'>
                                        <p>
                                            _________________________________________________ <br />
                                                Firma del asesor.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className='my-5'>
                <button type="button" onClick={createPDF} className="btn btn-primary">Descargar PDF</button>
            </div>
        </>
    )
}

export default ActaDeEntrega
