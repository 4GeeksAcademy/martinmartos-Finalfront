import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const DetallesNaves = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getDetalleNaves();
    }, [])
    return (
        <div className="card mb-3" style={{ maxWidth: "540px" }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={'https://starwars-visualguide.com/assets/img/starships/{store.idNaves}.jpg'} className="img-fluid rounded-start" alt="..." />
                </div>
            </div>
            <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title">{store.detalleNaves.name}</h5>
                    <p className="card-text"><strong>Model: </strong>{store.detalleNaves.model}</p>
                    <p className="card-text"><strong>Starship class: </strong>{store.detalleNaves.starship_class}</p>
                    <p className="card-text"><strong>Manufacturer: </strong>{store.detalleNaves.manufacturer}</p>
                    <p className="card-text"><strong>Cost in: </strong>{store.detalleNaves.cost_in}</p>
                    <p className="card-text"><strong>Length: </strong>{store.detalleNaves.length}</p>
                    <p className="card-text"><strong>Crew: </strong>{store.detalleNaves.crew}</p>
                    <p className="card-text"><strong>Passengers: </strong>{store.detalleNaves.passengers}</p>
                    <p className="card-text"><strong>Max atmosphering speed: </strong>{store.detalleNaves.max_atmosphering_speed}.</p>
                    <p className="card-text"><strong>Hyperdrive rating: </strong>{store.detalleNaves.hyperdrive_rating}.</p>
                    <p className="card-text"><strong>MGLT: </strong>{store.detalleNaves.MGLT}.</p>
                    <p className="card-text"><strong>Cargo capacity: </strong>{store.detalleNaves.cargo_capacity}.</p>
                    <p className="card-text"><strong>Consumables: </strong>{store.detalleNaves.consumables}.</p>
                </div>
            </div>
        </div>
    )
}