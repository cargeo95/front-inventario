import { axiosConfig } from "../configuration/axiosConfig"

// Obtener los estados de equipos
const getInventario = () => {
    return axiosConfig.get('inventarios?', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// Crear un estado de equipo
const createInventario = (data ={}) => {
    return axiosConfig.post('inventarios', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export {
    getInventario,
    createInventario
}
