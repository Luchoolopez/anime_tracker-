import apiClient from "./apiClient"
import type { Capitulo, Anime } from "../types/anime.type"

export const AnimeService = {
    createAnime: async (data: Omit<Anime, '_id'>) => {
        const response = await apiClient.post("/anime", data);
        return response.data;
    },

    getAnimeByUserId: async (usuarioId: string) => {
        const response = await apiClient.get(`/anime/${usuarioId}`);
        return response.data;
    },

    updateAnime: async (animeId: string, data: Partial<Anime>) => {
        const response = await apiClient.put(`/anime/${animeId}`, data);
        return response.data;
    },

    deleteAnime: async (animeId: string) => {
        const response = await apiClient.delete(`/anime/${animeId}`);
        return response.data;
    },

    updateCapituloEstado: async (animeId: string, numeroCapitulo: number, nuevoEstado: Capitulo['estado']) => {
        const response = await apiClient.patch(`/anime/${animeId}/capitulo`, {
            numeroCapitulo,
            nuevoEstado
        });
        return response.data;
    },
}