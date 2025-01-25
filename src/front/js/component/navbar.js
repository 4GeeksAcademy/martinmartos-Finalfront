import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="right">
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="#"><img src="https://img.icons8.com/?size=100&id=69493&format=png&color=000000" alt="img Star Wars" />
          </a>
        </nav>
      </div>
      <div className="nav justify-content-end container-fluid text-center" style={{ }}>
        <a className="navbar-brand" href="#">Characters</a>
        <a className="navbar-brand" href="#">Planets</a>
        <a className="navbar-brand" href="#">Starsips</a>
        <a className="navbar-brand" href="#">Contacts</a>
        <a className="navbar-brand" href="#"><button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Favorites
        </button></a>
      </div>
    </nav>
  );
};
