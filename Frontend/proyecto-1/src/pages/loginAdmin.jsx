import React,{useState,useContext}  from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/image/administrador.png';
import '../styles/login.css';

const LoginAdministrador = (props) => {
    const navigate = useNavigate();
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const navigateToPrincipal = () =>{
        navigate('/solicitudes')
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if(correo === "admin" && password === "admin"){
            localStorage.setItem("admin",true)    
            localStorage.setItem("token", true)        
            navigateToPrincipal();

        }
      }
    return (
        <div className='principal'> 
            <div className='conteiner_login'>
                <div >
                    <img src= {logo} alt='logo' className="logo" />
                </div>
                <div className='formulario'>
                    <form onSubmit={handleSubmit}>
                        <div className="form-text">
                            <input type="text" required  value={correo} onChange={(e) => setCorreo(e.target.value)} ></input>
		                    <label className="lbl-nombre">
			                    <span className="text-nomb">USUARIO</span>
		                    </label>
                        </div>
                        <div className="form-contrasena">
                            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} ></input>
                            <label className="lbl-contrasena">
                                <span className="text-contrasena">CONTRASEÑA</span>
                            </label>
                        </div>
                            <button type="submit" className="form-boton">Iniciar Sesión</button>
	                </form>

                </div>
        </div>
    </div>
    )
}
export default LoginAdministrador;