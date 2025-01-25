import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const DetallesPlanetas = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
            actions.getDetallePlanetas();
        }, [])
        return(
            <div className="card mb-3" style={{ maxWidth: "540px" }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={'https://starwars-visualguide.com/assets/img/planets/{store.Planetas}.jpg'} className="img-fluid rounded-start" alt="..." />
                </div>
            </div>
            <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title">{store.detallePlanetas.name}</h5>
                    <p className="card-text"><strong>Diameter: </strong>{store.detallePlanetas.diameter}</p>
                    <p className="card-text"><strong>Rotation period: </strong>{store.detallePlanetas.rotation_period}</p>
                    <p className="card-text"><strong>Orbital period: </strong>{store.detallePlanetas.orbital_period}</p>
                    <p className="card-text"><strong>Gravity: </strong>{store.detallePlanetas.gravity}</p>
                    <p className="card-text"><strong>Population: </strong>{store.detallePlanetas.population}</p>
                    <p className="card-text"><strong>Climate: </strong>{store.detallePlanetas.climate}</p>
                    <p className="card-text"><strong>Terrain: </strong>{store.detallePlanetas.terrain}</p>
                    <p className="card-text"><strong>Surface water: </strong>{store.detallePlanetas.surface_water}.</p>
                </div>
            </div>
        </div>
        )
    }