import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

export const Naves = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleDetalle = (idNaves) => {
        store.idNaves = idNaves;
        navigate('/naves-detalles')
    }
    const handleImagen = (event) => {
        event.target.src = 'https://starwars-visualguide.com/assets/img/big-placeholder.jpg'
    }
    return (
        <div className="container-fluid px-0 bg-dark">
            <h1 className="text-center text-white mb-5">Starships</h1>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                {store.naves.map((item) => (
                    <div key={item.uid} className="col my-5">
                        <div className="col-md-4 mb-4">
                            <div className="card" style={{ width: "20rem", height: "330px" }}>
                                <div className="card-head">
                                    <img src={'https://starwars-visualguide.com/assets/img/starships/' + item.uid + '.jpg'} onError={handleImagen} className="card-img-top" alt="StarWar" />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <button  onClick={() => handleDetalle(item.uid)} type="button" className="btn btn-secondary">
                                        Details
                                    </button>
                                    <button type="button" className="btn btn-outline-danger">
                                        <i className="fa-regular fa-heart"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}