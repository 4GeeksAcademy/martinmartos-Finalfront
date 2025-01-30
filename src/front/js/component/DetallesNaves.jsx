import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const DetallesNaves = () => {
    const { store, actions } = useContext(Context);
    const { uid } = useParams();
    const naves = store.detalleNaves;

    useEffect(() => {
        actions.getDetalleNaves(uid);
    }, [uid])
    return (
        <div className="card bg-dark text-light ms-5 mt-2">
            <div className="row">
                <div className="col-md-7 col-lg-6 col-xl-5 ms-3">
                    <h1 className="card-title">{naves.name}</h1>
                </div>
            </div>
            <div className="d-flex mt-2">
                <div className="col-md-5 col-lg-6 col-xl-7 ms-3" style={{ width: "550px" }}>
                        <img src={`https://starwars-visualguide.com/assets/img/starships/${uid}.jpg`} className="img-fluid rounded-start" alt="" />
                </div>
                <div className="ms-5" >
                    <p className="card-text"><strong>Model: </strong>{naves.model}</p>
                    <p className="card-text"><strong>Starship class: </strong>{naves.starship_class}</p>
                    <p className="card-text"><strong>Manufacturer: </strong>{naves.manufacturer}</p>
                    <p className="card-text"><strong>Cost in: </strong>{naves.cost_in}</p>
                    <p className="card-text"><strong>Length: </strong>{naves.length}</p>
                    <p className="card-text"><strong>Crew: </strong>{naves.crew}</p>
                    <p className="card-text"><strong>Passengers: </strong>{naves.passengers}</p>
                    <p className="card-text"><strong>Max atmosphering speed: </strong>{naves.max_atmosphering_speed}.</p>
                    <p className="card-text"><strong>Hyperdrive rating: </strong>{naves.hyperdrive_rating}.</p>
                    <p className="card-text"><strong>MGLT: </strong>{naves.MGLT}.</p>
                    <p className="card-text"><strong>Cargo capacity: </strong>{naves.cargo_capacity}.</p>
                    <p className="card-text"><strong>Consumables: </strong>{naves.consumables}.</p>
                </div>
            </div>
        </div>)
}