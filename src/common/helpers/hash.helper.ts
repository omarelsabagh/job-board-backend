import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword({
  password,
  userPassword,
}: {
  password: string;
  userPassword: string;
}): Promise<boolean> {
  return await bcrypt.compare(password, userPassword);
}
