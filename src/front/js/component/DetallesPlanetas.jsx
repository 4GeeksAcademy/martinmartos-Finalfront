import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const DetallesPlanetas = () => {
    const { store, actions } = useContext(Context);
    const { uid } = useParams();
    const planetas = store.detallePlanetas;

    useEffect(() => {
        actions.getDetallePlanetas(uid);
    }, [uid])
    return (
        <div className="card bg-dark text-light ms-5 mt-2">
            <div className="row">
                <div className="col-md-7 col-lg-6 col-xl-5 ms-5">
                    <h1 className="card-title">{planetas.name}</h1>
                </div>
            </div>
            <div className="d-flex mt-2">
                <div className="col-md-5 col-lg-6 col-xl-7 ms-3" style={{  width: "550px" }}  >
                        <img src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/planets/${uid}.jpg`} className="img-fluid rounded-start" alt="" />
                </div>
                <div className="mt-3" >
                    <p className="card-text"><strong>Diameter: </strong>{planetas.diameter}</p>
                    <p className="card-text"><strong>Rotation period: </strong>{planetas.rotation_period}</p>
                    <p className="card-text"><strong>Orbital period: </strong>{planetas.orbital_period}</p>
                    <p className="card-text"><strong>Gravity: </strong>{planetas.gravity}</p>
                    <p className="card-text"><strong>Population: </strong>{planetas.population}</p>
                    <p className="card-text"><strong>Climate: </strong>{planetas.climate}</p>
                    <p className="card-text"><strong>Terrain: </strong>{planetas.terrain}</p>
                    <p className="card-text"><strong>Surface water: </strong>{planetas.surface_water}.</p>
                </div>
            </div>
        </div>)
}

