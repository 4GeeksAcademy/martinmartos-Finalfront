import React, { useContext} from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const Contact = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context)

    const handleDelete = async (id) => {
        actions.deleteContact(id);
    }

    const handleUpdate = (contact) => {
        actions.updateContact(contact);
        navigate("/edit-contact")
    };

    return (
        <div className="justify-content-sm-between bg-dark">
            <div className="d-flex justify-content-sm-between mb-5">
                <h1 className="ms-5 mt-3 text-light">Contacts</h1>
                <button type="submit" className="btn btn-secondary me-5 mt-4" onClick={() => navigate("/add-contact")}>Add Contact</button>
            </div>
            <div className="d-flex justify-content-center">
                <div className="card mb-3" style={{ maxWidth: '80%' }}>
                    {store.contacts && store.contacts.length > 0 ? (
                        store.contacts.map((contact) => (
                            <div className="row g-0" key={contact.id}>
                                <div className="col-md-4">
                                    <img
                                        src="https://w7.pngwing.com/pngs/371/155/png-transparent-r2-d2-anakin-skywalker-star-wars-x-wing-starfighter-logo-brown-frame-text-logo-anakin-skywalker.png"
                                        className="img-fluid rounded-start h-100"
                                        alt="Star Wars Logo"
                                    />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{contact.name}</h5>
                                        <p className="card-text">
                                            <i className="fa-solid fa-location-dot mb-4">{contact.address}</i>
                                            <br />
                                            <i className="fa-solid fa-phone mb-4">{contact.phone}</i>
                                            <br />
                                            <i className="fa-solid fa-envelope">{contact.email}</i>
                                        </p>
                                        <div className="text-sm-end">
                                            <button type="button" className="btn btn-secondary" onClick={() => handleUpdate(contact)}>
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </button>
                                            <button type="button" className="btn btn-danger ms-3" onClick={() => handleDelete(contact.id)}>
                                                <i className="fa-solid fa-trash-can"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-dark">No contacts available</p>
                    )}
                </div>
            </div>
        </div>
    );
};