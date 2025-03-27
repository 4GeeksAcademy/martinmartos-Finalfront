import React, { useContext, useState, useEffect } from "react";  
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { checkFormValidity } from "../util.js";

export const Login = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 
  const handleEmail = (event) => { setEmail(event.target.value) }
  const handlePassword = (event) => { setPassword(event.target.value) };

  useEffect(() => {
    if (store.isLogged) {
        navigate('/');
    }
}, [store.isLogged, navigate]);

  const handleLogin = async (e) => {
		e.preventDefault();
     if (!checkFormValidity(e)) 
          return
		actions.login({ email, password });
		navigate("/");
	};

 
  const handleReset = () => {
    setEmail('');
    setPassword('');
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center text-primary">
              <h4>Login</h4>
            </div>
            <div className="card-body bg-dark text-white">
              <form onSubmit={handleLogin}>
                <div className="mb-3 text-primary">
                  <label htmlFor="email" className="form-label">Correo Electrónico</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    placeholder="Ingresa tu correo electrónico" 
                    value={email} 
                    onChange={handleEmail}
                    required 
                  />
                </div>
                <div className="mb-3 text-primary">
                  <label htmlFor="contraseña" className="form-label">Contraseña</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="contraseña" 
                    placeholder="Ingresa tu contraseña" 
                    value={password} 
                    onChange={handlePassword}
                    required 
                  />
                </div>
                <button type="submit" className="btn btn-outline-primary">Login</button>
                <button onClick={handleReset} type="reset" className="btn btn-outline-primary ms-2">Reset</button>
              </form>
              <p className="mt-3 text-center">
                ¿No tienes cuenta? 
                <span onClick={() => navigate('/signup')} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                  Regístrate aquí.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}