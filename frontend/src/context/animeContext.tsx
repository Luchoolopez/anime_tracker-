import React, { createContext, useState, useContext, useCallback, useMemo, useEffect } from "react";
import { AnimeService } from "../api/anime.service";
import type { Anime, CreateAnimeDTO } from "../types/anime.type";
import { useAuth } from "./authContext";

interface AnimeContextType {
    animes: Anime[];
    loading: boolean;
    error: string | null;
    loadAnimes: () => Promise<void>;
    createAnime: (animeData: CreateAnimeDTO) => Promise<void>;
    updateAnime: (animeId: string, animeData: Partial<Anime>) => Promise<void>;
    deleteAnime: (animeId: string) => Promise<void>;
}

const AnimeContext = createContext<AnimeContextType | undefined>(undefined);

export const useAnime = () => {
    const context = useContext(AnimeContext);
    if (!context) {
        throw new Error("useAnime debe ser usado dentro de un AnimeProvider");
    }
    return context;
};

export const AnimeProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const userId = user?.userId;
    const [animes, setAnimes] = useState<Anime[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadAnimes = useCallback(async () => {
        if (!userId) {
            setAnimes([]);
            return;
        };
        setLoading(true);
        setError(null);
        try {
            const response = await AnimeService.getAnimeByUserId(userId);
            setAnimes(response.data ?? []);
        } catch (error) {
            setError("Error al cargar los animes");
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        loadAnimes();
    }, [loadAnimes]);


    const createAnime = useCallback(async (animeData: CreateAnimeDTO) => {
        if (!userId) throw new Error("Usuario no autenticado");

        const formData = new FormData();
        formData.append('nombre', animeData.nombre);
        formData.append('cantidadCapitulos', animeData.cantidadCapitulos.toString());
        formData.append('usuarioId', userId); // Usar el userId del contexto, que es la fuente de verdad.
        if (animeData.imagen) {
            formData.append('image', animeData.imagen);
        }

        setError(null);
        try {
            const newAnime = await AnimeService.createAnime(formData);
            setAnimes(prev => [...prev, newAnime]);
        } catch (error) {
            setError("Error al crear el anime");
            throw error;
        }
    }, [userId]);

    const updateAnime = useCallback(async (animeId: string, animeData: Partial<Anime>) => {
        setError(null);
        try {
            const updatedAnime = await AnimeService.updateAnime(animeId, animeData);
            setAnimes(prev => prev.map(a => a._id === animeId ? updatedAnime : a));
        } catch (error) {
            setError("Error al actualizar el anime");
            throw error;
        }
    }, []);

    const deleteAnime = useCallback(async (animeId: string) => {
        setError(null);
        try {
            await AnimeService.deleteAnime(animeId);
            setAnimes(prev => prev.filter(a => a._id !== animeId));
        } catch (error) {
            setError("Error al eliminar el anime");
            throw error;
        }
    }, []);

    const value = useMemo(() => ({
        animes, loading, error, loadAnimes, createAnime, updateAnime, deleteAnime
    }), [animes, loading, error, loadAnimes, createAnime, updateAnime, deleteAnime]);

    return (
        <AnimeContext.Provider value={value}>
            {children}
        </AnimeContext.Provider>
    );
};