'use client'
import React from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'
import Image from 'next/image';
import imageCotoCielo from '../../public/formatos/MEMBRETE_CON_CASA_COTO_CIELO.png'

function Agradecimiento(props) {
    
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
        pdf.save("Agradecimiento.pdf");
    };
      

    return (
        <div>
            <div className={props.className} id='pdf' >
                <Image className={props.imgClass} src={imageCotoCielo} alt='CotoCielo' width={612} height={792} />
                <div className={props.textCotoCielo}>
                    <div className='row py-5 ms-3'>
                        <div className='col-10'>
                            <h1 className='text-start'>AGRADECIMIENTO</h1>
                        </div>
                        <div className='col-2 align-self-end text-end pe-1'>
                            <p className={props.foliotext}>Folio: {props.folio}</p>
                        </div>
                    </div>
                    <div className='row mt-5 mb-5 justify-content-end align-items-center'>
                        <div className=' text-start mb-5'>
                            <div className=''>
                                <p className='mt-5'>
                                {props.nombre} Fue un placer ayudarte a establecerte en tu nuevo hogar, lo que un día fue una propuesta, una 
                                meta, hoy es realidad, todo eso se transformó en un hogar para estrenar y estamos seguros de que tendrás muchos años 
                                felices en tu nueva comunidad.
                                </p>
                                
                                <p className=''>
                                ¡Mis más sinceras felicitaciones por tu nuevo hogar!
                                </p>
                                
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                

                                <p className=''>  
                                <b>Detalle de compra.</b>
                                </p>

                                <p className=''>
                                Nombre: {props.nombre}
                                </p>

                                <p className=''>
                                <b>EL INMUEBLE</b> <br />
                                El inmueble objeto de la presente oferta de compra se encuentra ubicado en la CALLE {props.domicilio} edificada sobre el 
                                lote {props.lte} de la manzana {props.mz} del fraccionamiento, CAMPO SUR “COTO CIELO” en el municipio de TLAJOMULCO DE ZUÑIGA del estado 
                                de JALISCO. Se adquiere la vivienda por la suma de {props.precio} (______________________________), que pagare de 
                                la siguiente manera: Mediante un crédito {props.credito}
                                </p>

                                <p>
                                <b>Constructor</b><br />
                                Empresa constructora PROMOTORA DYAJA S.A. DE C.V. con domicilio en fuente de la templanza # 31 int. 2 col. San Miguel Tecamachalco, 
                                Naucalpan de Juárez, estado de México. Representado en este caso por el Lic. José Antonio Aguilar Martínez.
                                </p>

                                <p><b>Posventa y garantías.</b></p>

                                <div className='row'>
                                    <div className='col-3'>
                                        <p>
                                            Teléfono:<br />
                                            33 1285 23 25
                                        </p>
                                    </div>
                                    <div className='col-3'>
                                        <p>
                                            Correo electrónico: <br />
                                            <u>adrianajauregui85@gmail.com</u>
                                        </p>
                                    </div>
                                </div>

                                <p>
                                    Arq. Adriana Jauregui <br />
                                    Horario de atención de lunes a viernes de 9 a 6 pm.
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

export default Agradecimiento
