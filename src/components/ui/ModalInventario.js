import React from 'react'

export default function ModalInventario({
    title,
    closeModal,
    handleChange,
    saveInventario,
    inventario,
    loadingSave

}) {
  return (
    <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Nuevo {title}</h1>
          <button 
            type="button" 
            className="btn-close" 
            data-bs-dismiss="modal" 
            aria-label="Close"
            onClick={closeModal}
          >
          </button>
        </div>
        
        <div className="modal-body">

          <form>
            <div className="mb-3">
                
              <label htmlFor="recipient-serial" 
              className="col-form-label">
                Serial:
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="recipient-serial"
                name="serial"
                onChange={handleChange}
                value={inventario.serial}
              />

              <label htmlFor="recipient-modelo" 
              className="col-form-label">
                Modelo:
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="recipient-modelo"
                name="modelo"
                onChange={handleChange}
                value={inventario.modelo}
              />

            <label htmlFor="recipient-descripcion" 
              className="col-form-label">
                Descripcion:
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="recipient-descripcion"
                name="descripcion"
                onChange={handleChange}
                value={inventario.descripcion}
              />

            <label htmlFor="recipient-foto" 
              className="col-form-label">
                Foto:
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="recipient-foto"
                name="foto"
                onChange={handleChange}
                value={inventario.foto}
              />

            <label htmlFor="recipient-color" 
              className="col-form-label">
                Color:
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="recipient-color"
                name="color"
                onChange={handleChange}
                value={inventario.color}
              />

            <label htmlFor="recipient-fechaCompra" 
              className="col-form-label">
                Fecha compra:
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="recipient-fechaCompra"
                name="fechaCompra"
                onChange={handleChange}
                value={inventario.fechaCompra}
              />

            <label htmlFor="recipient-precio" 
              className="col-form-label">
                Precio:
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="recipient-precio"
                name="precio"
                onChange={handleChange}
                value={inventario.precio}
              />
             
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button 
            type="button" 
            className="btn btn-secondary" 
            data-bs-dismiss="modal"
            onClick={closeModal}
          >
            Cerrar
          </button>
          {
            loadingSave 
            ? 
            (
            <button 
              className="btn btn-primary" 
              type="button" disabled
            >
              <span 
                className="spinner-grow spinner-grow-sm" 
                role="status" 
                aria-hidden="true"
              >
              </span>
                Guardando...
            </button>
            ) : 
            (
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={saveInventario}
              // disabled={tipoEquipo.nombre.length == 0}
            >
            Enviar
            </button>
            )
          }
        </div>
      </div>
    </div>
  </div>
  )
}
