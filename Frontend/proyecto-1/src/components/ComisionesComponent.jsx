import "../styles/historialrepartidor.css"
import React, {useState, useEffect} from 'react'

const ComisionesComponent = () => {
  //setear los hooks useState
  const [ users, setUsers ] = useState([])
  const [ search, setSearch ] = useState("")

  //función para traer los datos de la API
  const URL = 'http://localhost:4000/api/repartidor/comisionesRepartidor'

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
 
   const results = !search ? users : users.filter((dato)=> dato.correo.toLowerCase().includes(search.toLocaleLowerCase()))
  
   useEffect( ()=> {
    showData()
  }, [])
  
  //renderizamos la vista
  return (
    <div>
        <input value={search} onChange={searcher} type="text" placeholder='Buscar por correo' className='form-control'/>
        
        
        <table className='table mt-5'>
            <thead>
                <tr className='bg-curso'>
                    <th>NOMBRE</th>
                    <th>APELLIDO</th>
                    <th>CORREO</th>
                    <th>NIT</th>
                    <th>COMISIONES GENERADAS</th>                
                </tr>
            </thead>
            <tbody>
                { results.map( (user) => (
                    <tr>
                        <td>{user.nombre}</td>
                        <td>{user.apellido}</td>
                        <td>{user.correo}</td>
                        <td>{user.nit}</td>
                        <td>{user.comision}</td>
                    </tr>                    
                ))}
                
            </tbody>
        </table>
    </div>
  )
}
export default ComisionesComponent