import user from "../models/user";
import { encrypt, verified } from "../utils/password.handle";
import { generateToken } from "../utils/jwt.handle";

type RegisterDTO = {
    nombre: string;
    email: string;
    password: string;
}
export class UserService{

    async register(userDTO:RegisterDTO){
        const existingUser = await user.findOne({ email: userDTO.email });
        if (existingUser) {
            throw new Error('El correo electrónico ya está registrado');
        }
        const hashedPassword = await encrypt(userDTO.password);

        const newUser = await user.create({
            nombre: userDTO.nombre,
            email: userDTO.email,
            password: hashedPassword
        });
        return newUser.toJSON();
    };

    async login(email:string, password:string){
        const existingUser = await user.findOne({email: email});
        if (!existingUser) {
            throw new Error('Usuario no encontrado');
        }

        const isValidPassword = await verified(password, existingUser.password);
        if (!isValidPassword) {
            throw new Error('Credenciales inválidas');
        }

        const token = generateToken({id:existingUser._id.toString(), email: existingUser.email});

        return {
            token,
            user:existingUser.toJSON()
        };
    }


}