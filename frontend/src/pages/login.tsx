import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { LoginUserDTO } from "../types/user.type";
import { useAuth } from "../context/authContext";

export const Login = () => {
    const [values, setValues] = useState<LoginUserDTO>({
        email: '',
        password: ''
    });

    const [isHovered, setIsHovered] = useState(false);
    const { login, loading, error, setError } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        return () => setError(null);
    }, []);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        try {
            await login(values.email, values.password);
            navigate('/home', {
                state: { successMessage: 'Inicio de sesión exitoso.' }
            });
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            setError('Error en el inicio de sesión. Por favor, intenta nuevamente.');
        }
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 px-3" style={{ backgroundColor: '#002349', fontFamily: 'sans-serif' }}>

            <h1 className="text-center mb-2 fw-bold" style={{ fontSize: '2.5rem' }}>
                <span style={{ color: '#ffffff' }}>Anime</span>
                <span style={{ color: '#957C3D' }}>Tracker</span>
            </h1>
            <p className="text-center text-light mb-4">Bienvenido de nuevo</p>

            <div className="w-100 p-3 p-sm-4 rounded-4 shadow-lg" style={{
                maxWidth: '420px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)', // Fondo translúcido sutil
                border: '1px solid rgba(255, 255, 255, 0.1)'  // Borde para separar
            }}>
                <form onSubmit={handleSubmit}>
                    {error && (<div className="alert alert-danger p-2 text-center">{error}</div>)}

                    <div className="mb-3">
                        <label htmlFor="email" className="text-white mb-1 fw-semibold" style={{ fontSize: '0.85rem' }}>Correo electrónico</label>
                        <input
                            type="email"
                            placeholder="ejemplo@correo.com"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            className="form-control text-white shadow-none"
                            style={{ backgroundColor: '#003366', border: 'none', padding: '12px' }}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="text-white mb-1 fw-semibold d-flex justify-content-between" style={{ fontSize: '0.85rem' }}>
                            <span>Contraseña</span>
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            className="form-control text-white shadow-none"
                            style={{ backgroundColor: '#003366', border: 'none', padding: '12px' }}
                            required
                        />
                    </div>

                    <div className="d-grid mt-2 mb-3">
                        <button
                            className="btn fw-bold"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            style={{
                                backgroundColor: isHovered ? '#b8994a' :'#957C3D',
                                color: '#002349',
                                padding: '12px',
                                borderRadius: '8px'
                            }}
                            disabled={loading}
                        >
                            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                        </button>
                    </div>
                </form>
            </div>
            <p className="text-center mt-4 text-light" style={{ fontSize: '0.9rem' }}>
                ¿No tienes cuenta? <Link to="/register" className="fw-bold" style={{ color: '#ffffff', textDecoration: 'none' }}>Regístrate</Link>
            </p>
        </div>
    )
}