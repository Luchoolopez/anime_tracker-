import React, { useCallback } from "react";
import { AnimeService } from "../api/anime.service";
import type { Anime, CreateAnimeDTO } from "../types/anime.type";
import { useAuth } from "../context/authContext";

export const useAnime = () => {
    const { user } = useAuth();
    const userId = user?.userId;
    const [animes, setAnimes] = React.useState<Anime[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const loadAnimes = useCallback(async () => {
        if (!userId) return;
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

    const createAnime = useCallback(async (animeData: CreateAnimeDTO) => {
        const formData = new FormData();
        formData.append('nombre', animeData.nombre);
        formData.append('cantidadCapitulos', animeData.cantidadCapitulos.toString());
        formData.append('usuarioId', animeData.usuarioId);
        if(animeData.imagen){
            formData.append('image', animeData.imagen);
        }
        if(!userId) return;
        setLoading(true);
        setError(null);
        try {
            const response = await AnimeService.createAnime(formData);
            const newAnime = response;
            setAnimes( prev => [...prev, newAnime]);
            return newAnime;
        }catch(error){
            setError("Error al crear el anime");
        } finally {
            setLoading(false);
        }
    }, [userId]);

    const updateAnime = useCallback(async(animeId:string, animeData: Partial<Anime>) => {
        setLoading(true);
        setError(null);
        try{
            const updatedAnime = await AnimeService.updateAnime(animeId, animeData);
            setAnimes(prev => prev.map(a => a._id === animeId ? updatedAnime : a));
        } catch (error) {
            setError("Error al actualizar el anime");
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteAnime = useCallback(async(animeId:string) => {
        setLoading(true);
        setError(null);
        try{
            await AnimeService.deleteAnime(animeId);
            setAnimes(prev => prev.filter(a => a._id !== animeId));
        }catch(error){
            setError("Error al eliminar el anime");
        } finally {
            setLoading(false);
        }
    }, []);

    return {animes, loading, error, loadAnimes, createAnime, updateAnime, deleteAnime}
}
