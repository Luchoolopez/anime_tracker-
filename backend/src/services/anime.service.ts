import anime, {IAnime} from "../models/anime";
import { StorageService } from "./storage.service";

type UploadedFile = {
    originalname: string;
    mimetype: string;
    buffer: Buffer;
};

export class AnimeService{
    private storageService = new StorageService();

    async createAnime(usuarioId:string, nombre:string, file:UploadedFile, cantidadCapitulos:number){
        const uploadResult = await this.storageService.uploadImage('anime_image', file);
        const newAnime = await anime.create({
            usuarioId,
            nombre,
            imagen: uploadResult.url,
            cantidadCapitulos,
        })
        return newAnime;
    }

    async getAnimesByUserId(usuarioId:string){
        const user = await anime.find({ usuarioId });
        if(!user) throw new Error('Usuario no encontrado');
        const animes = await anime.find({ usuarioId });
        return animes;
    }

    async updateAnime(animeId:string, nombre?:string, imagen?:string, cantidadCapitulos?:number){
        const updateData: Partial<Pick<IAnime, 'nombre' | 'imagen' | 'cantidadCapitulos'>> = {};
        if(nombre !== undefined) updateData.nombre = nombre;
        if(imagen) updateData.imagen = imagen;
        if(cantidadCapitulos) updateData.cantidadCapitulos = cantidadCapitulos;
        const updatedAnime = await anime.findByIdAndUpdate(animeId, updateData, { new: true });
        return updatedAnime;
    }

    async deleteAnime(animeId:string){
        const result = await anime.findByIdAndDelete(animeId);
        if(!result) throw new Error('Anime no encontrado');
        return true;
    }

    async updateCapituloEstado(animeId:string, numeroCapitulo:number, nuevoEstado:'no visto' | 'pendiente' | 'visto'){
        const animeDoc = await anime.findById(animeId);
        if (!animeDoc) throw new Error('Anime no encontrado');
        const capitulo = animeDoc.capitulos.find(c => c.numero === numeroCapitulo);
        if (!capitulo) throw new Error('Capítulo no encontrado');
        capitulo.estado = nuevoEstado;
        await animeDoc.save();
        return capitulo;
    }
}