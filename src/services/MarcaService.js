import { axiosConfig } from "../configuration/axiosConfig"

// Obtener las marcas
const getMarcas = (estado) => {
    return axiosConfig.get('marcas?estado='+estado, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// Crear una marca
const createMarcas = (data ={}) => {
    return axiosConfig.post('marcas', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// editar una marca
const editMarcas = (tipoId, data) => {
    return axiosConfig.put('marcas/'+tipoId, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export {
    getMarcas,
    createMarcas,
    editMarcas
}   