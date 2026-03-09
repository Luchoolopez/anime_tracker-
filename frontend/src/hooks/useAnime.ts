import React, { useCallback } from "react";
import { AnimeService } from "../api/anime.service";
import type { Anime } from "../types/anime.type";
import { useAuth } from "../context/authContext";

export const useAnime = () => {
    const { userId } = useAuth();
    const [animes, setAnimes] = React.useState<Anime[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const loadAnimes = useCallback(async () => {
        if (!userId) return;
        setLoading(true);
        try {
            const response = await AnimeService.getAnimeByUserId(userId);
            setAnimes(response.data ?? []);
        } catch (error) {
            setError("Error al cargar los animes");
        } finally {
            setLoading(false);
        }
    }, []);

    const createAnime = useCallback(async (animeData: Omit<Anime, '_id'>) => {
        if(!userId) return;
        setLoading(true);
        try {
            const response = await AnimeService.createAnime({ ...animeData, usuarioId: userId });
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
        try{
            const updatedAnime = await AnimeService.updateAnime(animeId, animeData);
            setAnimes(animes.map(a => a._id === animeId ? updatedAnime : a));
        } catch (error) {
            setError("Error al actualizar el anime");
        } finally {
            setLoading(false);
        }
    },[loadAnimes]);

    const deleteAnime = useCallback(async(animeId:string) => {
        setLoading(true);
        try{
            await AnimeService.deleteAnime(animeId);
            setAnimes(animes.filter(a => a._id !== animeId));
        }catch(error){
            setError("Error al eliminar el anime");
        } finally {
            setLoading(false);
        }
    },[loadAnimes]);

    return {animes, loading, error, loadAnimes, createAnime, updateAnime, deleteAnime}
}
