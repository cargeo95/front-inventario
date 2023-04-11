import React, {useEffect, useState} from 'react'
import { getInventarios, createInventarios, editInventarios } from '../services/InventarioService'
import dayjs from 'dayjs'
import ModalInventario from './ui/ModalInventario'
import ModalEdit from './ui/ModalEdit'


export default function Inventarios() {
  
  const title = 'Inventario'
  const [inventarios, setInventarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [inventario, setInventario] = useState({
    serial: '123',
    modelo: '123',
    descripcion: '123',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
    color: 'rojo',
    fechaCompra: '2024-04-04',
    precio: '5600',
    usuario: '641a698d8ad425a5b5e2df29',
    marca: '641a6a0a992b3a7f28c5a77e',
    estadoEquipo: '641a670fc8894d9bcc20b280',
    tipoEquipo: '641937d639321854a6a781b4'
  })
  const [loadingSave, setLoadingSave] = useState(false)
  const [id, setId] = useState('')
    

  /*
      LISTAR 
  */

  const listInventarios = async () => {
    try{
      setError(false)
      setLoading(true)
      const { data } = await getInventarios()
      console.log(data)
      setInventarios(data)
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
    listInventarios()
  },[])

  const handleChange = (e) => {
    setInventario({
      ...inventario,
      [e.target.serial]: e.target.value,
      [e.target.modelo]: e.target.value,
      [e.target.descripcion]: e.target.value,
      [e.target.foto]: e.target.value,
      [e.target.color]: e.target.value,
      [e.target.fechaCompra]: e.target.value,
      [e.target.precio]: e.target.value,
    })
  }

  /*
      GUARDAR 
  */

  const saveInventario = async (e) => {
    try{
      setError(false)
      setLoadingSave(true)
      const response = await createInventarios(inventario)
      console.log(response)
      setInventario({
        serial: '',
        modelo: '',
        descripcion: '',
        foto: '',
        color: '',
        fechaCompra: '',
        precio: '',
        usuario: '641a698d8ad425a5b5e2df29',
        marca: '641a6a0a992b3a7f28c5a77e',
        estadoEquipo: '641a670fc8894d9bcc20b280',
        tipoEquipo: '641937d639321854a6a781b4'
      })
      listInventarios()
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
    setInventario({
      serial: '',
      modelo: '',
      descripcion: '',
      foto: '',
      color: '',
      fechaCompra: '',
      precio: '',
    })
    if(id)setId('')
  }  

   /*
      EDITAR 
  */
 const selectInventario = (evt) => {
  evt.preventDefault()
  setId(evt.target.id)
  const tEq = inventarios.filter(inventario => inventario._id === evt.target.id)
  setInventario({...tEq[0]})
 }

 const editInventario = async () => {
  try{
    setError(false)
    setLoadingSave(true)
    const response = await editInventarios(id, inventario)
    console.log(response)
    setInventario({nombre: ''})
    listInventarios()
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
        tipo={inventario}
        loadingSave={loadingSave}
        edit={editInventario}
      />

      <ModalInventario
          title={title}
          closeModal={closeModal}
          handleChange={handleChange}
          inventario={inventario}
          loadingSave={loadingSave}
          saveInventario={saveInventario}
        />

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
                  <th scope="col">Serial</th>
                  <th scope="col">Modelo</th>
                  <th scope="col">Descripción</th>
                  <th scope="col">Foto</th>
                  <th scope="col">Color</th>
                  <th scope="col">Fecha Compra</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Actualizar</th>
                </tr>
              </thead>
              <tbody>
                {
                  inventarios.map((inventario, index) => {
                    return(
                      <tr key={inventario._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{inventario.serial}</td>
                        <td>{inventario.modelo}</td>
                        <td>{inventario.descripcion}</td>
                        <td><img src={inventario.foto} width='25px'/></td>
                        <td>{inventario.color}</td>
                        <td>{dayjs(inventario.fechaCompra).format('YYYY-MM-DD')}</td>
                        <td>{inventario.precio}</td>
                        <td>
                          <button 
                            onClick={selectInventario}
                            type="button" 
                            className="btn btn-success"
                            data-bs-toggle="modal" 
                            data-bs-target="#exampleModalEdit" 
                            id={inventario._id}
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
