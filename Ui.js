import { eliminarCita, cargarEdicion} from
'../funciones.js';

import { contenedorCitas } from '../selectores.js'

class UI {
    imprimirAlerta(mensaje, tipo) {
     const divMensaje =  document.createElement('div');
     divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');
 
 
     //Agregar clases en el tipo de error
     if(tipo === 'error') {
         divMensaje.classList.add('alert-danger')
     } else{
         divMensaje.classList.add('alert-success');
     }
 
     //Mensaje de eeror
     divMensaje.textContent = mensaje;
 
     //Agregar al DOM
     document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));
 
     //Quitar la alerta despues de 5 seg
     setTimeout(() => {
         divMensaje.remove()
     }, 5000)
    } 
 
    imprimirCitas({citas}){
 
     this.limpiarHTML();
 
     citas.forEach( cita => {
 
         const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;
 
         const divCita = document.createElement('div');
         divCita.classList.add('cita', 'p-3');
         divCita.dataset.id = id;
 
         //Scripting de los elementos de las citas
 
         const mascotaParrafo = document.createElement('h2');
         mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
         mascotaParrafo.textContent = mascota;
 
         const propietarioParrafo = document.createElement('p');
         propietarioParrafo.innerHTML = `<span class= "font-weight-bolder">Propietario: </span> ${propietario}`
 
         const telefonoParrafo = document.createElement('p');
         telefonoParrafo.innerHTML = `<span class= "font-weight-bolder">Telefono:  </span>${telefono} `
 
         const fechaParrafo = document.createElement('p');
         fechaParrafo.innerHTML = `<span class= "font-weight-bolder">Fecha: </span> ${fecha}`
 
         const horaParrafo = document.createElement('p');
         horaParrafo.innerHTML = `<span class= "font-weight-bolder">Hora: </span> ${hora}`
 
         const sintomasParrafo = document.createElement('p');
         sintomasParrafo.innerHTML = `<span class= "font-weight-bolder">Sintomas:  </span> ${sintomas}`
 
         //Boton para eliminar esta cita
         const btnEliminar = document.createElement('button');
         btnEliminar.classList.add('btn', 'btn-danger','mr-2');
         btnEliminar.innerHTML = 'Eliminar ';
 
         btnEliminar.onclick = () => eliminarCita(id);
 
         // añade un boton
         const btnEditar = document.createElement('button');
         btnEditar.classList.add('btn', 'btn-info');
         btnEditar.innerHTML = 'Editar';
         btnEditar.onclick = () => cargarEdicion(cita);
 
         // Agregar los parrafos al divCita
         divCita.appendChild(mascotaParrafo);
         divCita.appendChild(propietarioParrafo);
         divCita.appendChild(telefonoParrafo);
         divCita.appendChild(fechaParrafo);
         divCita.appendChild(horaParrafo);
         divCita.appendChild(sintomasParrafo);
         divCita.appendChild(btnEliminar);
         divCita.appendChild(btnEditar);
 
         // agregar las citas al html
         contenedorCitas.appendChild(divCita);
      
 
     });
    }
    limpiarHTML(){
      while(contenedorCitas.firstChild) {
         contenedorCitas.removeChild( contenedorCitas.firstChild )
      }
    }
 }

 export default UI; 