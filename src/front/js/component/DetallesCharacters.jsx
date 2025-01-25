import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const DetallesCharacters = () => {
    const { store, actions } = useContext(Context);
    const { uid } = useParams();
    const personajes = store.detallePersonajes;

    useEffect(() => {
        actions.getDetalleCharacters(uid);
    }, [uid])
    return (
        <div className="card mb-3" style={{ width: "540px" }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={`https://starwars-visualguide.com/assets/img/characters/${uid}.jpg`} className="img-fluid rounded-start" alt="" />
                </div>
            </div>
            <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title">{personajes.name}</h5>
                    <p className="card-text"><strong>Height: </strong>{personajes.height}</p>
                    <p className="card-text"><strong>Mass: </strong>{personajes.mass}</p>
                    <p className="card-text"><strong>Hair color: </strong>{personajes.hair_color}</p>
                    <p className="card-text"><strong>Skin color: </strong>{personajes.skin_color}</p>
                    <p className="card-text"><strong>Eye color: </strong>{personajes.eye_color}</p>
                    <p className="card-text"><strong>Birth year: </strong>{personajes.birth_year}</p>
                    <p className="card-text"><strong>Gender: </strong>{personajes.gender}</p>
                </div>
            </div>
         </div>   )
    }