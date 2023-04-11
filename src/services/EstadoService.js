import { axiosConfig } from "../configuration/axiosConfig"

// Obtener los estado
const getEstados = (estado) => {
    return axiosConfig.get('estadoequipos?estado='+estado, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// Crear un estado 
const createEstados = (data ={}) => {
    return axiosConfig.post('estadoequipos', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

//Editar un estado 
const editEstados = (tipoId, data) => {
    return axiosConfig.put('estadoequipos/'+tipoId, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export {
    getEstados,
    createEstados,
    editEstados
}