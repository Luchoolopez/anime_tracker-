import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import React from "react";

export const ProtectedRoute = ({ children }: { children: React.JSX.Element }) => {
    const { user, loading } = useAuth();

    // 1. Si está cargando, mostramos la pantalla de espera
    if (loading) {
        return <div className="vh-100 d-flex justify-content-center align-items-center text-light bg-dark">Verificando sesión...</div>;
    }

    // 2. Comprobamos si el objeto 'user' no existe en lugar de buscar 'userId'
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // 3. Si hay usuario y ya cargó, renderizamos la ruta protegida
    return children;
};