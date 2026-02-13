import mongoose from "mongoose";

export const connectDB = async() => {
    try{
        const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/anime_tracker';
        await mongoose.connect(uri);
        console.log('¡Conectado a MongoDB con éxito!');
    }catch(error){
        console.error('Error conectando a Mongo:', error);
        process.exit(1); // detiene la db
    }
}