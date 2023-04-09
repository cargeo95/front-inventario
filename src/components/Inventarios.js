import React, {useEffect, useState} from 'react'
import { getInventario, createInventario } from '../services/InventarioService'
import dayjs from 'dayjs'
import ModalInventario from './ui/ModalInventario'


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
    
  const listInventarios = async () => {
    try{
      setError(false)
      setLoading(true)
      const { data } = await getInventario()
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

  const saveInventario = async (e) => {
    try{
      setError(false)
      setLoadingSave(true)
      const response = await createInventario(inventario)
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
  }  

  return (
    <>

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
                            type="button"
                            className='btn btn-outline-primary' 
                            data-bs-toggle="modal" 
                            data-bs-target="#exampleModal" 
                            data-bs-whatever="@mdo" >
                            Actualizar
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
