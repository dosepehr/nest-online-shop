import * as bcrypt from 'bcrypt';

export const generateHash = async (password: string): Promise<string> => {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
}
