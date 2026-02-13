import { makeApp } from "./app";
import { connectDB } from "./config/db";

const PORT = process.env.PORT || 3000;
const app = makeApp();

app.listen(PORT, async () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    try{
        await connectDB();
        console.log('DB conectada');
    }catch(error){
        console.error('Error al conectar a la DB:', error);
    }
}
)