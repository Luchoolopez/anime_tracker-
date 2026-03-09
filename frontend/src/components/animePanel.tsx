import { Link, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useAnime } from "../hooks/useAnime";
import type { Anime } from "../types/anime.type";
export const AnimePanel = () => {
    const {animes, loading, error, loadAnimes} = useAnime();


    useEffect(() => {
        loadAnimes();
    }, [loadAnimes]);

    if(loading) return <div>Cargando...</div>;
    if(error) return <div>{error}</div>;
    if(!animes || animes.length === 0) return <div>Todavia no hay ningun anime creado</div>;

        return (
        <div className="anime-catalog">
            <h1>Mi Catálogo de Animes</h1>
            <div className="anime-grid">
                {animes.map((anime) => (
                    <div key={anime._id} className="anime-card">
                        <Link to={`/anime/${anime._id}`}>
                            <img src={anime.imagen || "/default-anime.jpg"} alt={anime.nombre} className="anime-image" />
                            <h3>{anime.nombre}</h3>
                        </Link>
                        <p>Estado: {anime.estado}</p>
                        {/* Agrega más detalles si es necesario */}
                    </div>
                ))}
            </div>
        </div>
    );
}