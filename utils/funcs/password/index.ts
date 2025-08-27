import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export const generateHash = async (password: string) => {
  const hash = await bcrypt.hash(password, saltOrRounds);
  return hash;
};
