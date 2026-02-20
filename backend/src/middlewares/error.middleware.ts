import { Request, Response, NextFunction } from 'express';

interface AppError extends Error {
    status?: number;
}

export const errorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    //Logueamos el error para el desarrollador (usar librerías como Winston o Morgan)
    console.error(`[Error] ${req.method} ${req.path} >> ${err.message}`);

    //el status code (por defecto 500)
    const status = err.status || 500;
    
    //Respuesta estandarizada
    res.status(status).json({
        success: false,
        message: err.message || 'Ocurrió un error interno en el servidor',
        // Opcional: solo mostrar el stack trace en desarrollo
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};