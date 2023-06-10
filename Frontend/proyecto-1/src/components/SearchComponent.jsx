import "../styles/historialrepartidor.css"
import React, {useState, useEffect} from 'react'

const SearchComponent = () => {
  //setear los hooks useState
  const [ users, setUsers ] = useState([])
  const [ search, setSearch ] = useState("")


  //función para traer los datos de la API
  const URL = 'http://localhost:4000/api/repartidor/historialRepartidor'

  const showData = async () => {
    const response = await fetch(URL)
    const data = await response.json()
    //console.log(data)
    setUsers(data)
  }   
   //función de búsqueda
  const searcher = (e) => {
      setSearch(e.target.value)   
  }
 
   const results = !search ? users : users.filter((dato)=> dato.nombreproducto.toLowerCase().includes(search.toLocaleLowerCase()))
  
   useEffect( ()=> {
    showData()
  }, [])
  
  //renderizamos la vista
  return (
    <div>
        <input value={search} onChange={searcher} type="text" placeholder='Buscar por producto' className='form-control'/>
        
        
        <table className='table mt-5'>
            <thead>
                <tr className='bg-curso'>
                    <th>NOMBRE</th>
                    <th>APELLIDO</th>
                    <th>DIRECCION</th>
                    <th>FECHA</th>
                    <th>ESTADO</th>
                    <th>DESCRIPCION</th>
                    <th>PRODUCTO</th>

                </tr>
            </thead>
            <tbody>
                { results.map( (user) => (
                    <tr>
                        <td>{user.nombre}</td>
                        <td>{user.apellido}</td>
                        <td>{user.direccion}</td>
                        <td>{user.fecha}</td>
                        <td>{user.estado}</td>
                        <td>{user.descripcion}</td>
                        <td>{user.nombreproducto}</td>
                    </tr>                    
                ))}
                
            </tbody>
        </table>
    </div>
  )
}
export default SearchComponent