import React, { useState,useEffect } from 'react';
import logo from '../assets/image/repartidor.png';
import '../styles/registroRepartidor.css';
import { NavLink } from 'react-router-dom';

/** npm install pdfjs-dist -> Se usa para poder guardar archivos pdf**/
const RegistroRepartidor = () => {
    /**Esto va para ir a repartidor */
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    const [nit, setNit] = useState("");
    const [celular, setCelular] = useState("");
    const [cv, setCv] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    /**Esto va para ir a transporte */
    const [licencia, setLicencia] = useState("");
    const [numLicencia, setNumLicencia] = useState("");


    /** Se crea un estado para el checkbox, el cual se inicializa en false */
    const [isChecked, setIsChecked] = useState(false);
    function handleCheckboxChange() {
        setIsChecked(!isChecked);
    }
    /** Se crea un estado para el checkbox, el cual se inicializa en false */
    const [isChecked2, setIsChecked2] = useState(false);
    function handleCheckboxChange2() {
        setIsChecked2(!isChecked2);
    }
    /********Obtener el valor de que tipo de licencia tiene */
    const handleChange = (event) => {
        setLicencia(event.target.value);
    }
    /***************************************************************************/
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
    /****************************** USEEFFECT PARA IMPORTAR LOS VALORES DE LA BASE DE DATO  ***************/
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
    /****************************** USEEFFECT PARA IMPORTAR LOS VALORES DE LA BASE DE DATO  ***************/
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
     /************************** evento que se acciona cuando se da en el boton de REGISTRAR ***************/
     const handleSubmit = (event) => {
        let departamento = parseInt(selectedDepartamentoGlobal);
        let ciudad = parseInt(selectedCiudadGlobal);
        let estado = parseInt("0");
        let propietario = parseInt("0");
        if (isChecked2){
            propietario = parseInt("1");
        }
        if(password === password2){
            event.preventDefault();
            fetch('http://localhost:4000/api/registroRepartidor', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
             body: JSON.stringify({ nombre, apellido, correo, departamento, ciudad, nit, cv, estado, celular, password,propietario,numLicencia,licencia })
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
                    setNit('');
                    setCv('');
                    setCelular('');
                    setPassword('');
                    setPassword2('');
                    setNumLicencia('');
                    setIsChecked(false);
                    setIsChecked2(false);
                    setDepartamento2([]);
                    setCiudad2([]);
                    setLicencia('TIPO DE LICENCIA');
                }
            })
            .catch(error => console.log(error));
        }
        else{
            alert("Las contraseñas no coinciden");
        }
      }
    return(
        <div className='principal'>
            <div className='conteiner-registro-repartidor'>
                <div>
                    <img src={logo} alt='logo' className='logo-registro-repartidor'/>
                </div>
                <div className='formulario-registro-repartidor'>
                <form onSubmit={handleSubmit}> 
                <div className="form-text-registro-repartidor">
                        <input type="text" required  value={nombre} onChange={(e) => setNombre(e.target.value)}   ></input>
		                <label className="lbl-registro-repartidor">
			                <span className="text-repartidor">INGRESE SU NOMBRE </span>
		                </label>
                    </div>
                    <br/>
                    <div className="form-text-apellido-repartidor">
                        <input type="text" required value={apellido} onChange={(e) => setApellido(e.target.value)} ></input>
                        <label className="lbl-apellido-repartidor">
                            <span className="text-apellido-repartidor">INGRESE SU APELLIDO</span>
                        </label>
                    </div>
                    <br/>
                    <div className="form-text-correo-repartidor">
                            <input type="email" required  value={correo} onChange={(e) => setCorreo(e.target.value)}  ></input>
                            <label className="lbl-correo-repartidor">
                                <span className="text-correo-repartidor">INGRESE EL CORREO ELECTRONICO</span>
                            </label>
                    </div>
                    <br/>

                    <div className="checkbox-container">
                        <label className="checkbox-label" required>
                        <input type="checkbox" className="checkbox-input" checked={isChecked} onChange={handleCheckboxChange}></input>
                            <span className="checkbox-text">Posee Licencia?</span>
                        <span className="checkbox-arrow"></span>
                        </label>
                    </div>
                    <br/>
                    <div className="checkbox-container2" >
                        <label className="checkbox-label2">
                        <input type="checkbox" className="checkbox-input2"  checked={isChecked2} onChange={handleCheckboxChange2}></input>
                            <span className="checkbox-text2">Posee medio de transporte propio (Motocicleta)?</span>
                        <span className="checkbox-arrow2"></span>
                        </label>
                    </div>
                    <br/>
                        <div className="form-text-contrasena-repartidor">
                            <input type="password"  required value={password} onChange={(e) => setPassword(e.target.value)}></input>
                            <label className="lbl-contrasena-repartidor">
                                <span className="text-contrasena-repartidor">INGRESE SU CONTRASEÑA</span>
                            </label>
                        </div>
                    <br/>
                    <div className="form-text-contrasena2-repartidor">
                        <input type="password" required value={password2} onChange={(e) => setPassword2(e.target.value)}></input>
                        <label className="lbl-contrasena2-repartidor">
                            <span className="text-contrasena2-repartidor">CONFIRME SU CONTRASEÑA</span>
                        </label>
                    </div>
                    <div className="form-enlaces-licencia-repartidor">
                        {isChecked === true && (
                            <div>
                                <select id="enlaces" value={licencia} onChange={handleChange}>
                                    <option value="">TIPO DE LICENCIA</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                </select>
                            </div>
                            )}
                        </div>
                        <br/>
                        <div className="form-text-licencia-repartidor">
                            {isChecked === true && (
                                <div>
                                    <input type="number" required  value={numLicencia} onChange={(e) => setNumLicencia(e.target.value)}  ></input>
                                    <label className="lbl-licencia-repartidor">
                                    <span className="text-licencia-repartidor">INGRESE SU NUMERO DE LICENCIA</span>
                                    </label>
                                </div>
                            )}
                        </div>
                        <div className="form-text-telefono-repartidor">
                            <input type="number" required value={celular} onChange={(e) => setCelular(e.target.value)}   ></input>
                            <label className="lbl-telefono-repartidor">
                                <span className="text-telefono-repartidor">INGRESE SU NUMERO DE CELULAR</span>
                            </label>
                        </div>
                        <br/>
                        <div className="form-text-nit-repartidor">
                            <input type="number" required  value={nit} onChange={(e) => setNit(e.target.value)}  ></input>
                            <label className="lbl-nit-repartidor">
                                <span className="text-nit-repartidor">INGRESE SU NIT</span>
                            </label>
                        </div>
                        <br/>
                    <div className="form-enlaces-departamento-repartidor" >
                            <select id="enlaces" onChange={handleSelectChange} value={selectedDepartamento}>
                                <option value="">DEPARTAMENTO</option>
                                {departamento2.map((departamento) => (
                                    <option key = {departamento.idDepartamento} value={departamento.idDepartamento}>{departamento.departamento}</option>
                                ))}
                            </select>
                        </div>
                    <br/>
                    <div className="form-enlaces-municipio-repartidor">
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
                        <input type="text" id="documentos" className="documentos_repartidor" placeholder="Ingrese su CV"  value={cv} onChange={(e) => setCv(e.target.value)}  />
                        <button type="submit" className="form-boton-repartidor">ENVIAR SOLICITUD</button>
                </form>
                </div>
                <NavLink to="/" className="boton-flecha" >Regresar</NavLink>   
            </div>  
        </div>
    )
}
export default RegistroRepartidor;