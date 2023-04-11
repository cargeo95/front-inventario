import { axiosConfig } from "../configuration/axiosConfig"

// Obtener inventario
const getInventarios = () => {
    return axiosConfig.get('inventarios?', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// Crear un inventario
const createInventarios = (data ={}) => {
    return axiosConfig.post('inventarios', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

//Editar un  inventario
const editInventarios = (tipoId, data) => {
    return axiosConfig.put('inventarios/'+tipoId, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export {
    getInventarios,
    createInventarios,
    editInventarios
}
