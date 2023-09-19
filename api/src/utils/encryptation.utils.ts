import * as bcrypt from 'bcrypt';

export const encrypt = async (pass: string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(pass, salt);
  return hash;
};

export const decrypt = async (pass: string, hash: string) => {
  const result = await bcrypt.compare(pass, hash);
  return result;
};
