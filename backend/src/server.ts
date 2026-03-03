import { makeApp } from "./app";
import { connectDB } from "./config/db";
import { StorageService } from "./services/storage.service";

const PORT = process.env.PORT || 3000;
const storageService = new StorageService();

const app = makeApp();



app.listen(PORT, async () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    try{
        await connectDB();
        console.log('DB conectada');
        await storageService.initializeMainBucket();
        console.log('Storage MinIO listo');
    }catch(error){
        console.error('Error al conectar a la DB:', error);
    }
}
)