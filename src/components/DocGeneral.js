'use client'
import React from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'

function DocGeneral(props) {
    
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
        pdf.save("OfertaCompra.pdf");
    };
      

    return (
        <>
            <div className={props.className} id='pdf' >
                <div>
                    <h1 className='py-5'>OFERTA DE COMPRA</h1>
                </div>
                <div className='row mt-2 mb-5'>
                    <div className='col-2 ps-5'></div>
                        <div className='col-10 text-start mb-5 pe-2'>
                            <div className='my-5'><strong>CLAUSULA PRIMERA: DE "EL OFERENTE"</strong></div>
                            <div className=''>
                                <p className='mb-5'>
                                    Nombre: <u>{props.nombre}</u><br/>
                                    N.S.S <u>{props.nss}</u> RFC <u>{props.rfc}</u> Indentificación oficial: <u>{props.identificacion}</u> No: <u>{props.nIdentificacion}</u> <br />
                                    Domicilio: <br />
                                    <u>{props.domicilio}</u> <br />
                                    Teléfono: <u>{props.tel}</u> Teléfono Celular: <u>{props.cel}</u> Correo Electrónico: <u>{props.email}</u>
                                </p>
                                <p className='mb-5'>
                                    "EL OFERENTE 2" <br />
                                    Nombre: <u>{props.nombre2}</u><br/>
                                    N.S.S <u>{props.nss2}</u> RFC <u>{props.rfc2}</u> Indentificación oficial: <u>{props.identificacion2}</u> No: <u>{props.nIdentificacion2}</u> <br />
                                    Domicilio: <br />
                                    <u>{props.domicilio2}</u> <br />
                                    Teléfono: <u>{props.tel2}</u> Teléfono Celular: <u>{props.cel2}</u> Correo Electrónico: <u>{props.email2}</u>
                                </p>
                                <p className='mb-5'>  
                                    <strong>CLAUSULA SEGUNDA: DE EL INMUEBLE</strong> <br />
                                    El inmueble objeto de la presente oferta de compra se encuentra ubicado en la {props.direccion} # {props.numero_ext} edificada
                                    sobre el lote {props.lte} de la manzana {props.mz} del franccionamiento, CAMPO SUR "{props.proyecto}" en el municipio de TLAJOMULCO DE 
                                    ZUÑIGA del estado de JALISCO, en lo sucesivo denominado <strong>"EL INMUEBLE".</strong> 
                                </p>
                                <p className='mb-5'>
                                    <strong>CLAUSULA TERCERA: DE LA OFERTA</strong> <br />
                                    <strong>"EL OFERENTE"</strong> propone al legítimo propietario de "EL INMUEBLE", en lo sucesivo denominado <strong>"EL PROPIETARIO", </strong>
                                    adquirido en la suma de <u>{props.precio} </u>(________________________________), que pagaré de la siguiente manera: Mediante un crédito 
                                    que en este momento manifiesta <strong>"EL OFERENTE"</strong> tener preautorizado or la institución _____________________, hasta por la cantidad 
                                    de $____________________(___________________________________) y estando su oferta condicionada a que la institución bancaria, le apruebe 
                                    de forma definitiva su crédito. <br />
                                    Los gastos que se generen con motivo de la escritura pública de compraventa, será erogados por <strong>"EL OFERENTE"</strong>, asi 
                                    como los impuestos, gastos y honorarios que origine la escrituración de <strong>"EL INMUEBLE", </strong> debiendo correr a cargo de 
                                    <strong>"EL PROPIETARIO"</strong>, en su caso, el impuesto sobre la renta que derivaré de la venta, al momento de la escritura definitiva, 
                                    <strong>"EL PROPIETARIO"</strong> de <strong>"EL INMUEBLE"</strong> se obliga a entregarlo. Asi como entregar <strong>"EL INMUEBLE" </strong> 
                                    nuevo y en perfectas condiciones, sin limitaciones de dominio y libre de adeudo fiscal o gravamen de cualquier naturaleza. Por su parte, 
                                    <strong>"EL OFERENTE"</strong> se compromete a recibirlo nuevo y en perfectas condiciones, con las especificaciones que se adjuntan a la 
                                    presente oferta, manifestando conocerlo y estar conforme con el mismo, habiendo sido asesorado por un profesional inmobiliario. <br />
                                    Esta oferta de compraventa tendrá como vigencia 6 (seis) meses, contados a partir de la fecha de su firma. En caso de ser aceptada esta 
                                    oferta de compra por <strong>"EL PROPIETARIO", "EL OFERENTE"</strong> propone firmar el contrato de promesa de compraventa en el momento 
                                    en que <strong>"EL PROPIETARIO"</strong> lo quiera.
                                </p>
                                <p>
                                    <strong>CLAUSULA CUARTA: DE LA GARANTIA</strong> <br />
                                    Como garantía de seriedad de su oferta, <strong>"EL OFERENTE"</strong> acompaña a la presente la cantidad de $_________________ por 
                                    medio de transferencia bancaria, suma que pasará a formar parte del monto que entregará a la firma del contrato de promesa de compraventa 
                                    y/o escritura pública, a ser celebrada. Si con posterioridad <strong>"EL OFERENTE"</strong> desistiera de ella por convenir asi a sus intereses, 
                                    manifiesta <strong>"EL OFERENTE"</strong> estar de acuerdo en que este importe sea aplicado a gastos de tramitación de crédito.
                                </p>
                                <p>
                                    <strong>CLAUSULA QUINTA: DE LA VERIFICACION DEL ESTATUS JURIDICO DEL INMUEBLE</strong> <br />
                                    <strong>"EL PROPIETARIO"</strong> se comprometa a exhibir, ante la notaría pública de su elección o la que defina la entidad financiera, 
                                    la documentación jurídica que acredite la propiedad de <strong>"EL INMUEBLE".</strong>
                                </p>
                                <p>
                                    <strong>CLAUSULA SEXTA: DE LAS EVENTUALES CONTROVERSIAS</strong> <br />
                                    Para la interpretación y cumplimiento de esta oferta, las partes manifiestan su conformidad en someterse a la competencia de los tribunales 
                                    ordinarios del estado de Jalisco, renunciando al fuero que pudiera corresponderle a causa de otros domicilios presentes o futuros.
                                </p>
                                <p>
                                    <strong>CLAUSULA SEPTIMA: DE "EL PROPIETARIO"</strong> <br />
                                    "EL PROPIETARIO" PROMOTORA DYAJA S.A. DE C.V. con domicilio en fuente de la templanza # 31 int. 2 col. San Miguel Tecamachalco, Naucalpan 
                                    de Juárez, estado de México. Representado en este caso or el Lic. José Antonio Aguilar Martínez. <br />
                                    Firmando de conformidad de 2 tantos en la ciudad de Tlajomulco de Zuñiga , Jal. El Día_____ de _________________ del 2023.
                                </p>
                            </div>
                    </div>
                </div>
            </div>
            <div>
                <button type="button" onClick={createPDF} class="btn btn-primary">Descargar PDF</button>
            </div>
        </>
    )
}

export default DocGeneral
