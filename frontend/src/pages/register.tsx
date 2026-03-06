import React, { useState } from "react"
import type { RegisterUserDTO } from "../types/user.type"
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
    const [values, setValues] = useState<RegisterUserDTO>({
        nombre: '',
        email: '',
        password: ''
    });

    const [isHovered, setIsHovered] = useState(false);

    const { register, loading, error, setError } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        try {
            await register(values);
            navigate('/login', {
                state: { successMessage: 'Registro exitoso, por favor inicia sesión.' }
            });
        } catch (error) {
            console.error('Error en el registro:', error);
            setError('Error en el registro. Por favor, intenta nuevamente.');
        }
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 px-3" style={{ backgroundColor: '#002349', fontFamily: 'sans-serif' }}>

            <h1 className="text-center mb-2 fw-bold" style={{ fontSize: '2.5rem' }}>
                <span style={{ color: '#ffffff' }}>Anime</span>
                <span style={{ color: '#957C3D' }}>Tracker</span>
            </h1>
            <p className="text-center text-light mb-4">Tu puerta al mundo del anime</p>

            <div className="w-100 p-3 p-sm-4 rounded-4 shadow-lg" style={{
                maxWidth: '420px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)', // Fondo apenas más claro que el body
                border: '1px solid rgba(255, 255, 255, 0.1)'  // Borde súper sutil
            }}>
                <form onSubmit={handleSubmit}>
                    {error && (<div className="alert alert-danger p-2 text-center">{error}</div>)}

                    <div className="mb-3">
                        <label htmlFor="nombre" className="text-white mb-1 fw-semibold" style={{ fontSize: '0.85rem' }}>Nombre de Usuario</label>
                        <input
                            type="text"
                            placeholder="Ingresa tu nombre de usuario"
                            name="nombre"
                            value={values.nombre}
                            onChange={handleChange}
                            className="form-control text-white shadow-none"
                            style={{ backgroundColor: '#003366', border: 'none', padding: '12px' }}
                            required
                        />
                    </div>

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
                            Contraseña
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
                                backgroundColor: isHovered ? '#b8994a' : '#957C3D',
                                color: '#002349',
                                padding: '12px',
                                borderRadius: '8px'
                            }}
                            disabled={loading}
                        >
                            {loading ? 'Registrando...' : 'Registrarse'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Link de redirección por fuera del cajón */}
            <p className="text-center mt-4 text-light" style={{ fontSize: '0.9rem' }}>
                ¿Ya tienes una cuenta? <Link to="/login" className="fw-bold" style={{ color: '#ffffff', textDecoration: 'none' }}>Inicia sesión</Link>
            </p>
        </div>
    )
}