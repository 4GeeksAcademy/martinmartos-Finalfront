import React, { useActionState, useContext, useState } from "react";
import {  Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const EditContact = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();

    const { store, actions } = useContext(Context)
    const Navigate = useNavigate();

    const handleSubmitEdit = (event) => {
        event.prevent.default();
        const dataToSend = { name, email, phone, address };
        actions.addContact(dataToSend)
        Navigate("/contacts")
    }

    return (
        <div className="bg-dark min-vh-100 p-5">
            <h1 className="ms-5 mb-3 text-light">Edit Contact</h1>
            <form onSubmit={handleSubmitEdit}>
                <div className="form-group">
                    <label htmlFor="exampleInputName" className="mb-2 ms-5 text-muted">Name</label>
                    <input type="text" className="mb-3 ms-5 w-50 form-control" placeholder="Enter name" value={name} onChange={(event) => setName (event.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmailAddress" className="mb-2 ms-5 text-muted">Email address</label>
                    <input type="email" className="mb-3 ms-5 w-50 form-control" placeholder="Enter email address" value={email} onChange={(event) => setEmail (event.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPhone" className="mb-2 ms-5 text-muted">Phone</label>
                    <input type="text" className="mb-3 ms-5 w-50 form-control" placeholder="Enter phone" value={phone} onChange={(event) => setPhone (event.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputAddress" className="mb-2 ms-5 text-muted">Address</label>
                    <input type="text" className="mb-3 ms-5 w-50 form-control" placeholder="Enter address" value={address} onChange={(event) => setAddress (event.target.value)}/>
                </div>
                <button type="submit" className="ms-5 btn btn-warning">Save</button>
                <button type="reset" className="ms-3 btn btn-secondary" onClick={() => Navigate("/contact")}>Cancel</button>
            </form>
        </div>
    )
}