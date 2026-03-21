import mongoose, { Schema, Document } from "mongoose";

export interface ICapitulo {
    numero: number;
    estado: 'no visto' | 'pendiente' | 'visto';
}

export interface IAnime extends Document {
    usuarioId: mongoose.Types.ObjectId;
    nombre: string;
    imagen: string;
    cantidadCapitulos: number;
    capitulos: ICapitulo[];
    estado: 'no visto' | 'pendiente' | 'visto';
}

const CapitulosSchema: Schema = new Schema({
    numero: { type: Number, required: true },
    estado: { type: String, enum: ['no visto', 'pendiente', 'visto'], default: 'no visto' }
}, {
    _id: false
});

const AnimeSchema: Schema = new Schema({
    usuarioId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    nombre: { type: String, required: true },
    imagen: { type: String, default: 'https://via.placeholder.com/150' },
    cantidadCapitulos: { type: Number, required: true },
    capitulos: [CapitulosSchema],
    estado: { type: String, enum: ['no visto', 'pendiente', 'visto'], default: 'no visto' }
}, {
    timestamps: true
})

AnimeSchema.pre('save', function (this: IAnime) {
  if (this.isNew && this.capitulos.length === 0) {
    for (let i = 1; i <= this.cantidadCapitulos; i++) {
      this.capitulos.push({ numero: i, estado: 'no visto' });
    }
  }
});

export default mongoose.model<IAnime>('Anime', AnimeSchema);