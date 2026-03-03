import React, { useEffect, createContext, useState, useContext } from "react";
import { UserService } from "../api/user.service";
import type { RegisterUserDTO, User } from "../types/user.type";

interface AuthContextType {
    user: User | null;
    token: string | null;
    isReady: boolean;
    loading: boolean;
    error: string | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    login: (email:string, password:string) => Promise<void>;
    register: (data:RegisterUserDTO) => Promise<void>;
    logout: () => void;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps): React.ReactElement => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const initializeAuth = async() => {
            const storedToken = localStorage.getItem('accessToken');
            if(!storedToken){
                if(isMounted) setIsReady(true);
                return;
            }
            try{
                setToken(storedToken);
                const currentUser = localStorage.getItem('user');
                if(currentUser){
                    setUser(JSON.parse(currentUser));
                }
            }catch{
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
                if(isMounted){
                    setToken(null);
                    setUser(null);
                }
            }finally{
                if(isMounted) setIsReady(true);
            }
        };

        void initializeAuth();

        return () => {
            isMounted = false;
        };
    },[]);

    const login = async(email:string, password:string) => {
        setLoading(true);
        setError(null);
        try{
            const result = await UserService.login({email, password});
            const accessToken = result?.token;
            const userData = result?.user;

            if(!accessToken || !userData){
                throw new Error('Respuesta invalida del servidor');
            }

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('user', JSON.stringify(userData));

            setToken(accessToken);
            setUser(userData);

            return userData;
        }catch(err){
            setError('Error al iniciar sesión. Verifica tus credenciales.');
            throw err;
        }finally{
            setLoading(false);
        }
    };

    const register = async(data:RegisterUserDTO) => {
        setLoading(true);
        setError(null);
        try{
            await UserService.register(data);
        }catch(err){
            setError('Error en el registro. Por favor, intenta nuevamente.');
            throw err;
        }finally{
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        setError(null);
    };

    return(
        <AuthContext.Provider value={{ user, token, isReady, loading, error, setError, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    return context;
}