import { axiosConfig } from "../configuration/axiosConfig"

// Obtener los estados de equipos
const getEstados = (estado) => {
    return axiosConfig.get('estadoequipos?estado='+estado, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// Crear un estado de equipo
const createEstados = (data ={}) => {
    return axiosConfig.post('estadoequipos', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export {
    getEstados,
    createEstados
}