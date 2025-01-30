import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center bg-dark text-light mt-5">
			<img src="https://oem.com.mx/elsoldehermosillo/img/19046634/1683202884/BASE_LANDSCAPE/768/Disen%CC%83o%20sin%20ti%CC%81tulo%20(12).webp"/>
		</div>
	);
};
