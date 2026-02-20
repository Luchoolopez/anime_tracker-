import { Request, Response, NextFunction } from "express";
import { AnimeService } from "../services/anime.service";

export class AnimeController {
    constructor(private animeService: AnimeService) { }

    createAnime = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { usuarioId, nombre, imagen, cantidadCapitulos } = req.body;

            if(!usuarioId || !nombre || !cantidadCapitulos) throw new Error('UsuarioId, nombre y cantidadCapitulos son requeridos');
            
            const newAnime = await this.animeService.createAnime(usuarioId, nombre, imagen, cantidadCapitulos);
            return res.status(201).json({
                success: true,
                message: 'Anime creado exitosamente',
                data: newAnime
            });
        } catch (error) {
            next(error);
        }
    }

    getAnimesByUserId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { usuarioId } = req.params;
            if (!usuarioId || Array.isArray(usuarioId)) throw new Error('UsuarioId es requerido');
            const animes = await this.animeService.getAnimesByUserId(usuarioId);
            return res.status(200).json({
                success: true,
                message: animes.length > 0 ? 'Animes encontrados' : 'No se encontraron animes para este usuario',
                data: animes
            });
        } catch (error) {
            next(error);
        }
    }

    updateAnime = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { animeId } = req.params;
            const { nombre, imagen, cantidadCapitulos } = req.body;

            if (!animeId || Array.isArray(animeId)) throw new Error('AnimeId es requerido');

            if (nombre === undefined && imagen === undefined && cantidadCapitulos === undefined) {
                throw new Error('Debes enviar al menos un campo para actualizar');
            }

            const updatedAnime = await this.animeService.updateAnime(
                animeId,
                nombre,
                imagen,
                cantidadCapitulos
            );

            return res.status(200).json({
                success: true,
                message: 'Anime actualizado exitosamente',
                data: updatedAnime
            });
        } catch (error) {
            next(error);
        }
    }

    deleteAnime = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const { animeId } = req.params;
            if (!animeId || Array.isArray(animeId)) throw new Error('AnimeId es requerido');
            await this.animeService.deleteAnime(animeId);
            return res.status(200).json({
                success: true,
                message: 'Anime eliminado exitosamente',
            });
        }catch(error){
            next(error);
        }
    }

    updateCapituloEstado = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const { animeId } = req.params;
            const { numeroCapitulo, nuevoEstado } = req.body;

            if (!animeId || Array.isArray(animeId)) throw new Error('AnimeId es requerido');
            if (numeroCapitulo === undefined || numeroCapitulo === null) throw new Error('Número de capítulo es requerido');
            if (!nuevoEstado || !['no visto', 'pendiente', 'visto'].includes(nuevoEstado)) throw new Error('Nuevo estado es requerido y debe ser "no visto", "pendiente" o "visto"');
            const updatedCapitulo = await this.animeService.updateCapituloEstado(animeId, numeroCapitulo, nuevoEstado);
            return res.status(200).json({
                success: true,
                message: 'Estado del capítulo actualizado exitosamente',
                data: updatedCapitulo
            });
        }catch(error){
            next(error);
        }
    }
}

