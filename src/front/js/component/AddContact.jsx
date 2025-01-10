import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const AddContact = () =>{
    const { store, actions} = useContext(Context)
    const Navigate = useNavigate();

    const [ name, setName ] = useState("");
    const [ phone, setPhone ] = useState("");  
    const [ email, setEmail ] = useState("");
    const [ address, setAddres ] = useState("");

    const handleSubmit = (event) => {
        event.prevent.default();
        const dataToSend = { name, email, phone, address };
        actions.addContact(dataToSend)
        Navigate("/contact")
    }
        
    return(
        <div>

        <form onSubmit={handleSubmit}>
            <div className="mb-3 ms-3 me-3">
                <label htmlFor="exampleInputFullName1" className="form-label">Full Name</label>
                <input type="fullName" className="form-control" placeholder="Full Name" />
            </div>
            <div className="mb-3 ms-3 me-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                <input type="email" className="form-control" placeholder="Enter Email" />
            </div>
            <div className="mb-3 ms-3 me-3">
                <label htmlFor="exampleInputPhone1" className="form-label">Phone</label>
                <input type="phone" className="form-control" placeholder="Enter Phone" />
            </div>
            <div className="mb-3 ms-3 me-3">
                <label htmlFor="exampleInputAdress1" className="form-label">Adress</label>
                <input type="phone" className="form-control" placeholder="Enter Adress" />
            </div>
            <div className="d-grid gap-2 ms-3 me-3">
                <button className="btn btn-primary" type="submit">Save</button>

            </div>
        </form>
        <Link to="/Contact">0r get back to contacts </Link>
        </div>
    )
}
