import React from 'react'
import NavBar from '../components/ui/NavBar'
import Footer from '../components/ui/Footer'
import { Route, Routes } from 'react-router-dom'
import NotFound from '../components/ui/NotFound'
import TipoEquipos from '../components/TipoEquipos'
import Estados from '../components/Estados'
import Usuarios from '../components/Usuarios'
import Inventarios from '../components/Inventarios'
import Marcas from '../components/Marcas'

export default function AppRouter() {
  return (
    <>       
        <NavBar/>
        
        <div className='container'>
          <Routes>
            
            <Route path='/' element={<TipoEquipos/>}/>
            <Route path='/marcas' element={<Marcas/>}/>
            <Route path='/estados' element={<Estados/>}/>
            <Route path='/usuarios' element={<Usuarios/>}/>
            <Route path='/inventarios' element={<Inventarios/>}/>
            <Route path='*' element={<NotFound/>} />
          </Routes>
        </div>

        <Footer/>
    </>
  )
}
