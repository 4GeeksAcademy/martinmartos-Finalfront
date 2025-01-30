import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useContext } from "react";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid px-0">
			<nav className="navbar bg-dark">
				<a className="navbar-brand" href="#">
					<img src="https://img.icons8.com/?size=100&id=69493&format=png&color=000000" alt="Logo Starwars" width="110" height="80" className="ms-5" />
				</a>
				<ul className="nav justify-content-end">
					<li className="nav-item">
						<Link className="nav-link text-secondary" to="/characters">
							Characters
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link text-secondary" to="/planetas">
							Planets
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link text-secondary" to="/naves">
							Starships
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link text-secondary" to="/contact">
							Contacts
						</Link>
					</li>
					<div className="btn-group">
						<button className="btn btn-primary dropdown-toggle me-4" type="button" data-bs-toggle="dropdown" aria-expanded="false">
							Favorites
						</button>
						<ul className="dropdown-menu dropdown-menu-end">
							{store.favorites.length > 0 ? (
								store.favorites.map((item, index) => (
									<li key={index} className="dropdown-item d-flex justify-content-between align-items-center">
										<span> {item}</span>
										<span onClick={() => actions.removeFavorites(item)}>
											<i className="fas fa-trash text-primary ms-2"></i>
										</span>
									</li>
								))
							) : (
								<li className="dropdown-item text-center text-muted">No favorites added</li>
							)}
						</ul>
					</div>
				</ul>
			</nav>
		</div >
	);
};