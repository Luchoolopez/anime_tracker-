import { hash, compare } from "bcrypt";

export const encrypt = async (pass: string) => {
    return await hash(pass, 10);
};

export const verified = async (pass: string, hash: string) => {
    return await compare(pass, hash);
};