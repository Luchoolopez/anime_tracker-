import { Link } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

export const Navbar = () => {
    const { user } = useAuth();

    return (
        <nav className="navbar px-3 py-3 shadow-sm" style={{ backgroundColor: '#002349' }}>
            <div className="container-fluid d-flex justify-content-between align-items-center px-lg-4">
                
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <h2 className="m-0 fw-bold" style={{ fontSize: '1.8rem', fontFamily: 'sans-serif' }}>
                        <span style={{ color: '#ffffff' }}>Anime</span>
                        <span style={{ color: '#957C3D' }}>Tracker</span>
                    </h2>
                </Link>

                <div className="d-flex align-items-center">
                    {user && (
                        <span className="text-light fw-semibold" style={{ fontFamily: 'sans-serif', fontSize: '1.1rem' }}>
                            {user.nombre}
                        </span>
                    )}
                </div>

            </div>
        </nav>
    );
};