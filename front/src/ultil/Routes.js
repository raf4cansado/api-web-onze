import {  useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from "../pages/login/Login.js"
import ConsultaEmpresa from "../pages/empresa/pages/Consulta.js";
import CadastroEmpresa from "../pages/empresa/pages/Cadastro.js";
import ProtectedRoute from "./ProtectedRoute.js";
import Navbar from "../components/Navbar.js";



const Rotas = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    const renderLogin = () => {
        return <Login setToken={setToken} />;
    };


    return (
        <Router>
            <Navbar token={token} onLogout={handleLogout} />
            <Routes>
                <Route
                    path="/login"
                    element={token ? <Navigate to="/consulta/empresa" /> : renderLogin()}
                />
                <Route
                    path="/consulta/empresa"
                    element={
                        <ProtectedRoute token={token}>
                            <ConsultaEmpresa />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/cadastro/empresa"
                    element={
                        <ProtectedRoute token={token}>
                            <CadastroEmpresa />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/alteracao/empresa/:id"
                    element={
                        <ProtectedRoute token={token}>
                            <CadastroEmpresa />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/"
                    element={token ? <Navigate to="/consulta/empresa" /> : <Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );
    // return (
    //     <BrowserRouter>
    //         <Fragment>
    //             <Routes>
    //                 {/* <Route path="/home" element={<Private Item={Home} />} /> */}
    //                 <Route path="/login" element={<Login />} />
    //                 <ProtectedRoute />
    //                 <Route path="/consulta/empresa" element={<ConsultaEmpresa />} />
    //                 <Route path="/cadastro/empresa" element={<CadastroEmpresa />} />
    //                 <Route path="/alteracao/empresa/:id" element={<CadastroEmpresa />} />
    //                 {/* <Route path="/logout" element={<Logout />} /> */}
    //                 <Route path="*" element={<Login />} />
    //             </Routes>
    //         </Fragment>
    //     </BrowserRouter>
    // )
}

export default Rotas;