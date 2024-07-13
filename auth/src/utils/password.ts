import { scrypt, randomBytes } from 'node:crypto'
import { promisify } from 'node:util'

const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string): Promise<string> {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString('hex')}.${salt}`;
  }

  static async compare(storedPass: string, password: string): Promise<boolean> {
    const [hashedPass, salt] = storedPass.split('.');

    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return buf.toString('hex') === hashedPass;
  }
}
