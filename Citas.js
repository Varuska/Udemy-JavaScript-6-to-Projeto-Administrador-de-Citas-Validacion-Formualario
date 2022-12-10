
class Citas {
    constructor() {
        this.citas = [];
    }


    agregarCita(cita) {
        this.citas = [...this.citas, cita]

        console.log(this.citas);
    }

   

    editarCita(citaActualizada) {
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita )//.map va a recorrer todo el arreglo y crea un nuevo arreglo.
    }

    eliminarCita(id) {
        this.citas = this.citas.filter(cita => cita.id !== id)
    }
}

export default Citas;