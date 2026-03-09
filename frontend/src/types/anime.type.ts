export interface Capitulo {
    numero: number;
    estado: 'no visto' | 'pendiente' | 'visto';
}

export interface Anime{
    usuarioId: string | null;
    nombre: string;
    imagen: string;
    cantidadCapitulos: number;
    capitulos: Capitulo[];
}