import React from 'react'

export default function Modal({
    title,
    closeModal,
    handleChange,
    saveTipoEquipo,
    tipoEquipo,
    loadingSave
}) {
  return (
    <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Nuevo {title}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">Nombre:</label>
                  <input 
                    type="text" 
                    className="form-control"
                    id="recipient-name"
                    name="nombre"
                    onChange={handleChange}
                    value={tipoEquipo.nombre}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>Cerrar</button>
              {
                loadingSave ?
                (<button className="btn btn-primary" type="button" disabled>
                <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                Guardando...
              </button>)
                :
                (<button type="button" className="btn btn-primary" onClick={saveTipoEquipo} disabled={tipoEquipo.nombre.length == 0}>Enviar</button>)
              }
                
            </div>
          </div>
        </div>
    </div>
  )
}
