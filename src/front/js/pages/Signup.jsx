import React, { useState, useContext } from "react"; 
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext"; 
import { checkFormValidity } from "../util"; 

export const Signup = () => {
  const navigate = useNavigate();
  const { actions } = useContext(Context);  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleName = (event) => { setName(event.target.value); }
  const handleEmail = (event) => { setEmail(event.target.value); }
  const handlePassword = (event) => { setPassword(event.target.value); };

  
  const handleSubmit = async (event) => {
    event.preventDefault();
        if (!checkFormValidity(event)) 
          return
        actions.signup({ name, email, password });
        navigate("/");
  };
    return (
      <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center text-primary">
              <h4>Sign Up</h4>
            </div>
            <div className="card-body bg-dark text-white">
              <form onSubmit={handleSubmit}>
                <div className="mb-3 text-primary">
                  <label htmlFor="name" className="form-label">Nombre Completo</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Ingresa tu nombre completo"
                    value={name}
                    onChange={handleName}
                    required
                  />
                </div>
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
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={handlePassword}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-outline-primary">Sign Up</button>
              </form>
              <p className="mt-3 text-center">
                ¿Ya tienes cuenta? 
                <span
                  onClick={() => navigate('/login')}
                  style={{ cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Inicia sesión aquí.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}