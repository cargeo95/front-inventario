import { axiosConfig } from "../configuration/axiosConfig"

// Obtener los tipos de equipos
const getTipoEquipos = (estado) => {
    return axiosConfig.get('tipoequipos?estado='+estado, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// Crear un tipo de equipo
const createTipoEquipos = (data ={}) => {
    return axiosConfig.post('tipoequipos', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

//Editar un tipo de equipo

export {
    getTipoEquipos,
    createTipoEquipos
}