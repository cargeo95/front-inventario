import React, { useEffect, useState } from 'react'
import { getTipoEquipos } from '../services/TipoEquipoService'
import { createTipoEquipos } from '../services/TipoEquipoService'
import dayjs from 'dayjs'
import Modal from './ui/Modal'


export default function TipoEquipos() {
  const title = 'Tipo de Equipos'
  const [tipoEquipos, setTipoEquipos] = useState([])
  const [query, setQuery] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [tipoEquipo, setTipoEquipo] = useState({
    nombre : ''
  })
  const [loadingSave, setLoadingSave] = useState(false)

  const listTipoEquipos = async () => {
    try {
      setError(false)
      setLoading(true)
      const {data} = await getTipoEquipos(query)
      setTipoEquipos(data)
      console.log(data)
      setLoading(false)
    } catch (e) {
      console.log(e)
      setLoading(true)
      setLoading(false)
    }

  }

  useEffect(() => {
    listTipoEquipos()
  },[query])

  const changeSwitch = () => {
    setQuery(!query)
    
  }

  const handleChange = (e) => {
    setTipoEquipo({
      ...tipoEquipo,
      [e.target.name] : e.target.value
    })
  }

  const saveTipoEquipo = async() => {
    try {
      setError(false)
      setLoading(true)
      setLoadingSave(true)
      const response = await createTipoEquipos(tipoEquipo)
      setTipoEquipo({nomnbre : ''})
      listTipoEquipos()
      console.log(response)
      setLoading(false)
    } catch (e) {
      console.log(e)
      setLoading(true)
      setLoadingSave(false)
    }
  }

  const closeModal = () => {
    setTipoEquipo({nomnbre : ''})
  }

  return (
    <>

      <Modal
        title = {title}
        closeModal={closeModal}
        handleChange={handleChange}
        tipoEquipo={tipoEquipo}
        loadingSave={loadingSave}
        saveTipoEquipo={saveTipoEquipo}
      />

      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckChecked"
          checked={query}
          onChange={changeSwitch}
        />
        <label
          className="form-check-label"
          htmlFor="flexSwitchCheckChecked">
            Activos
        </label>
      </div>
      <button 
        type="button"
        className='btn btn-primary' 
        data-toggle="modal" 
        data-target="#exampleModal" 
        data-whatever="@mdo" >
        Agregar
      </button>
      {
        error && (
          <div className="alert alert-danger" role="alert">
            Ha ocurrido un error
          </div>
        )
      }

      <div className='table-responsive'>
        {
          loading ? (
            <div className="spinner-border m-5" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) 
          :
          (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Fecha creación</th>
                  <th scope="col">Fecha actualización</th>
                  <th scope="col">Acción</th>
                </tr>
              </thead>
              <tbody>
                {
                  tipoEquipos.map((tipoEquipo, index)=>{
                    return(
                      <tr key={tipoEquipo._id}> 
                        <th scope="row">{index +1}</th>
                        <td>{tipoEquipo.nombre}</td>
                        <td>{tipoEquipo.estado ? 'Activo' : 'Inactivo'}</td>
                        <td>{dayjs(tipoEquipo.fechaCreacion).format('YYYY-MM-DD')}</td>
                        <td>{dayjs(tipoEquipo.fechaActualizacion).format('YYYY-MM-DD')}</td>
                        <td><button className='btn btn-primary'>Editar</button></td>
                      </tr>
                    )
                  })
                }
                    
              </tbody>
            </table>
          )
        }
        
        
      </div>
      
    </>
  )
}
