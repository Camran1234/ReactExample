import React, { useState, useEffect } from 'react';
import logo from '../assets/image/logoUsu.png';
import '../styles/registroUsuario.css';
import { NavLink } from 'react-router-dom';
let selectedDepartamentoGlobal = 0;
const RegistroUsuario = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    const [tarjeta, setTarjeta] = useState("");
    const [celular, setCelular] = useState("");
    const [direccion, setDireccion] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    /** Guarda en el Combo-Box los departamentos y despues guarda este valor en selectedDepartamentoGlobal **/
    const [departamento2, setDepartamento2] = useState([]);
    const [selectedDepartamento, setSelectedDepartamento] = useState("");
    const [selectedDepartamentoGlobal, setSelectedDepartamentoGlobal] = useState("");
    /***************************** funcion que GUARDA el valor del departamento ****************************/
    function handleSelectChange(event) {
        const selectedDepartamento = event.target.value;
        setSelectedDepartamento(selectedDepartamento);
        setSelectedDepartamentoGlobal(selectedDepartamento);
      }
    /*******************************************************************************************************/

    /** Guarda en el Combo-Box los departamentos y despues guarda este valor en selectedCiudadGlobal **/
    const [ciudad2, setCiudad2] = useState([]);
    const [selectedCiudad, setSelectedCiudad] = useState("");
    const [selectedCiudadGlobal, setSelectedCiudadGlobal] = useState("");
    /***************************** funcion que GUARDA el valor del departamento ****************************/
    function handleSelectChange2(event) {
        const selectedCiudad = event.target.value;
        setSelectedCiudad(selectedCiudad);
        setSelectedCiudadGlobal(selectedCiudad);   
    }
    /*******************************************************************************************************/

    /************************** evento que se acciona cuando se da en el boton de REGISTRAR ***************/
    const handleSubmit = (event) => {
        let departamento = parseInt(selectedDepartamentoGlobal);
        let ciudad = parseInt(selectedCiudadGlobal);
        let estado = parseInt("0");
        event.preventDefault();
        fetch('http://localhost:4000/api/registro', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ nombre, apellido, correo, tarjeta, celular, departamento, ciudad, direccion, estado, password })
        })
        .then(response => {
            if (response.status === 400) {
                alert('El usuario ya existe');
            } 
            else if(response.status === 200){
                alert('Su registro se ha realizado con exito!!!')
                setNombre('');
                setApellido('');
                setCorreo('');
                setTarjeta('');
                setCelular('');
                setDireccion('');
                setPassword('');
                setPassword2('');
            }
        })
        .catch(error => console.log(error));
      }
      /*********************************************************************************************************/
      
    useEffect(() => {
        fetch("http://localhost:4000/api/departamento")
          .then((response) => response.json())
          .then((data) => setDepartamento2(data))
          .catch((error) => console.error(error));
      }, []); 
      useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ departamento: selectedDepartamentoGlobal })
        };
        fetch("http://localhost:4000/api/ciudad", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setCiudad2(data);
                console.log(data);
            })
            .catch((error) => console.error(error));
    }, [selectedDepartamentoGlobal]);
    
    
    
    return (
        <div className='principal'> 
            <div className='conteiner-registro-usuario'>
                <div>
                    <img src={logo} alt='logo' className='logo-registro-usuario'/>
                </div>
                <div className='titulo-registro-usuario'>
                    <h3>INGRESA TUS DATOS Y USA NUESTRO SERVICIOS!!!</h3>
                </div>
                <div className='formulario-registro-usuario'>
                    <form onSubmit={handleSubmit}>
                        <div className="form-text-registro-usuario">
                            <input type="text" required  value={nombre} onChange={(e) => setNombre(e.target.value)} ></input>
		                    <label className="lbl-registro-usuario">
			                    <span className="text-usuario">INGRESE SU NOMBRE DE PILA</span>
		                    </label>
                        </div>
                        <br/>
                        <div className="form-text-apellido">
                            <input type="text" required value={apellido} onChange={(e) => setApellido(e.target.value)} ></input>
                            <label className="lbl-apellido">
                                <span className="text-apellido">INGRESE SU APELLIDO</span>
                            </label>
                        </div>
                        <br/>
                        <div className="form-text-correo-usuario">
                            <input type="email" required  value={correo} onChange={(e) => setCorreo(e.target.value)} ></input>
                            <label className="lbl-correo-usuario">
                                <span className="text-correo-usuario">INGRESE EL CORREO ELECTRONICO</span>
                            </label>
                        </div>
                        <br/>
                        <div className='form-text-tarjeta-usuario'>
                            <input type="number" required value={tarjeta} onChange={(e) => setTarjeta(e.target.value)}></input>
                            <label className="lbl-tarjeta-usuario">
                                <span className="text-tarjeta-usuario">INGRESE SU NUMERO DE TARJETA</span>   
                            </label>
                        </div>
                        <br/>
                        <div className="form-text-contrasena-usuario">
                            <input type="password"  required value={password} onChange={(e) => setPassword(e.target.value)}></input>
                            <label className="lbl-contrasena-usuario">
                                <span className="text-contrasena-usuario">INGRESE SU CONTRASEÑA</span>
                            </label>
                        </div>
                        <br/>
                        <div className="form-text-contrasena-usuarioR">
                            <input type="password" required value={password2} onChange={(e) => setPassword2(e.target.value)}></input>
                            <label className="lbl-contrasena-usuarioR">
                                <span className="text-contrasena-usuarioR">CONFIRME SU CONTRASEÑA</span>
                            </label>    
                        </div>
                        <br/>
                        <div className="form-text-telefono-usuario">
                            <input type="number" required value={celular} onChange={(e) => setCelular(e.target.value)}></input>
                            <label className="lbl-telefono-usuario">
                                <span className="text-telefono-usuario">INGRESE SU NUMERO DE TELEFONO</span>
                            </label>
                        </div>
                        <br/>
                        <div className="form-text-ubicacion-usuario">
                            <input type="text" required  value={direccion} onChange={(e) => setDireccion(e.target.value)}></input>
                            <label className="lbl-ubicacion-usuario">
                                <span className="text-ubicacion-usuario">INGRESE SU UBICACION</span>
                            </label>
                        </div>
                        <br/>
                        <div className="form-enlaces-departamento-usuario" >
                            <select id="enlaces" onChange={handleSelectChange} value={selectedDepartamento}>
                                <option value="">DEPARTAMENTO</option>
                                {departamento2.map((departamento) => (
                                    <option key = {departamento.idDepartamento} value={departamento.idDepartamento}>{departamento.departamento}</option>
                                ))}
                            </select>
                        </div>
                        <br/>
                        <div className="form-enlaces-municipio-usuario">
                            <div>
                                <select id="enlaces" onChange={handleSelectChange2} value={selectedCiudad}>
                                    <option value="">MUNICIPIO</option>
                                    {ciudad2.map((ciu) => (
                                    <option key = {ciu.idCiudad} value={ciu.idCiudad}>{ciu.ciudad}</option>
                                ))}
                                </select>
                            </div>
                        </div>
                        <br/>
                        <button type="submit" className="form-boton-usuario">REGISTRARME</button>
                    </form>  
                </div>
                <NavLink to="/" className="boton-usuario-return" >Regresar</NavLink> 
            </div>
        </div>
    )
};

export default RegistroUsuario;
