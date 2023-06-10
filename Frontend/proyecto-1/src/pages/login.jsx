import React,{useState,useContext}  from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/image/LogoRideza.png';
import '../styles/login.css';

const Login = (props) => {
    const navigate = useNavigate();
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const navigateToPrincipal = () =>{
        navigate('/menuUsuario')
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:4000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ correo, password })
        })
        .then(response => {
            if (response.status === 401) {
                alert('USUARIO O CONTRASEÑA INCORRECTO!!!');
            } 
            else if(response.status === 200){
                alert('BIENVENIDO!!!')
                setCorreo('');
                setPassword('');
                localStorage.setItem("token",true)
                response.json().then(data => {
                    localStorage.setItem("idusuario",data.message);
                });
                navigateToPrincipal();
            }
        })
        .catch(error => console.log(error));
      }
    return (
        <div className='principal'> 
            <div className='conteiner_login'>
                <div >
                    <img src= {logo} alt='logo' className="logo" />
                </div>
                <div className='titulo'>
                    <h3>BIENVENIDO Alchilazo</h3>
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
                    <div className="form-boton2">
                        <NavLink to="/registroUsuario" >¿No tienes cuenta para nuestros servicios?</NavLink>   
                            <hr/>
                        <NavLink to="/registroRepartidor" >¿Quieres formar parte de nuestro equipo?</NavLink>
                            <hr/>
                        <NavLink to="/RegistroEmpresa" >¿Deseas que tu empresa forme parte de nuestra familia?</NavLink>   

                    </div>
                </div>
        </div>
    </div>
    )
}
export default Login;