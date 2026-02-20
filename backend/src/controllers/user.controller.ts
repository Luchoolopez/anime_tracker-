import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";

export class UserController{
    constructor(private userService: UserService){}

    register = async(req:Request, res:Response, next:NextFunction) => {
        try{
            const user = await this.userService.register(req.body);
            res.status(201).json({
                success: true,
                message: 'Usuario registrado exitosamente',
                data: user
            });
        }catch(error){
            next(error);
        }
    }

    login = async(req:Request, res:Response, next:NextFunction) => {
        try{
            const {email, password } = req.body;
            const result = await this.userService.login(email, password);
            return res.status(200).json({
                success: true,
                message: 'Inicio de sesión exitoso',
                data: result
            });
        }catch(error){
            next(error);
        }
    }
}