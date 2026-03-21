import { useState } from "react";
import { useAnime } from "../../context/animeContext"
import { Modal, Button } from "react-bootstrap";
import { useAuth } from "../../context/authContext";
import type { CreateAnimeDTO } from "../../types/anime.type";

export const AnimeButtons = () => {
    const { user } = useAuth();
    const { createAnime, error } = useAnime();
    const [animeData, setAnimeData] = useState({
        nombre: '',
        cantidadCapitulos: 0,
        imagen: null as File | null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAnimeData(prev => ({
            ...prev,
            // Aseguramos que la cantidad de capítulos se guarde como número
            [name]: name === 'cantidadCapitulos' ? (value === '' ? 0 : parseInt(value, 10)) : value
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setAnimeData({ ...animeData, imagen: e.target.files[0] });
        }
    }

    // Estado para controlar si el modal está visible o no
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleCreateAnime = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await createAnime(animeData);
            // Limpiamos el formulario tras el éxito
            setAnimeData({
                nombre: '',
                cantidadCapitulos: 0,
                imagen: null,
            });
            handleClose();
        } catch (error) {
            console.error('Error al crear el anime:', error);
        }
    }

    return (
        <>
            <div className="button-section mb-3 d-flex gap-2">
                <button className="btn btn-primary" onClick={handleShow}> + Crear </button>
                <button className="btn btn-warning"> * Editar </button>
                <button className="btn btn-danger"> - Eliminar </button>
            </div>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear nuevo Anime</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Le asignamos un ID al form para conectarlo con el botón de abajo */}
                    <form id="create-anime-form" onSubmit={handleCreateAnime}>
                        {error && (<div className="alert alert-danger p-2 text-center">{error}</div>)}
                        <div className="mb-3">
                            <label htmlFor="nombre" className="text-black mb-1 fw-semibold" style={{ fontSize: '0.85rem' }}>Nombre</label>
                            <input
                                type="text"
                                placeholder="steel ball run"
                                name="nombre"
                                value={animeData.nombre}
                                onChange={handleChange}
                                className="form-control text-black shadow-none"
                                style={{ backgroundColor: '#e8edf3', border: 'none', padding: '12px' }}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="cantidadCapitulos" className="text-black mb-1 fw-semibold" style={{ fontSize: '0.85rem' }}>Cantidad de Capítulos</label>
                            <input
                                type="number"
                                placeholder="12"
                                name="cantidadCapitulos"
                                value={animeData.cantidadCapitulos}
                                onChange={handleChange}
                                className="form-control text-black shadow-none"
                                style={{ backgroundColor: '#e8edf3', border: 'none', padding: '12px' }}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="image" className="text-black mb-1 fw-semibold" style={{ fontSize: '0.85rem' }}>Imagen del Anime</label>
                            <input
                                type="file"
                                name="image"
                                onChange={handleImageChange}
                                className="form-control text-black shadow-none"
                                style={{ backgroundColor: '#e8edf3', border: 'none', padding: '12px' }}
                                accept="image/*"
                                required
                            />
                        </div>


                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    {/* 4. Conectamos el botón al formulario mediante el 'id' y el tipo 'submit' */}
                    <Button variant="primary" type="submit" form="create-anime-form">
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}