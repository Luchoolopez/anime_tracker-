import { useState } from "react";
import { useAnime } from "../../hooks/useAnime"
import { Modal, Button } from "react-bootstrap";
import { useAuth } from "../../context/authContext";
import type { CreateAnimeDTO } from "../../types/anime.type";

export const AnimeButtons = () => {
    const { user } = useAuth();
    const { createAnime, updateAnime, deleteAnime, loadAnimes } = useAnime();
    const [animeData, setAnimeData] = useState<CreateAnimeDTO>({
        image: '',
        usuarioId: user!.userId,
        nombre: '',
        cantidadCapitulos: 0,
    })

    // Estado para controlar si el modal está visible o no
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleCreateAnime = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await createAnime(animeData);
            loadAnimes();
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
                    <form onSubmit={handleCreateAnime}>
                        {/* {error && (<div className="alert alert-danger p-2 text-center">{error}</div>)} */}
                        



                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleClose}> {/* Aquí llamarás a createAnime */}
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}