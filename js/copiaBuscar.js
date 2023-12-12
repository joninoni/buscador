    //       variables  
    //      selectores del campo busqueda
    const marca=document.querySelector("#marca");
    const year=document.querySelector("#year");
    const minimo=document.querySelector("#minimo");
    const maximo=document.querySelector("#maximo");
    const puertas=document.querySelector("#puertas");
    const transmision=document.querySelector("#transmision");
    const color=document.querySelector("#color");

    const resultado=document.querySelector("#resultado");
    const max=new Date().getFullYear();
    const min=max-10; 
    //
    const datosBusqueda={
        marca:"",
        year:"",
        minimo:"",
        maximo:"",
        puertas:"",
        transmision:"",
        color:"",
    };

    
   //       eventos
    document.addEventListener("DOMContentLoaded",()=>{
        mostrarAutos(autos);
        llenarSelect();
    });
    

  // eventos para los select de busqueda  
     marca.addEventListener("change",leerDatos);
     year.addEventListener("change",leerDatos);
     minimo.addEventListener("change",leerDatos);
     maximo.addEventListener("change",leerDatos);
     puertas.addEventListener("change",leerDatos);
     transmision.addEventListener("change",leerDatos);
     color.addEventListener("change",leerDatos);
    
  //      funciones 
   function mostrarAutos(autos){ 
    
      limpiarHtml();//limpia el html previo

        autos.forEach(auto => {
        //destructuracion de objecto autos 
        const {marca,modelo,year,precio,puertas,color,transmision}=auto;
        const autoHtml=document.createElement("p");
              autoHtml.textContent=
              `
                ${marca} ${modelo} ${year} - precio ${precio} - ${puertas} - color ${color} puertas -${transmision}
              `;
              resultado.appendChild(autoHtml);
        })  
   };  
   
   function limpiarHtml(){
     while(resultado.firstChild){
             resultado.removeChild(resultado.firstChild);
     }
   };

   //genera los años 
  function llenarSelect(){
     for(let i=max;i>=min;i--){
        const option=document.createElement("option");
        option.value=i;
        option.textContent=i;
        year.appendChild(option);
     };
  }; 

  
    

  // funcion para llenar el objecto de datos busqueda
    function leerDatos(e){
        datosBusqueda[e.target.id]= e.target.value;
        filtrarAuto();
    }; 
  

  //funcion que filtra en base a la busqueda
  function filtrarAuto(){
    const resultado=autos.filter(filtrarMarca).filter(filtrarYear)
    .filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas)
    .filter(filtrarTransmision).filter(filtrarColor);
    

    if (resultado.length) {//pregunta si hay elementos en arreglo resultado
       mostrarAutos(resultado);  
    }else{
      noResultados()
    }
   // console.log(resultado);
  };

  function noResultados(){

        limpiarHtml();

        const noResultados=document.createElement("div");
         noResultados.classList.add("alerta","error");
         noResultados.textContent="No hay resultados intenta con otros terminos de busqueda";
         resultado.appendChild(noResultados);
  }
  
  function filtrarMarca(auto){
    const {marca}=datosBusqueda;
    if (marca){
        return auto.marca === marca;
    }

    return auto;
  };

  function filtrarYear(auto) {
    const {year}=datosBusqueda;
    if (year){
        return auto.year ===  parseInt(year);
    }

    return auto;
  };


  function filtrarMinimo(auto) {
    const {minimo}=datosBusqueda;
    if (minimo){
        return auto.precio >= minimo;
    }

    return auto;
  };


  function filtrarMaximo(auto) {
    const {maximo}=datosBusqueda;
    if (maximo){
        return auto.precio <= maximo;
    }

    return auto;
  };

  function filtrarPuertas(auto) {
    const {puertas}=datosBusqueda;
    if (puertas){
        return auto.puertas ===parseInt(puertas);
    }

    return auto;
  };

  function filtrarTransmision(auto) {
    const {transmision}=datosBusqueda;
    if (transmision){
        return auto.transmision === transmision;
    }

    return auto;
  };


  function filtrarColor(auto){
    const {color}=datosBusqueda;
    if (color){
      return auto.color === color;
    }

    return auto
  };  