import React, { useEffect, useState } from 'react'
import { getUsuarios, createUsuarios } from '../services/UsuarioService'
import dayjs from 'dayjs'
import ModalUser from './ui/ModalUser'


export default function Usuarios() {

  const title= 'Usuario'
  const [usuarios, setUsuarios] = useState([])
  const [query, setQuery] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError]= useState(false)
  const [usuario, setUsuario] = useState({
    nombre: '',
    email: ''
  })
  const [loadingSave, setLoadingSave] = useState(false)

  //listar usuarios
  const listUsuarios = async () => {
    try{
      setError(false)
      setLoading(true)
      const { data } = await getUsuarios(query)
      console.log(data)
      setUsuarios(data)
      
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
    listUsuarios()
  },[query])

  const changeSwitch = () => {
    setQuery(!query)
  }

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name] : e.target.value,
      [e.target.email] : e.target.value
    
    })
  }

  const saveUsuario = async () => {
    try{
      setError(false)
      setLoadingSave(true)
      const response = await createUsuarios(usuario)
      console.log(response)
      setUsuario({nombre: '', email: ''})
      listUsuarios()
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
    setUsuario({nombre: '', email: ''})
  }


  return (
    <>
      <ModalUser
        title={title}
        closeModal={closeModal}
        handleChange={handleChange}
        tipoEquipo={usuario}
        loadingSave={loadingSave}
        saveTipoEquipo={saveUsuario}
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

      <div className="table-responsive">
        {
          loading 
          ?
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
                  <th scope="col">Email</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Fecha creac.</th>
                  <th scope="col">Fecha act.</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {
                  usuarios.map((usuario, index) => {
                    return(
                      <tr key={usuario._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{usuario.nombre}</td>
                        <td>{usuario.email}</td>
                        <td>{usuario.estado ? 'Activo' : 'Inactivo'}</td>
                        <td>{dayjs(usuario.createdAt).format('YYYY-MM-DD')}</td>
                        <td>{dayjs(usuario.updatedAt).format('YYYY-MM-DD')}</td>
                        <td><button type="button" className="btn btn-success">Editar</button></td>
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
