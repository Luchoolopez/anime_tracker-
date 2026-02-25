export interface User{
    nombre:string;
    email:string;
    password:string;
}

export interface LoginUserDTO{
    email:string;
    password:string;
}

export interface RegisterUserDTO{
    nombre:string;
    email:string;
    password:string;
}