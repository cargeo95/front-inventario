import React from 'react'

export default function NavBar() {
  return (
    <header className="d-flex justify-content-center py-3">
      <ul className="nav nav-pills">
        <li className="nav-item">
            <a href="#" className="nav-link active" aria-current="page">Tipo Equipos</a>
        </li>

        <li className="nav-item">
            <a href="#" className="nav-link">Estados</a>
        </li>

        <li className="nav-item">
            <a href="#" className="nav-link">Usuarios</a>
        </li>

        <li className="nav-item">
            <a href="#" className="nav-link">Marcas</a>
        </li>

        <li className="nav-item">
            <a href="#" className="nav-link">Inventarios</a>
        </li>
        
      </ul>
    </header>
  )
}
