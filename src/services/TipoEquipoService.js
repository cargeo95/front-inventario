import { axiosConfig } from "../configuration/axiosConfig"

const getTipoEquipos = (estado) => {
    return axiosConfig.get('tipoequipos?estado='+estado, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const createTipoEquipos = (tipoEquipo) => {
    return axiosConfig.post('tipoequipos', tipoEquipo, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


export {
    getTipoEquipos,
    createTipoEquipos
}