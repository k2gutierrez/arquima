'use client'
import React from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'
import Image from 'next/image';
import imageCotoCielo from '../../public/formatos/Membrete_coto_cielo.png'

function CheckListBancario(props) {
    
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
        pdf.save("CheckListBancario.pdf");
    };
      

    return (
        <>
            <div className={props.className} id='pdf' >
                <Image className={props.imgClass} src={imageCotoCielo} alt='CotoCielo' width={612} height={792} />
                <div className={props.textCotoCielo}>
                    <div className='row py-5 ms-3'>
                        <div className='col-10'>
                            <h1 className='text-start'>CHECK LIST BANCARIO</h1>
                        </div>
                        <div className='col-2 align-self-end text-end pe-1'>
                            <p className={props.foliotext}>Folio: {props.folio}</p>
                        </div>
                    </div>
                    <div className='row mt-5 mb-5 justify-content-end align-items-center'>
                        <div className='text-start mb-5'>
                            <div className=''>
                                <p className='mt-5'>
                                La documentación deberá estar VIGENTE y LEGIBLE, o no se podrá aceptar.
                                </p>
                                
                                <p className='mb-5 ms-5'>
                                ❖ □ Identificación vigente (IFE, INE o pasaporte) Checar en lista nominal la vigencia de la IFE.
                                </p>

                                <p className='mb-3 ms-5'>
                                ❖ □ Últimos 2 comprobantes de domicilio reciente (agua, luz, teléfono, predio, cable, gas natural, cuenta bancaria). <br />
                                ❖ □ Acta de nacimiento de acreditado, cónyuge y/o coacreditado. <br />
                                ❖ □ Acta de matrimonio. <br />
                                </p>

                                <p className=''>
                                Si el cliente recibe sus ingresos a través de nómina: <br />
                                    <p className='ms-5 mb-3'>
                                    ❖ □ Últimos 3 meses de recibos de nómina.<br />
                                    ❖ □ Últimos 2 meses de estados de cuenta completos, donde le depositan la nómina.<br />
                                    ❖ □ Carta laboral en hoja membretada de la empresa, indicando RFC con homoclave del cliente, arraigo, sueldo y<br />
                                    ❖ puesto.
                                    </p>
                                </p>

                                <p>
                                Si el cliente recibe sus ingresos de forma Independiente: <br />
                                    <p className='ms-5 mb-3'>
                                    ❖ □ Últimos 6 meses de estados de cuenta completos, donde reflejen ingresos mensuales.<br />
                                    ❖ □ Alta de hacienda.<br />
                                    ❖ □ Constancia de situación fiscal, con mínimo 2 años de inicio de operaciones.<br />
                                    ❖ □ Carta a título personal, escrita a mano, donde indique su actividad, tiempo de realizarla e ingresos aproximados.
                                    </p>
                                </p>

                                <p>
                                Aunado a la documentación, se requiere la siguiente información INDISPENSABLE: <br />
                                    <p className='ms-5'>
                                    ❖ □ Teléfono de oficina, casa y de celular.<br />
                                    ❖ □ Dirección completa de lugar de trabajo.<br />
                                    ❖ □ Ultimo grado de estudios.<br />
                                    ❖ □ 1 referencia personal con teléfono, indicando el tiempo que lleva de conocerle.<br />
                                    ❖ □ 1 referencia familiar con teléfono, que no viva con ella, indicando parentesco.<br />
                                    ❖ □ Peso y estatura de acreditado y de cónyuge en caso de aplicar.<br />
                                    ❖ □ Tiempo de vivir en su domicilio actual e indicar si es propio, rentado o de familiares.<br />
                                    ❖ □ Indicar si tiene dependientes económicos, de ser así especificar cuantos son, edades y parentesco.<br />
                                    ❖ □ Firmar solicitudes de crédito y formatos bróker de autorización. (Anexos).<br />
                                    ❖ □ Valor aproximado de la propiedad a adquirir.
                                    </p>
                                </p>

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

export default CheckListBancario
