import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";


import { AddContact } from "./component/AddContact.jsx";
import { DetallesCharacters } from "./component/DetallesCharacters.jsx";
import { DetallesNaves } from "./component/DetallesNaves.jsx";
import { DetallesPlanetas } from "./component/DetallesPlanetas.jsx";
import { EditContact } from "./component/EditContact.jsx";


import { Contact } from "./pages/Contact.jsx";
import { Characters } from "./pages/Characters.jsx";
import { Demo } from "./pages/demo.js";
import { Home } from "./pages/home.js";
import { Naves } from "./pages/Naves.jsx";
import { Planetas } from "./pages/Planetas.jsx";
import { Single } from "./pages/single.js";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div className="bg-dark">
            <div>
                <BrowserRouter basename={basename}>
                    <ScrollToTop>
                        <Navbar />
                        <Routes>
                            <Route element={<Characters />} path="/characters" />
                            <Route element={<DetallesCharacters />} path="/characters-detalles/:uid" />
                            <Route element={<Naves />} path="/naves" />
                            <Route element={<DetallesNaves />} path="/naves-detalles/:uid" />
                            <Route element={<Planetas />} path="/planetas" />
                            <Route element={<DetallesPlanetas />} path="/planetas-detalles/:uid" />
                            <Route element={<Home />} path="/" />
                            <Route element={<Contact />} path="/contact" />
                            <Route element={<AddContact />} path="/add-contact" />
                            <Route element={<EditContact />} path="/edit-contact" />
                            <Route element={<Demo />} path="/demo" />
                            <Route element={<Single />} path="/single/:theid" />
                            <Route element={<h1>Not found!</h1>} />
                        </Routes>
                        <Footer />
                    </ScrollToTop>
                </BrowserRouter>
            </div>
        </div>
    );
};

export default injectContext(Layout);
