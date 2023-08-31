// función para poner currency de dinero a los elementos que se requieran
export const currencyMXN = (numero) => {
    const formateador = new Intl.NumberFormat("en-US", { style: "currency", "currency": "USD" });
    const formateado = formateador.format(numero);
    return formateado
    

}
