export interface Capitulo {
    numero: number;
    estado: 'no visto' | 'pendiente' | 'visto';
}

export interface Anime{
    _id: string;
    usuarioId: string;
    nombre: string;
    imagen: string;
    cantidadCapitulos: number;
    capitulos: Capitulo[];
    estado: 'no visto' | 'pendiente' | 'visto';
}

export interface CreateAnimeDTO{
    image:''
    usuarioId: string;
    nombre: string;
    cantidadCapitulos: number;
}