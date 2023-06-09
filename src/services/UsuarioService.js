import { axiosConfig } from "../configuration/axiosConfig"

// Obtener los usuarios
const getUsuarios = (estado) => {
    return axiosConfig.get('usuarios?estado='+estado, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// Crear un usuario
const createUsuarios = (data ={}) => {
    return axiosConfig.post('usuarios', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// editar un usuario

const editUsuarios = (tipoId, data) => {
    return axiosConfig.put('usuarios/'+tipoId, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}



export {
    getUsuarios,
    createUsuarios,
    editUsuarios
}
