import React, { useEffect, useState } from 'react'
import { getMarcas, createMarcas, editMarcas } from '../services/MarcaService'
import dayjs from 'dayjs'
import Modal from './ui/Modal'
import ModalEdit from './ui/ModalEdit'


export default function Marcas() {
  const title= 'Marca'
  const [marcas, setMarcas] = useState([])
  const [query, setQuery] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError]= useState(false)
  const [marca, setMarca] = useState({
    nombre: ''
  })
  const [loadingSave, setLoadingSave] = useState(false)
  const [id, setId] = useState('')

  /*
      LISTAR 
  */

  const listMarcas = async () => {
    try{
      setError(false)
      setLoading(true)
      const { data } = await getMarcas(query)
      console.log(data)
      setMarcas(data)

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
    listMarcas()
  },[query])

  const changeSwitch = () => {
    setQuery(!query)
  }

  const handleChange = (e) => {
    setMarca({
      ...marca,
      [e.target.name] : e.target.value
    })
  }

  /*
      GUARDAR 
  */

  const saveMarca = async () => {
    try{
      setError(false)
      setLoadingSave(true)
      const response = await createMarcas(marca)
      console.log(response)
      setMarca({
        nombre: ''
      })
      listMarcas()
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
    setMarca({  nombre: '' })
    if(id)setId('')
  }
 

   /*
      EDITAR 
  */
  const selectMarca = (evt) => {
    evt.preventDefault()
    setId(evt.target.id)
    const tEq = marcas.filter(marca => marca._id === evt.target.id)
    setMarca({...tEq[0]})
  }

  const editMarca = async () => {
    try{
      setError(false)
      setLoadingSave(true)
      const response = await editMarcas(id, marca)
      console.log(response)
      setMarca({
        nombre: ''
      })
      listMarcas()
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
        tipo={marca}
        loadingSave={loadingSave}
        edit={editMarca}
      />
   
      <Modal

        title={title}
        closeModal={closeModal}
        handleChange={handleChange}
        tipoEquipo={marca}
        loadingSave={loadingSave}
        saveTipoEquipo={saveMarca}
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
            htmlFor="flexSwitchCheckChecked"
          >
            Activos
          </label>
        </div>
        <button 
          type="button" 
          className="btn btn-outline-primary"
          data-bs-toggle="modal" 
          data-bs-target="#exampleModal" 
          data-bs-whatever="@mdo"
        >
          Agregar
        </button>

        {
          error && 
          (
            <div className="alert alert-danger" role="alert">
              Ha ocurrido un error
            </div>
          )
        }

        <div className='table-responsive'>
          {
            loading ?
            (
              <div className="spinner-border" role="status">
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
                    <th scope="col">Fecha creac.</th>
                    <th scope="col">Fecha act.</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                {
                  marcas.map((marca, index) => {
                    return (
                      <tr key={marca._id}>
                        <td>{index + 1}</td>
                        <td>{marca.nombre}</td>
                        <td>{marca.estado ? 'Activo' : 'Inactivo'}</td>
                        <td>{dayjs(marca.fechaCreacion).format('YYYY-MM-DD')}</td>
                        <td>{dayjs(marca.fechaActualizacion).format('YYYY-MM-DD')}</td>
                        <td>
                        <button 
                            onClick={selectMarca}
                            type="button" 
                            className="btn btn-success"
                            data-bs-toggle="modal" 
                            data-bs-target="#exampleModalEdit" 
                            id={marca._id}
                          >
                            Editar
                          </button>
                        </td>
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
