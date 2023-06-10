import React, { useState,useEffect } from 'react';
import logo from '../assets/image/tramite.png';
import '../styles/registroEmpresa.css';
const RegistroEmpresa = () => {
    /**Esto va para ir a empresa */
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [url, setUrl] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    /**Esto va para ir a Direccion Empresa */
    const [direccion, setDireccion] = useState("");

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
    /******************************************** Disparador **********************************************/
    useEffect(() => {
        fetch("http://localhost:4000/api/departamento")
          .then((response) => response.json())
          .then((data) => setDepartamento2(data))
          .catch((error) => console.error(error));
      }, []); 
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
    /******************************************** Disparador **********************************************/
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
    /*******************************************************************************************************/

    const handleSubmit = (event) => {
        let departamento = parseInt(selectedDepartamentoGlobal);
        let ciudad = parseInt(selectedCiudadGlobal);
        let estado = parseInt("0");
        if(password === password2){
            event.preventDefault();
            fetch('http://localhost:4000/api/registroEmpresa', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
             body: JSON.stringify({ nombre, estado, descripcion, correo, password, url, departamento, ciudad, direccion })
            })
            .then(response => {
                if (response.status === 400) {
                    alert('El usuario ya existe');
                } 
                else if(response.status === 200){
                    alert('Su registro se ha realizado con exito!!!')
                    setNombre('');
                    setCorreo('');
                    setPassword('');
                    setPassword2('');
                    setDepartamento2([]);
                    setCiudad2([]);
                    setDireccion('');
                    setDescripcion('');
                    setUrl('');
                }
            })
            .catch(error => console.log(error));
        }
        else{
            alert("Las contraseñas no coinciden");
        }
      }
    

    return (
        <div className='principal'> 
            <div className='conteiner-registro-empresa'>
                <div>
                    <img src={logo} alt='logo' className='logo-registro-empresa'/>
                </div>
                <div className='titulo-registro-empresa'>
                    <h3>INGRESA TUS DATOS PARA FORMAR PARTE DE NUESTRO FAMILIA DE EMPRESAS</h3>
                </div>
                <div className='formulario-registro-empresa'>
                    <form onSubmit={handleSubmit}>
                        <div className="form-text-registro-empresa">
                            <input type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)}></input>
		                    <label className="lbl-registro-empresa">
			                    <span className="text-empresa">INGRESE EL NOMBRE DE LA ENTIDAD</span>
		                    </label>
                        </div>
                        <br/>
                        <div className="form-text-breve-descripcion">
                            <input type="text" required value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></input>
                            <label className="lbl-breve-descripcion">
                                <span className="text-breve-descripcion">BREVE DESCRIPCIÓN DE LA EMPRESA</span> 
                            </label>    
                        </div>
                        <br/>
                        <div className="form-text-correo">
                            <input type="email" required value={correo} onChange={(e) => setCorreo(e.target.value)}></input>
                            <label className="lbl-correo">
                                <span className="text-correo">INGRESE EL CORREO ELECTRONICO</span>
                            </label>
                        </div>
                        <br/>
                        <div className="form-text-ubicacion">
                            <input type="text" required value={direccion} onChange={(e) => setDireccion(e.target.value)}></input>
                            <label className="lbl-ubicacion">
                                <span className="text-ubicacion">INGRESE LA UBICACIÓN EXACTA DE LA EMPRESA</span>
                            </label>
                        </div>
                        <div className="form-text-passwordEmpresa">
                            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}></input>
                            <label className="lbl-passwordEmpresa">
                                <span className="text-passwordEmpresa">PASSWORD</span>
                            </label>
                        </div>
                        <div className="form-text-passwordEmpresaConfirmar">
                            <input type="password" required value={password2} onChange={(e) => setPassword2(e.target.value)}></input>
                            <label className="lbl-passwordEmpresaConfirmar">
                                <span className="text-passwordEmpresaConfirmar">CONFIRMAR PASSWORD</span>
                            </label>
                        </div>
                        <div className="form-enlaces-departamento">
                            <select id="enlaces" onChange={handleSelectChange} value={selectedDepartamento}>
                            <option value="">DEPARTAMENTO</option>
                            {departamento2.map((departamento) => (
                                    <option key = {departamento.idDepartamento} value={departamento.idDepartamento}>{departamento.departamento}</option>
                            ))}
                            </select>
                        </div>
                        <div className="form-enlaces-municipio">
                            <div>
                                <select id="enlaces" onChange={handleSelectChange2} value={selectedCiudad}>
                                    <option value="">CIUDAD</option>
                                    {ciudad2.map((ciu) => (
                                        <option key = {ciu.idCiudad} value={ciu.idCiudad}>{ciu.ciudad}</option>
                                    ))}
                                </select>
                            </div>
                            
                        </div>
                        <input type="text" id="documentos" className="documentos_empresa" placeholder="Ingrese su Documentación" value={url} onChange={(e) => setUrl(e.target.value)}/>
                        <button type="submit" className="form-boton-empresa">REGISTRAR EMPRESA</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default RegistroEmpresa;