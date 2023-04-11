import React from 'react'


export default function ModalEdit({
    title,
    closeModal,
    handleChange,
    tipo,
    loadingSave,
    edit
}) {
  return (
    <div className="modal fade" id="exampleModalEdit" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
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
              <label htmlFor="recipient-name" 
              className="col-form-label">
                Nombre:
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="recipient-name"
                name="nombre"
                onChange={handleChange}
                value={tipo.nombre}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="status" 
              className="col-form-label">
                Estado:
              </label>
              <select 
                    className="form-control" 
                    id="status"
                    name="estado"
                    onChange={handleChange}
                    value={tipo.estado}
                >
                <option value={false}>Inactivo</option>
                <option value={true}>Activo</option>
              </select>
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
              onClick={edit}
            //   disabled={tipo.nombre.length == 0}
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
