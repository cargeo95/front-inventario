import React, { useEffect, useState } from 'react'
import { getTipoEquipos, createTipoEquipos, editTipoEquipos } from '../services/TipoEquipoService'
import dayjs from 'dayjs'
import Modal from './ui/Modal'
import ModalEdit from './ui/ModalEdit'


export default function TipoEquipos() {
  const title= 'Tipo de Equipo'
  const [tipoEquipos, setTipoEquipos] = useState([])
  const [query, setQuery] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError]= useState(false)
  const [tipoEquipo, setTipoEquipo] = useState({
    nombre: ''
  })
  const [loadingSave, setLoadingSave] = useState(false)
  const [id, setId] = useState('')
  

  /*
      LISTAR 
  */
  const listTipoEquipos = async () => {
    try{
      setError(false)
      setLoading(true)
      const { data } = await getTipoEquipos(query)
      console.log(data)
      setTipoEquipos(data)
      
      setTimeout(() => {
        setLoading(false)
      }, 500)
      
    }catch(e){
      console.log(e)
      setError(true)
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

 /*
      GUARDAR
  */
  const saveTipoEquipo = async () => {
    try{
      setError(false)
      setLoadingSave(true)
      const response = await createTipoEquipos(tipoEquipo)
      console.log(response)
      setTipoEquipo({nombre: ''})
      listTipoEquipos()
      setTimeout(() => {
        setLoadingSave(false)
      }, 500)
    }catch(e){
      console.log(e)
      setError(true)
      setLoadingSave(false)
    }
  }

 

  const closeModal = () => {
    setTipoEquipo({nombre: ''})
    if(id)setId('')
  }
  

 /*
      EDITAR 
  */

  const selectTipoEquipo = (evt) => {
    evt.preventDefault()
    setId(evt.target.id)
    const tEq = tipoEquipos.filter(tipoEquipo => tipoEquipo._id === id)
    setTipoEquipo({...tEq[0]})
  }

  const editTipoEquipo = async (tipoEquipo) => {
    try{
      setError(false)
      setLoadingSave(true)
      const response = await editTipoEquipos(id, tipoEquipo)
      console.log(response)
      setTipoEquipo({nombre: ''})
      listTipoEquipos()
      setTimeout(() => {
        setLoadingSave(false)
      }, 500)
    }catch(e){
      console.log(e)
      setError(true)
      setLoadingSave(false)
    }
  }


  return (
    <>
      <ModalEdit
        title={title}
        closeModal={closeModal}
        handleChange={handleChange}
        tipo={tipoEquipo}
        loadingSave={loadingSave}
        edit={editTipoEquipo}
      />

      <Modal 
        title={title}
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
        className='btn btn-outline-primary' 
        data-bs-toggle="modal" 
        data-bs-target="#exampleModal" 
        data-bs-whatever="@mdo" >
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
                        <td>
                          <button 
                            onClick={selectTipoEquipo}
                            type="button" 
                            className="btn btn-success"
                            data-bs-toggle="modal" 
                            data-bs-target="#exampleModalEdit" 
                            id={tipoEquipo._id}
                          >
                            Editar
                          </button></td>
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
