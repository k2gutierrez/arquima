'use client'
import React from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'
import Image from 'next/image';
import imageCotoCielo from '../../public/formatos/Membrete_coto_cielo.png'

function Poliza(props) {
    
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
        pdf.save("Poliza_de_Seguro.pdf");
    };
      

    return (
        <>
            <div className={props.className} id='pdf' >
                <Image className={props.imgClass} src={imageCotoCielo} alt='CotoCielo' width={612} height={792} />
                <div className={props.textCotoCielo}>
                    <div className='row py-5 ms-3'>
                        <div className='col-10'>
                            <h1 className='text-start'>POLIZA DE SEGURO</h1>
                        </div>
                        <div className='col-2 align-self-end text-end pe-1'>
                            <p className={props.foliotext}>Folio: {props.folio}</p>
                        </div>
                    </div>
                    <div className='row mt-1 mb-5 justify-content-end align-items-center'>
                        <div className=' text-start mb-5'>
                            <div className=''>
                                <p className='mt-5'>
                                Garantía que otorga en lo sucesivo el constructor <b><u>PROMOTOR DYAJA, S.A. DE C.V.</u></b>, y el sr (a). 
                                Ignacio Reyes Cuevas, del lote <b><u>{props.lte}</u></b>, manzana <b><u>{props.mz}</u></b>, de la 
                                <b><u> calle {props.domicilio}</u></b> del fraccionamiento, <b><u>Campo sur, (Coto del cielo)</u></b>, el constructor asumió 
                                el compromiso para responder directamente frente al propietario de las siguientes:
                                </p>

                                <p><b>Obligaciones</b></p>

                                <p className=''>
                                <b>Primera.</b> - El constructor se obliga a responder por las fallas técnicas y vicios ocultos, que aprecien en la vivienda 
                                descrita en esta póliza.
                                </p>

                                <p className=''>  
                                <b>Segunda.</b> - El constructor se compromete frente al propietario y/o sus beneficios, durante el termino de esta garantía, 
                                a proceder inmediata por su cuenta y costo de las fallas técnicas y vicios ocultos que se presenten en la vivienda objeto de la 
                                presente póliza durante los plazos especificados más adelante; dichos trabajos los iniciara el constructor durante un plazo no mayor 
                                a 8 días hábiles contados a partir de la fecha en la que se reciba la comunicación respectiva, por parte del propietario.
                                </p>

                                <p className=''>
                                <b>Tercera.</b> - El propietario manifiesta su conformidad con el estado que guardan los bienes e instalaciones de la vivienda a 
                                los que se refiere esta póliza en la fecha de entrega de la misma.
                                </p>

                                <p className=''>
                                <b>Cuarta.</b> - La garantía que se trata se hará efectiva a favor del propietario y/o sus beneficios, cuando así se le solicite 
                                por escrito al constructor siempre y cuando se haga dentro de vigencia de la misma. El vendedor releva al INFONAVIT, FOVISSSTE, 
                                SOFOLES, instituciones de crédito etc., de cualquie responsabilidad derivada de las reclamaciones que, con fundamento en la 
                                presente póliza pueda efectuar el propietario. Para efectos de esa estipulación, el propietario se obliga a lograr el objeto de la 
                                presente póliza de garantía y requerir al constructor el cumplimiento oportuno de sus obligaciones.
                                </p>

                                <p>
                                <b>Quinta.</b> - El propietario deberá conservar en su poder la presente póliza de garantía en todo momento y a la reportar algún 
                                desperfecto el propietario deberá obtener del constructor la firma o sello de enterado del reporte presentado al momento en el 
                                que el constructor haya atendido satisfactoriamente el desperfecto reportado, el propietario tendrá la obligación de firmar de 
                                conformidad el documento que acredite tal circunstancia.
                                </p>

                                <p>
                                <b>S e x t a.</b> - Cualquier modificación, no especificada dentro de la vigencia a la estructura de la vivienda, la falta de 
                                mantenimiento y el mal uso de la vivienda o de sus partes no especificada dentro de la vigencia que no se haga desconocimiento 
                                al constructor dejara sin efecto la presente garantía.
                                </p>

                                <p>
                                <b>Séptima.</b> - El propietario reconoce y manifiesta expresamente que en caso de existir vicios ocultos o desperfectos, dicha 
                                circunstancia de ninguna manera se aplica la liberación a el propietario, del cumplimiento oportuna de sus obligaciones de pago 
                                que pudiera tener en relación con la vivienda para con el constructor, el INFONAVIT, la institución bancaria o de gobierno que le 
                                otorgue el crédito o la institución fiduciaria que sea el titular de la propiedad fiduciaria de la vivienda, por lo que en este 
                                acto el propietario denunciara cualquier posible derecho que pudiera tener al afecto.
                                </p>

                                <p>
                                <b>Octava.</b> - La vigencia de la presente póliza comienza a partir del día: 16 de julio del 2023.
                                </p>

                                <p>
                                    <b>Coberturade la garantía por seis meses:</b> <br />
                                    Defectos de la impermeabilización y goteras en loza
                                </p>

                                <p>
                                    <b>Coberturade la garantía por seis meses:</b> <br />
                                    Grietas que afecten el muro; aquellas en las que se pueda ver de lado a lado del muro o que tengan una apertura mayor a 1.5mm
                                </p>

                                <p>
                                    <b>Coberturade la garantía por tres meses:</b> <br />
                                </p>

                                <p>
                                    * Tubería de agua tapada o en mal estado<br />
                                    * Lavadero en mal estado o tapado<br />
                                    * Muebles de baño, accesorios, lavadero, flotadores, depósitos de agua que se encuentren en mal estado<br />
                                    * Drenaje tapado<br />
                                    * Muebles de baño, fregadero y lavadero con fuga de agua<br />
                                    * Fugas de agua en llaves y tuberías<br />
                                    * Azulejos flojos, pisos que presenten grietas con una apertura mayor a 1.5mm<br />
                                    * Instalación eléctrica defectuosa produciendo corto circuito o fallas en el encendido<br />
                                    * Defectos en funcionamiento del calentador<br />
                                    * Instalación eléctrica defectuosa por presentar fallas en el centro de carga o salidas de iluminación y falta de 
                                    corriente eléctrica en los contactos.<br />
                                    * Humedad en muros<br />
                                    * Puertas y ventanas en mal estado o defectuosas<br />
                                    * Puertas que no cierran
                                </p>

                                <p>
                                    <b>
                                        Nota: En caso de que el comprador cambie la estructura de la vivienda, modifique o mueva instalaciones ya sean 
                                        eléctricas, sanitarias o mismo calentador, se anulan automáticamente todas las garantías y obligaciones del constructor 
                                        hacia el comprador ya mencionadas anteriormente.
                                    </b>
                                </p>

                                <p>
                                    <b>
                                        Firma de recibido por parte del propietario y firma de entrega por parte del constructor de la póliza de garantía:
                                    </b>
                                </p>

                                <div className='row mt-5'>
                                    <div className='col-6'>
                                        <p className='mb-5'>
                                            _________________________________________________ <br />
                                            Firma de "EL OFERENTE".
                                        </p>
                                    </div>
                                    <div className='col-6'>
                                        <p>
                                            _________________________________________________ <br />
                                                Firma del "El Constructor".
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

export default Poliza
