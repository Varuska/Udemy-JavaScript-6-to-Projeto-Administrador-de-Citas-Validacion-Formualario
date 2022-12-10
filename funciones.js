import Citas from './classes/Citas.js'
import UI from './classes/Ui.js'

import {
    mascotaInput,
    propietarioInput,
    telefonoInput,
    fechaInput,
    horaInput,
    sintomasInput,
    formulario
} from './selectores.js';

const administrarCitas = new Citas();
const ui = new UI(administrarCitas);

let editando = false;

//Objeto con la informacion de la cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

// Agrega datos al objeto de cita
export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;

}

// Valida y agrega una nueva cita a la clase de citas
export function nuevaCita(e) {
    e.preventDefault();

    //Extraer la informacion del objeto de cit
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    // validar
    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {

        ui.imprimirAlerta('Todos los campos son obligatorios', 'error')

        return;
    }

    if (editando) {
        ui.imprimirAlerta('Editado correctamente');
        //Pasar el objeto de l cita a edicion
        administrarCitas.editarCita({ ...citaObj })

        //Regresar el texto del boton a su estado original


        formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';




        //Quitar modo edicion 
        editando = false;

    } else {
        //Generar un id único
        citaObj.id = Date.now()//id unico

        //Creando una nueva cita

        administrarCitas.agregarCita({ ...citaObj });

        //Mensaje de agregado correctamente
        ui.imprimirAlerta('Se agrego correctamente');
    }



    // Reiniciar el objeto para la validacion

    reiniciarObjeto();

    //Reiniciar el formulario

    formulario.reset()

    //Mostrar el html de las citas
    ui.imprimirCitas(administrarCitas);
}

export function reiniciarObjeto() {

    citaObj.mascota = '',
        citaObj.propietario = '',
        citaObj.telefono = '',
        citaObj.fecha = '',
        citaObj.hora = '',
        citaObj.sintomas = ''

}

export function eliminarCita(id) {
    //Eliminar la cita
    administrarCitas.eliminarCita(id);

    //Muestre el mensaje
    ui.imprimirAlerta('La cita se elimino correctamente');


    //Refrescar la cita
    ui.imprimirCitas(administrarCitas)
}

// Cargar los datos y el modo edicion
export function cargarEdicion(cita) {

    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    //Llenar los imputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono; fechaInput.value = fecha;
    horaInput.value = hora; sintomasInput.value = sintomas;

    //lLENAR EL OJETO

    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    //Cambiar el texto del boton
    formulario.querySelector('button[type="submit"]').textContent = ' Guardar Cambios';

    editando = true;

}
