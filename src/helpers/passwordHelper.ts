import crypto from 'crypto';
import bcrypt from 'bcrypt';

class Password {
  static instance: Password;
  private constructor() {}

  static getInstance(): Password {
    if (!Password.instance) {
      Password.instance = new Password();
    }
    return Password.instance;
  }

  generateSaltHashCrypto = (password: string): { salt: string; hash: string } => {
    const salt = crypto.randomBytes(32).toString('base64');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return {
      salt,
      hash,
    };
  };

  async generateSaltHashBcrypt(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  verifyPasswordCrypto = (password: string, salt: string, hash: string): boolean => {
    const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return verifyHash === hash;
  };

  async verifyPasswordBcrypt(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

const password = Password.getInstance();

export { password as Password };
