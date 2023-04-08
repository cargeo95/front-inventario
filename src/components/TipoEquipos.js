import React, { useEffect, useState } from 'react'
import NavBar from './ui/NavBar'
import Footer from './ui/Footer'
import { getTipoEquipos } from '../services/TipoEquipoService'
import dayjs from 'dayjs'

export default function TipoEquipos({title}) {

 const [tipoEquipos, setTipoEquipo] = useState([])

  const listTipoEquipos = async () => {
    try {
      const {data} = await getTipoEquipos(true)
      setTipoEquipo(data)
    } catch (e) {
      console.log(e)
    }

  }

  useEffect(() => {
    listTipoEquipos()
  },[])

  return (
    <>
      <NavBar/>
      <div className='table-responsive'>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Estado</th>
              <th scope="col">Fecha creación</th>
              <th scope="col">Fecha actualización</th>
            </tr>
          </thead>
          <tbody>
            {
              tipoEquipos.map((tipoEquipo, index)=>{
                return(
                  <tr>
                    <th scope="row">{index +1}</th>
                    <td>{tipoEquipo.nombre}</td>
                    <td>{tipoEquipo.estado ? 'Activo' : 'Inactivo'}</td>
                    <td>{dayjs(tipoEquipo.fechaCreacion).format('YYYY-MM-DD')}</td>
                    <td>{dayjs(tipoEquipo.fechaActualizacion).format('YYYY-MM-DD')}</td>
                  </tr>
                )
              })
            }
                
          </tbody>
        </table>
      </div>
      <Footer/>
    </>
  )
}
