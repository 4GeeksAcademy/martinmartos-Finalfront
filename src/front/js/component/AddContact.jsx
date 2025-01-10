import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const AddContact = () =>{
    const { store, actions} = useContext(Context)
    const navigate = useNavigate();

    const [ name, setName ] = useState("");
    const [ phone, setPhone ] = useState("");  
    const [ email, setEmail ] = useState("");
    const [ address, setAddress ] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const dataToSend = { name, email, phone, address };
        actions.createContact (dataToSend)
        navigate("/contact")
    }
        
    return(
        <div>
            
            <form onSubmit={handleSubmit}>
                <div className="mb-3 ms-3 me-3">
                    <label htmlFor="exampleInputFullName1" className="form-label">Full Name</label>
                    <input type="fullName" className="form-control" placeholder="Full Name" value={name} onChange={(event) => setName (event.target.value)} />
                </div>
                <div className="mb-3 ms-3 me-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder="Enter Email"  value={email} onChange={(event) => setEmail (event.target.value)} />
                </div>
                <div className="mb-3 ms-3 me-3">
                    <label htmlFor="exampleInputPhone1" className="form-label">Phone</label>
                    <input type="phone" className="form-control" placeholder="Enter Phone"  value={phone} onChange={(event) => setPhone (event.target.value)}/>
                </div>
                <div className="mb-3 ms-3 me-3">
                    <label htmlFor="exampleInputAdress1" className="form-label">Adress</label>
                    <input type="phone" className="form-control" placeholder="Enter Adress"  value={address} onChange={(event) => setAddress (event.target.value)} />
                </div>
                <div className="d-grid gap-2 ms-3 me-3">
                    <button className="btn btn-primary" type="submit">Save</button>
                </div>
            </form>
            <Link to="/Contact">0r get back to contacts </Link>
        </div>
    )
}
