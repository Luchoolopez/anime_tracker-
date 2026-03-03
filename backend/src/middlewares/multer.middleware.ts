import multer from 'multer';

// usa la memoria ram para no llenar el disco del servidor de basura
const storage = multer.memoryStorage();

export const upload = multer({ 
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // Límite de 5MB por imagen
    }
});